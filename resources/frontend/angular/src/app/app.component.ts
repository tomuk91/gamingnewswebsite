import { AuthenticationService } from './core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public loading: SpinnerService,
    public auth: AuthenticationService
  ) {
    if (this.auth.loginStatus) {
      this.auth.getCurrentUser().subscribe((user: any) => {
        if (user) {
          this.auth.userSubject.next(user);
        } else {
          return;
        }
      });
    }
  }
  ngOnInit(): void {
  }
}
