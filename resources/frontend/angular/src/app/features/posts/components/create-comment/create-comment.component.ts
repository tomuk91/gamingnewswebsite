import { comments } from 'src/app/features/posts/comments'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { CommentsService } from 'src/app/core/services/comments-service'

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
@Input() comments!: comments[];
public submitted = false;
public form!: FormGroup;
private routeSub!: Subscription;
private postId: string = '';

constructor (
  private fb: FormBuilder,
  private commentService: CommentsService,
  private notify: NotificationService,
  public auth: AuthenticationService,
  private route: ActivatedRoute
) {}

ngOnInit (): void {
  this.routeSub = this.route.params.subscribe((params) => {
    this.postId = params.id
  })

  this.form = this.fb.group({
    comment: [
      '',
      [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2)
      ]
    ],
    post_id: [this.postId, Validators.nullValidator],
    parent_id: ['0', Validators.nullValidator]
  })
}

/**
 * Submit comment form
 * Creates parent comment to post
 * Post ID supplied from route
 * uses createComment method in CommentsService
 */

submit () {
  if (this.form.invalid || !this.auth.loginStatus) return

  this.submitted = true

  const formData = this.form.getRawValue()

  return this.commentService.createComment(formData)
    .subscribe((result) => {
      this.notify.showSuccess('Success!', 'Comment Created!')
      window.location.reload()
      return result
    })
}

ngOnDestroy () {
  this.routeSub.unsubscribe()
}
}
