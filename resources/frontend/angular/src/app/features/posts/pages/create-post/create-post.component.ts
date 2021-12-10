import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    console.log('success');
  }
}
