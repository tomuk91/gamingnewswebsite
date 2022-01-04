import { categories } from './../../../features/posts/pages/create-post/categories';
import { DataService } from 'src/app/core/services/data.service';
import { SpinnerService } from './../../services/spinner.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: Observable<any>;
  isLoggedIn!: Observable<any>;
  categories: categories[] = [];
  error = '';
  sub!: Subscription;

  constructor(
    private notify: NotificationService,
    private authService: AuthenticationService,
    private dataService: DataService,
    public spinnerService: SpinnerService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });

    this.sub = this.dataService.getCategories().subscribe(
      (result) => {
        this.categories = result;
        return result;
      },
      (error) => {
        this.error = error;
        return error;
      }
    );
  }

  logout() {
    this.authService.logout().subscribe((success) => {
      this.authService.logoutSuccess();
      this.notify.showSuccess('Logout', 'Successful');
      return success;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
