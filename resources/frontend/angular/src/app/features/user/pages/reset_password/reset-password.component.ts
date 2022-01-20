import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public submitted = false;
  public form!: FormGroup;
  protected token: string | null = '';

  constructor (
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.token = this.route.snapshot.paramMap.get('token')

    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          RxwebValidators.password({
            validation: {
              maxLength: 10,
              minLength: 5,
              digit: true,
              specialCharacter: true
            }
          })
        ]
      ],
      password_confirmation: [
        '',
        [
          Validators.required,
          RxwebValidators.compare({ fieldName: 'password' })
        ]
      ]
    })
  }

  // public methods

  public get f () {
    return this.form.controls
  }

  public submit () {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    const formData = this.form.value

    const data = {
      token: this.token,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    }

    this.auth.resetPassword(data).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        this.notify.showSuccess(
          'Password Updated!',
          'Login with your new details'
        )
        return response
      },
      (error) => {
        return error
      }
    )
  }
}
