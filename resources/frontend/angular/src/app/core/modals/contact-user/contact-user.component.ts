import { MessageService } from 'src/app/core/services/message.service'
import { Component, Inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { NotificationService } from 'src/app/core/services/notification.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PostDetailsComponent } from 'src/app/features/posts/pages/post-details/post-details.component'

@Component({
  selector: 'app-contact-user',
  templateUrl: './contact-user.component.html',
  styleUrls: ['./contact-user.component.scss']
})
export class ContactUserComponent implements OnInit {
  public submitted = false;
  public form!: FormGroup;
  public errorMessage: string = '';
  public isReadable = false;
  public changePassword = false;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private notify: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PostDetailsComponent>
  ) {}

  ngOnInit (): void {
    this.form = this.fb.group({
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(400)
        ]
      ],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      recipient: [this.data.userId, Validators.nullValidator]
    })
  }

  // public methods

  /**
   * form controls shortcut to use in html
   */

  public get f () {
    return this.form.controls
  }

  /**
 * close the modal
 */

  public cancel () {
    this.dialogRef.close()
  }

  /**
 * submit contact user form
 * checks validation / returns if invalid
 * calls createConversation, passing the formData in messageService
 * errors are caught and passed to errorMessage Variable
 */
  public submit () {
    this.submitted = true

    if (this.form.invalid) {
      return
    }
    const formData = this.form.value

    this.messageService.createConversation(formData).subscribe(
      (result) => {
        this.dialogRef.close()
        this.notify.showSuccess('Success', 'Your conversation was created!')
        return result
      },
      (error) => {
        this.notify.showError(
          'Error',
          'There has been an error creating your conversation'
        )
        this.errorMessage = error.error.message
      }
    )
  }
}
