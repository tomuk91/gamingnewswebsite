import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { categories } from './categories';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  siteKey: string = '6LdLZ4odAAAAAN-Ei0Rhw1Tc_MOGiSFnd3ysKV9t';
  submitted = false;
  sub!: Subscription;
  error: string = '';
  form!: FormGroup;
  categories: categories[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private notify: NotificationService,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(5),
        ],
      ],
      summary: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(10),
        ],
      ],
      image: [
        '',
        [
          Validators.required,
          RxwebValidators.url(),
          RxwebValidators.startsWith({ value: 'http' }),
        ],
      ],
      website: ['', [Validators.required, Validators.maxLength(60)]],
      url: ['', [Validators.required, RxwebValidators.url()]],
      categories: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub = this.dataService.getCategories().subscribe(
      (result) => {
        this.categories = result;
        return result;
      },
      (error) => {
        this.error = error;
        return error;
      }
    );
  }

  isOptionDisabled(opt: any): boolean {
    return (
      this.form.get('categories')?.value.length >= 3 &&
      !this.form.get('categories')?.value.find((el: any) => el == opt)
    );
  }

  get title() {
    return this.form.get('title') as FormControl;
  }

  get summary() {
    return this.form.get('summary') as FormControl;
  }

  get image() {
    return this.form.get('image') as FormControl;
  }

  get website() {
    return this.form.get('website') as FormControl;
  }

  get url() {
    return this.form.get('url') as FormControl;
  }

  get category() {
    return this.form.get('categories') as FormControl;
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;

    return this.dataService.createPost(formData).subscribe(
      (result: any) => {
        this.notify.showSuccess('Post Created!', 'Success');
        this.router.navigate(['/posts', result.post_id]);
        return result;
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
