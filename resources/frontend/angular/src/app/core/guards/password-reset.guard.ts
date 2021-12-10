import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  token: string = this.cookieService.get('passwordToken');

  canActivate(): boolean {
     if (!this.cookieService.get('passwordToken')) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}

