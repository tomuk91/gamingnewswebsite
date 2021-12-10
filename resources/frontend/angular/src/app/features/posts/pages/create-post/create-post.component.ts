import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { categories } from './categories';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  sub!: Subscription;
  error: string = '';
  form!: FormGroup;
  categories: categories[] = [];

  constructor(public fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
   this.sub = this.http.get<categories[]>('http://localhost:8000/category').subscribe(
      (result) => {
        this.categories = result;
        return result;
      },
      (error) => {
        this.error = error;
        return error;
      }
    );

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
      summary: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      image: ['', [Validators.required, RxwebValidators.url(), RxwebValidators.startsWith({value:'http'})]],
      website: ['', [Validators.required, Validators.maxLength(40)]],
      url: ['', [Validators.required, RxwebValidators.url()]],
      categories: ['', Validators.required],
    })
  }

  submit() {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
