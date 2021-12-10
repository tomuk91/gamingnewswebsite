import { SpinnerService } from './../../services/spinner.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../../shared/directives/notification.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/user/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: Observable<any>;
  isLoggedIn!: Observable<any>;

  constructor(
    private notify: NotificationService,
    private authService: AuthenticationService,
    public spinnerService: SpinnerService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.authService.logout().subscribe(first());
    this.notify.showSuccess('Logout', 'Successful');
  }

  ngOnDestroy(): void {}
}
