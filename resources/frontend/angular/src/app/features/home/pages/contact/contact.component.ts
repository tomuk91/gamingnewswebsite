import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  siteKey: string = '6LdLZ4odAAAAAN-Ei0Rhw1Tc_MOGiSFnd3ysKV9t';
  submitted = false;
  form: FormGroup;
  options: string[] = [
    'Submission',
    'Restriction',
    'Account',
    'Help',
    'Partner',
    'Advertisement',
    'Technical Issue',
    'Other',
  ];

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private notify: NotificationService
  ) {
    this.form = this.fb.group({
      optionName: ['', Validators.required],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      url: ['', [RxwebValidators.url()]],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    console.log(formData);

    this.http.post('http://localhost:8000/contact', formData).subscribe(
      (result) => {
        this.notify.showSuccess('Your message has been received!', 'Success');
        location.reload();
        return result;
      },
      (error) => {
        this.notify.showError('There was a problem sending your message', 'Error');
        return error;
      }
    );
  }
}
