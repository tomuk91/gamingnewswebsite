import { TokenStorageService } from './../../services/token-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/directives/notification.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PostDetailsComponent } from 'src/app/features/posts/pages/post-details/post-details.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService,
    private notify: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<PostDetailsComponent>,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.auth.delete().subscribe((result) => {
      this.notify.showSuccess('Success', 'Account was deleted successfully!');
      this.router.navigate(['/home']);
      this.tokenStorage.signOut();
      this.dialogRef.close();
      return result;
    });
  }
}
