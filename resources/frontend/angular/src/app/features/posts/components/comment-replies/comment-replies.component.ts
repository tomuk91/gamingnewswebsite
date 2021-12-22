import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/directives/notification.service';
@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss'],
})
export class CommentRepliesComponent implements OnInit {
  @Input() comments: any;
  @Input() index!: number;
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2),
        ],
      ],
      post_id: [this.comments.post_id, Validators.nullValidator],
      parent_id: [this.comments.id, Validators.nullValidator],
    });

    this.form.patchValue({
      comment: '@' + this.comments.user.username,
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    console.log(formData);

    return this.http
      .post('http://localhost:8000/createcomment', formData)
      .subscribe((result) => {
        this.notify.showSuccess('Success!', 'Comment Created!');
        window.location.reload();
        return result;
      });
  }
}
