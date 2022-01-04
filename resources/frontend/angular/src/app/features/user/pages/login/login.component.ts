import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Token } from '../../token';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/core/modals/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  login!: boolean;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notify: NotificationService,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openDialogUpdatePassword() {
    this.dialog.open(ForgotPasswordComponent, {
      height: '240px',
      width: '600px',
    });
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

    const data = {
      username: formData.username,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'pmILBlIAvkZHYoYUo2PDgNGX9jPE2KWyBjv8hY6h',
      scope: '*',
    };

    this.authenticationService
      .login(data)
      .pipe()
      .subscribe(
        (user) => {
          this.notify.showSuccess('Welcome to Retromize', 'Login Successful');
          this.router.navigate(['/home']);
          return user;
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
