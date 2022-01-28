import { DataService } from './../../services/data.service'
import { AuthenticationService } from './../../services/authentication.service'
import { categories } from '../../../features/posts/categories'
import { SpinnerService } from './../../services/spinner.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Observable, Subscription } from 'rxjs'
import { UserDetails } from 'src/app/features/user/UserDetails'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
public user: Observable<UserDetails[]>;
public isLoggedIn!: Observable<any>;
public categories: categories[] = [];
public error = '';
private sub!: Subscription;

constructor (
  private notify: NotificationService,
  private authService: AuthenticationService,
  private dataService: DataService,
  public spinnerService: SpinnerService
) {
  this.user = this.authService.user
}

ngOnInit (): void {
  console.log(this.user)
  this.getUser()
  this.getCategories()
}

// public methods

/**
 * Logout user
 * Called on button click
 */

public logout () {
  this.authService.logout().subscribe((success) => {
    this.notify.showSuccess('Logout', 'Successful')
    this.authService.logoutSuccess()
    return success
  })
}

// protected methods

/**
 * Get User Data from auth service
 */

protected getUser () {
  this.authService.loggedIn.subscribe((value) => {
    this.isLoggedIn = value
  })
}

/**
 **Get Categories from data service
 */

protected getCategories () {
  this.sub = this.dataService.getCategories().subscribe(
    (result) => {
      this.categories = result
      return result
    },
    (error) => {
      this.error = error
      return error
    }
  )
}

ngOnDestroy (): void {
  this.sub.unsubscribe()
}
}
