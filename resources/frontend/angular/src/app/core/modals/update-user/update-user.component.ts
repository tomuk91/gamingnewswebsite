import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PostDetailsComponent } from 'src/app/features/posts/pages/post-details/post-details.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  errorMessage: string = '';
  isReadable = false;
  changePassword = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PostDetailsComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl({ value: '' }),
      first_name: ['', [Validators.required, Validators.maxLength(15)]],
      last_name: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          RxwebValidators.password({
            validation: {
              maxLength: 10,
              minLength: 5,
              digit: true,
              specialCharacter: true,
            },
          }),
        ],
      ],
      password_confirmation: [
        '',
        [RxwebValidators.compare({ fieldName: 'password' })],
      ],
    });
    this.form.patchValue({
      username: this.data.user[0].username,
      first_name: this.data.user[0].first_name,
      last_name: this.data.user[0].last_name,
      email: this.data.user[0].email,
    });
  }

  get f() {
    return this.form.controls;
  }

  toggle() {
    this.changePassword = !this.changePassword;
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.http
      .post('http://localhost:8000/update' + this.data.user[0].id, formData)
      .subscribe(
        (result) => {
          this.notify.showSuccess('Success', 'Your profile has been updated!');
          this.dialogRef.close();
          window.location.reload();
          return result;
        },
        (error) => {
          this.notify.showError(
            'Error',
            'There has been an error updating your account'
          );
          this.errorMessage = error.error.message;
        }
      );
  }
}
