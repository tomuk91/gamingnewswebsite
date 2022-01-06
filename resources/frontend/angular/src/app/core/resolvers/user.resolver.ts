import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../features/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  constructor(private auth: AuthenticationService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    let id = route.params['id'];
    return this.auth.getProfileData(id);
  }
}
