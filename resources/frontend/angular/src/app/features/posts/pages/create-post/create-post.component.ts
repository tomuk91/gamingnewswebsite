import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
      summary: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      image: ['', [Validators.required, RxwebValidators.url(), RxwebValidators.startsWith({value:'http'})]],
      website: ['', [Validators.required, Validators.maxLength(40)]],
      url: ['', [Validators.required, RxwebValidators.url()]],
    })
  }

  submit() {
    console.log(this.form.value);
  }
}
