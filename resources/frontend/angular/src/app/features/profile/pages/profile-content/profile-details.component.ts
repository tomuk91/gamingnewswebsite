import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/user';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { ContactUserComponent } from 'src/app/core/modals/contact-user/contact-user.component';
import { DeleteUserComponent } from 'src/app/core/modals/delete-user/delete-user.component';
import { UpdateUserComponent } from 'src/app/core/modals/update-user/update-user.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  private userId!: number;
  private routeSub!: Subscription;
  private sub!: Subscription;
  public editPic = false;
  public HasImage = false;
  public user!: User;
  public!: boolean;

  constructor(
    private auth: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.extractUserIdFromUrl();
    this.getUserData();
  }

  extractUserIdFromUrl() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  getUserData() {
    this.sub = this.activatedRoute.data.subscribe((user) => {
      if (user.user) {
        this.user = user.user;
        this.public = user.user.public;
        this.auth.public.next(user.user.public);
      } else {
        throwError('Error getting user');
      }
    });
  }



  openDialogContact() {
    this.dialog.open(ContactUserComponent, {
      height: '475px',
      width: '600px',
      data: {
        userId: this.userId,
      },
    });
  }
  openDialogDelete() {
    this.dialog.open(DeleteUserComponent, {
      height: '290px',
      width: '600px',
      data: {
        user: this.user,
      },
    });
  }

  openDialogUpdate() {
    this.dialog.open(UpdateUserComponent, {
      height: '530px',
      width: '600px',
      data: {
        user: this.user,
      },
    });
  }

  changeImage() {
    this.editPic = !this.editPic;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.sub.unsubscribe();
  }
}
