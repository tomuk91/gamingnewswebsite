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
public user!: User;
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

public openDialogContact () {
  this.dialog.open(ContactUserComponent, {
    height: '475px',
    width: '600px',
    data: {
      userId: this.userId
    }
  })
}

public openDialogDelete () {
  this.dialog.open(DeleteUserComponent, {
    height: '290px',
    width: '600px',
    data: {
      user: this.user
    }
  })
}

public openDialogUpdate () {
  this.dialog.open(UpdateUserComponent, {
    height: '530px',
    width: '600px',
    data: {
      user: this.user
    }
  })
}

public changeImage () {
  this.editPic = !this.editPic
}

// private methods

private extractUserIdFromUrl () {
  this.routeSub = this.activatedRoute.params.subscribe((params) => {
    this.userId = params.id
  })
}

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
