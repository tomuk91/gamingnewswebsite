import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LoginComponent } from 'src/app/features/user/pages/login/login.component'
import { NotificationService } from 'src/app/core/services/notification.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  public emailSubmitted = false;
  public formPassword!: FormGroup;
  public passwordError: string = '';

  constructor (
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private notify: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit (): void {
    this.formPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  // public methods

  /**
   * From control shortcut to use in html
   * @readonly
   */

  public get p () {
    return this.formPassword.controls
  }

  /**
 * close forgot-password modal
 */

  public cancel () {
    this.dialogRef.close()
  }

  /**
   * Submit password request form
   * calls forgotPassword method in Authentication service
   */

  public submitPasswordRequest () {
    this.emailSubmitted = true

    if (this.formPassword.invalid) {
      return
    }

    const formData = this.formPassword.value

    const data = {
      email: formData.email
    }

    this.auth.forgotPassword(data).subscribe(
      (response: any) => {
        this.notify.showSuccess('Check your email!', 'Reset Instructions Sent')
        this.router.navigate(['/home'])
        return response
      },
      (error) => {
        this.passwordError = error.error.message
      }
    )
  }
}
