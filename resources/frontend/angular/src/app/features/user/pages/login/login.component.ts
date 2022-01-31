
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { MatDialog } from '@angular/material/dialog'
import { ForgotPasswordComponent } from 'src/app/core/modals/forgot-password/forgot-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public submitted = false;
public form!: FormGroup;
public errorMessage: string = '';
protected login!: boolean;

constructor (
  private fb: FormBuilder,
  private router: Router,
  private notify: NotificationService,
  private authenticationService: AuthenticationService,
  private dialog: MatDialog
) {}

ngOnInit (): void {
  // Initalize form
  this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
}

// public methods

/**
 * Update password modal
 * Opens ForgetPasswordComponent on click
 */

public openDialogUpdatePassword () {
  this.dialog.open(ForgotPasswordComponent, {
    height: '240px',
    width: '600px'
  })
}

/**
 * Form control short-cut for use in HTML
 */

public get f () {
  return this.form.controls
}

/**
 * Submit login form
 * Takes formData from form varaible
 * Uses Authentification Service - login method
 */

public submit () {
  this.submitted = true

  if (this.form.invalid) {
    return
  }

  const formData = this.form.value

  const data = {
    email: formData.email,
    password: formData.password
  }

  this.authenticationService.login(data).subscribe(
    () => {
      this.notify.showSuccess(
        'Welcome to Retromize',
        'Login Successful'
      )
      this.router.navigate(['/home'])
    },
    (error) => {
      this.errorMessage = error.error.message
    }
  )
}
}
