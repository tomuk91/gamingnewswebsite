import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/user';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { DeleteUserComponent } from 'src/app/core/modals/delete-user/delete-user.component';
import { UpdateUserComponent } from 'src/app/core/modals/update-user/update-user.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  user!: User;
  subscription!: Subscription;
  editPic = false;
  HasImage = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((user) => {
      if (user.user) {
        this.user = user.user;
      } else {
        throwError('Error getting user');
      }
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
}
