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
  selector: 'app-contact-user',
  templateUrl: './contact-user.component.html',
  styleUrls: ['./contact-user.component.scss'],
})
export class ContactUserComponent implements OnInit {
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
      message: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
      subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      conversation_id: ['0', Validators.nullValidator],
      send_to: [this.data.userId, Validators.nullValidator],
    });
  }

  get f() {
    return this.form.controls;
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;

    //if (this.form.invalid) {
     // return;
   // }
     console.log(this.form.value);
    const formData = this.form.value;

    this.http
      .post('http://localhost:8000/sendmessage', formData)
      .subscribe(
        (result) => {
          this.notify.showSuccess('Success', 'Your message was sent');
          this.dialogRef.close();
          window.location.reload();
          return result;
        },
        (error) => {
          this.notify.showError(
            'Error',
            'There has been an error sending your message'
          );
          this.errorMessage = error.error.message;
        }
      );
  }
}
