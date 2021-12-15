import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { categories } from './categories';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  submitted = false;
  sub!: Subscription;
  error: string = '';
  form!: FormGroup;
  categories: categories[] = [];

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
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
    console.log(this.form.value);
    return;

    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;

    return this.dataService.createPost(formData).subscribe(
      (result) => {
        console.log('created!');
        return result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
