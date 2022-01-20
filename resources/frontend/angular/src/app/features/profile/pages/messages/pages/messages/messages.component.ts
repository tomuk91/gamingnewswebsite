import { Inbox } from 'src/app/features/profile/pages/messages/pages/messages/inbox.interface'
import { NotificationService } from 'src/app/core/services/notification.service'
import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { MessageService } from 'src/app/core/services/message.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { messages } from './messages.interface'
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
public inbox!: Observable<messages[]>;
public form!: FormGroup;
public conversations!: Inbox;
public hideReply: boolean = true;
public submitted = false;
protected id!: number;
private routeSub = new Subscription();
private paramSub = new Subscription();

constructor (
  private router: Router,
  private notify: NotificationService,
  private messageService: MessageService,
  private route: ActivatedRoute,
  private fb: FormBuilder
) {}

ngOnInit (): void {
  this.routeId()
  this.getConversationMessages()

  // SET FORM
  this.form = this.fb.group({
    message: [
      '',
      [
        Validators.required,
        Validators.minLength,
        Validators.maxLength
      ]
    ],
    conversation_id: [this.id, Validators.nullValidator]
  })
}

// public methods

public get f () {
  return this.form.controls
}

public hideReplyBox () {
  this.hideReply = !this.hideReply
}

public submit () {
  this.submitted = true

  if (this.form.invalid) {
    return
  }
  const formData = this.form.value

  this.messageService.reply(formData).subscribe(
    (response) => {
      this.notify.showSuccess('Reply sent!', 'Success')
      return response
    },
    (error) => {
      this.notify.showError(
        'There was a problem sending your reply',
        'Failed!'
      )
      return error
    }
  )
}

// private methods

private routeId () {
  this.paramSub = this.route.params.subscribe((params) => {
    this.id = params.id
  })
}

private getConversationMessages () {
  this.inbox = this.messageService.conversationMessages(this.id).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        this.router.navigate(['404'])
      }
      throw error
    })
  )
}

ngOnDestroy (): void {
  this.paramSub.unsubscribe()
  this.routeSub.unsubscribe()
}
}
