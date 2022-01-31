import { User } from 'src/app/features/user/user'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Image } from './image.model'
import { DataService } from '../../../../core/services/data.service'
import { RxwebValidators } from '@rxweb/reactive-form-validators'

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html'
})
export class ProfileImageUploadComponent implements OnInit {
@Input() user!: User; // Input user from profile-details
public form!: FormGroup;
public submitted = false;
protected files!: File;
protected image = new Image();

constructor (private fb: FormBuilder, private dataService: DataService) {}

ngOnInit (): void {
  // Initalize form
  this.form = this.fb.group({
    image: [
      '',
      [
        Validators.required,
        RxwebValidators.extension({
          extensions: ['jpeg', 'jpg', 'png']
        })
      ]
    ]
  })
}

// public methods

// Form control short-cut for use in HTML
public get f () {
  return this.form.controls
}

/**
 * Updates files varaible on detection of selected image
* Uses changes event in HTML
* Stored for proccessing in submit method.
*/

public uploadImage (event: any) {
  this.files = event.target.files[0]
}

/**
 * Submit file upload form
 * Uses files varaible to get image
 */

public submit () {
  this.submitted = true

  if (this.form.invalid) {
    return
  }

  const formData = new FormData()
  formData.append('image', this.files, this.files.name)

  this.dataService.uploadProfileImage(formData).subscribe((response) => {
    window.location.reload()
    return response
  })
}
}
