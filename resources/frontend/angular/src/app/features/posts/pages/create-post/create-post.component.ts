import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { categories } from '../../categories'
import { Subscription } from 'rxjs'
import { DataService } from 'src/app/core/services/data.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
// CAPTCHA SITE KEY
public siteKey: string = '6LdLZ4odAAAAAN-Ei0Rhw1Tc_MOGiSFnd3ysKV9t';
// FORM
public submitted = false;
public form!: FormGroup;

private sub!: Subscription;
public error: string = '';
public categories: categories[] = [];

constructor (
  public fb: FormBuilder,
  private router: Router,
  private notify: NotificationService,
  private dataService: DataService
) {}

ngOnInit (): void {
  this.getCategories()

  this.form = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(5)
      ]
    ],
    summary: [
      '',
      [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(10)
      ]
    ],
    image: [
      '',
      [
        Validators.required,
        RxwebValidators.url(),
        RxwebValidators.startsWith({ value: 'http' })
      ]
    ],
    website: ['', [Validators.required, Validators.maxLength(60)]],
    url: ['', [Validators.required, RxwebValidators.url()]],
    categories: ['', Validators.required],
    recaptcha: ['', Validators.required]
  })
}

// public methods

/**
 * Takes categories form value to see how many options selected
 * Then Compares user selected against categories data // disables option if matched
 * Category ID passed in from HTML
 */

public isOptionDisabled (opt: any): boolean {
  return (
    this.form.get('categories')?.value.length >= 3 &&
    !this.form.get('categories')?.value.find((el: any) => el === opt)
  )
}

/**
 * Submit create post form
 * Navigates user to newly created post on success
 */

public submit () {
  this.submitted = true

  if (this.form.invalid) {
    return
  }
  const formData = this.form.value

  return this.dataService.createPost(formData).subscribe(
    (result: any) => {
      this.notify.showSuccess('Post Created!', 'Success')
      this.router.navigate(['/posts', result.post_id])
      return result
    },
    (error) => {
      this.error = error.error
    }
  )
}

/**
 * Used for form in HTML
 * @readonly
 */

public get title () {
  return this.form.get('title') as FormControl
}

public get summary () {
  return this.form.get('summary') as FormControl
}

public get image () {
  return this.form.get('image') as FormControl
}

public get website () {
  return this.form.get('website') as FormControl
}

public get url () {
  return this.form.get('url') as FormControl
}

public get category () {
  return this.form.get('categories') as FormControl
}

// private methods

/**
 * Gets category data from service
 */

private getCategories () {
  this.sub = this.dataService.getCategories().subscribe(
    (result) => {
      this.categories = result
      return result
    },
    (error) => {
      this.error = error
      return error
    }
  )
}

ngOnDestroy (): void {
  this.sub.unsubscribe()
}
}
