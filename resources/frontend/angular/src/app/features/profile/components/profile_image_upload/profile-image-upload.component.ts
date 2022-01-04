import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Image } from './image.model';
import { DataService } from '../../../../core/services/data.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
})
export class ProfileImageUploadComponent implements OnInit {
  @Input() user!: any;
  form!: FormGroup;
  files: any;
  submitted = false;
  image = new Image();

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      image: [
        '',
        [
          Validators.required,
          RxwebValidators.extension({ extensions: ['jpeg', 'jpg', 'png'] }),
        ],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.files, this.files.name);

    this.dataService.uploadProfileImage(formData).subscribe((response) => {
      window.location.reload();
      return response;
    });
  }
}
