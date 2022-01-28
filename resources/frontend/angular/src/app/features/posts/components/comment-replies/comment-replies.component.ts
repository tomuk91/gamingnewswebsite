import { CommentsService } from 'src/app/core/services/comments-service'
import { comments } from 'src/app/features/posts/comments'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NotificationService } from 'src/app/core/services/notification.service'
@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent implements OnInit {
  @Input() comments!: comments;
  @Input() index!: number;
  public form!: FormGroup;
  public submitted = false;

  constructor (
    private fb: FormBuilder,
    private commentService: CommentsService,
    private notify: NotificationService
  ) {}

  ngOnInit (): void {
    this.form = this.fb.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2)
        ]
      ],
      post_id: [this.comments.post_id, Validators.nullValidator],
      parent_id: [this.comments.id, Validators.nullValidator]
    })

    this.form.patchValue({
      comment: '@' + this.comments.user.username // @user to reply too
    })
  }

  // public methods

  /**
   * Submit replies form (user replies to parent comments)
   * uses comment service - passing form data
   * reloads page on success
   */

  public submit () {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    const formData = this.form.getRawValue()

    return this.commentService.replyToComment(formData)
      .subscribe((result) => {
        this.notify.showSuccess('Success!', 'Comment Created!')
        window.location.reload()
        return result
      })
  }
}
