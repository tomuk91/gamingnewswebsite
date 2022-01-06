import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/features/user/user';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  clicked: boolean = false;
  public!: boolean;
  sub!: Subscription;
  user!: User[];

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.publicState();
    this.getUserId();
  }

  getUserId() {
   this.user = this.auth.userValue;
  }

  publicState() {
    this.sub = this.auth.public.subscribe(
      (value) => {
        this.public = value;
        console.log(this.public)
      }
    )
  }

  Clicked() {
    this.clicked = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
