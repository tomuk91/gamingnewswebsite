import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(): boolean {
    if (!this.auth.loginStatus) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
