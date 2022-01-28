import { TokenStorageService } from './../../services/token-storage.service'
import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'
import { AuthenticationService } from '../../services/authentication.service'
import { PostDetailsComponent } from 'src/app/features/posts/pages/post-details/post-details.component'

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService,
    private notify: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<PostDetailsComponent>,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit (): void {}

  // public methods

  /**
 * close delete-user modal
 */

  public cancel () {
    this.dialogRef.close()
  }

  /**
 * delete user from DB
 * calls delete method in authentication service
 * no params, checks current user in backend
 */

  public delete () {
    this.auth.delete().subscribe((result) => {
      this.notify.showSuccess('Success', 'Account was deleted successfully!')
      this.router.navigate(['/home'])
      this.tokenStorage.signOut()
      this.dialogRef.close()
      return result
    })
  }
}
