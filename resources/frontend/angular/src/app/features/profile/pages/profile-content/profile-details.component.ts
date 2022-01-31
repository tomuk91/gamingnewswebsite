import { accolades } from './../../accolades.interface'
import { MatDialog } from '@angular/material/dialog'
import { Component, OnInit } from '@angular/core'
import { User } from '../../../user/user'
import { ActivatedRoute } from '@angular/router'
import { Subscription, throwError } from 'rxjs'
import { ContactUserComponent } from 'src/app/core/modals/contact-user/contact-user.component'
import { DeleteUserComponent } from 'src/app/core/modals/delete-user/delete-user.component'
import { UpdateUserComponent } from 'src/app/core/modals/update-user/update-user.component'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
public accolades!: accolades[];
public userId!: number;
public editPic = false;
public HasImage = false;
public user!: User; // User Data
public public!: boolean;
private routeSub!: Subscription;
private sub!: Subscription;

constructor (
  private auth: AuthenticationService,
  private activatedRoute: ActivatedRoute,
  private dialog: MatDialog
) {}

ngOnInit (): void {
  this.extractUserIdFromUrl()
  this.getUserData()
}

// public methods

/**
 * Contact user modal
 * Passes userId to the modal
 */

public openDialogContact () {
  this.dialog.open(ContactUserComponent, {
    height: '475px',
    width: '600px',
    data: {
      userId: this.userId
    }
  })
}

/**
 * Delete user modal
 * Passes userId to the modal
 */

public openDialogDelete () {
  this.dialog.open(DeleteUserComponent, {
    height: '290px',
    width: '600px',
    data: {
      user: this.user
    }
  })
}

/**
 * Update user modal
 * Passes userId to the modal
 */

public openDialogUpdate () {
  this.dialog.open(UpdateUserComponent, {
    height: '530px',
    width: '600px',
    data: {
      user: this.user
    }
  })
}

/**
* Toogle based on user click
* On toggle, shoes upload form to change user profile image
*/

public changeImage () {
  this.editPic = !this.editPic
}

// private methods

/**
* Get userId from params using activated routes
* Assigned to a subscription, unsubcribes in ngOnDestroy
*/
private extractUserIdFromUrl () {
  this.routeSub = this.activatedRoute.params.subscribe((params) => {
    this.userId = params.id
  })
}

/**
 * Gets user data from user resolver
 * Updates varaibles user, piblic and accolades upon success
 */

private getUserData () {
  this.sub = this.activatedRoute.data.subscribe((user) => {
    if (user.user) {
      this.user = user.user
      this.public = user.user.public
      this.accolades = user.user[0].accolades
      this.auth.public.next(user.user.public)
    } else {
      throwError('Error getting user')
    }
  })
}

ngOnDestroy (): void {
  this.routeSub.unsubscribe()
  this.sub.unsubscribe()
}
}
