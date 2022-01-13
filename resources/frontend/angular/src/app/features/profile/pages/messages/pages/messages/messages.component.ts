import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { messages } from './messages.interface';
import { catchError } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public inbox!: Observable<messages[]>;
  form!: FormGroup;
  public conversations!: any;
  private routeSub = new Subscription();
  private paramSub = new Subscription();
  public hideReply: boolean = true;
  submitted = false;
  id!: number;

  constructor(
    private router: Router,
    private notify: NotificationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // GET ID FROM ROUTE
    this.paramSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getConversationMessages();

    // SET FORM
    this.form = this.fb.group({
      message: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      conversation_id: [this.id, Validators.nullValidator],
    });
  }

  getConversationMessages() {
    this.inbox = this.messageService.conversationMessages(this.id).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['404']);
        }
        throw error;
      })
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;

    this.messageService.reply(formData).subscribe(
      (response) => {
        this.notify.showSuccess('Reply sent!', 'Success');
        return response;
      },
      (error) => {
        this.notify.showError(
          'There was a problem sending your reply',
          'Failed!'
        );
        return error;
      }
    );

    console.log(formData);
  }

  hideReplyBox() {
    this.hideReply = !this.hideReply;
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
