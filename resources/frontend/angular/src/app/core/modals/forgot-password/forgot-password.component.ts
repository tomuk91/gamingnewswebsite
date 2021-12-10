import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from 'src/app/features/user/pages/login/login.component';
import { NotificationService } from 'src/app/shared/directives/notification.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  emailSubmitted = false;
  formPassword!: FormGroup;
  passwordError: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private cookieService: CookieService,
    private notify: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.formPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get p() {
    return this.formPassword.controls;
  }

  cancel() {
    this.dialogRef.close();
  }

  submitPasswordRequest() {
    this.emailSubmitted = true;

    if (this.formPassword.invalid) {
      return;
    }

    const formData = this.formPassword.value;

    const data = {
      email: formData.email,
    };

    this.auth.forgotPassword(data).subscribe(
      (response: any) => {
        this.notify.showSuccess('Check your email!', 'Reset Instructions Sent');
        this.router.navigate(['/home']);
        return response;
      },
      (error) => {
        this.passwordError = error.error.message;
      }
    );
  }
}
