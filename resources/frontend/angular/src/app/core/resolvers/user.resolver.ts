import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../features/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  constructor(private auth: AuthenticationService, private router: Router) {}
  resolve(): Observable<User[]> | Promise<User[]> | User[] {
    return this.auth.getCurrentUser();
  }
}
