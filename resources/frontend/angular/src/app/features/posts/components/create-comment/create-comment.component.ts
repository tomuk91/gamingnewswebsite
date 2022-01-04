import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Input() comments: any;
  submitted = false;
  form!: FormGroup;
  private routeSub!: Subscription;
  private post_id: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notify: NotificationService,
    public auth: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.post_id = params['id'];
    });

    this.form = this.fb.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2),
        ],
      ],
      post_id: [this.post_id, Validators.nullValidator],
      parent_id: ['0', Validators.nullValidator],
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  submit() {
    this.submitted = true;

    console.log(this.comments);

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    return this.http
      .post('http://localhost:8000/createcomment', formData)
      .subscribe((result) => {
        this.notify.showSuccess('Success!', 'Comment Created!');
        window.location.reload();
        return result;
      });
  }
}
