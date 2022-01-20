import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotificationService } from 'src/app/core/services/notification.service'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public submitted = false;
  public errorMessage: string = '';

  constructor (
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit (): void {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]
      ],
      first_name: ['', [Validators.required, Validators.maxLength(15)]],
      last_name: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
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

  public success () {
    this.notify.showSuccess(
      'Login with your new credentials',
      'Registration Successful!'
    )
    return this.router.navigate(['/login'])
  }

  public get f () {
    return this.form.controls
  }

  public submit () {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    const formData = this.form.value

    this.http.post('http://localhost:8000/register', formData).subscribe(
      (result) => {
        this.success()
        return result
      },
      (error) => {
        this.errorMessage = error.error.message
      }
    )
  }
}
