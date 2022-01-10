import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../../features/user/user';
import { first, map, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Token } from '../../features/user/token';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData!: User | null;
  public userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private isLoggedIn: BehaviorSubject<string | null>;
  public public = new Subject<boolean>();
  public loggedIn: Observable<any>;
  public user: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private CookieService: CookieService
  ) {
    this.isLoggedIn = new BehaviorSubject(
      this.tokenStorage.getRefreshToken() ?? null
    );
    this.user = this.userSubject.asObservable();
    this.loggedIn = this.isLoggedIn.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get loginStatus() {
    return this.isLoggedIn.value;
  }

  getCurrentUser() {
    return this.http
      .get<User[]>('//localhost:8000/getLoggedInuser')
      .pipe(first());
  }

  getProfileData(id: number) {
    const params = new HttpParams({
      fromObject: { id },
    });
    return this.http
      .get<User[]>('//localhost:8000/profiledata', {params: params})
      .pipe(first());
  }

  returnUser(token: any): Observable<User[]> {
    this.tokenStorage.saveAccessToken(token.access_token);
    this.tokenStorage.saveRefreshToken(token.refresh_token);
    this.isLoggedIn.next(token.access_token);

    let headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token.access_token,
    });
    return this.http.get<User[]>('//localhost:8000/getLoggedInuser', {
      headers: headers,
    });
  }

  login(data: {}) {
    return this.http
      .post<Token>('//localhost:8000/oauth/token', data)
      .pipe(switchMap((token: Token) => this.returnUser(token)))
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  delete() {
    return this.http.delete('//localhost:8000/delete').pipe((response) => {
      this.userSubject.next([]);
      return response;
    });
  }

  refreshLogout(): void {
    this.tokenStorage.signOut();
    this.CookieService.deleteAll();
    this.userSubject.next([]);
  }

  logout() {
    return this.http
      .post<any>('//localhost:8000/logout', null)
      .pipe((response) => {
        this.userSubject.next([]);
        this.isLoggedIn.next(null);
        return response;
      });
  }

  logoutSuccess(): void {
    this.userSubject.next([]);
    this.tokenStorage.signOut();
    this.CookieService.deleteAll();
    this.router.navigate(['/home']);
  }

  refreshToken() {
    const token = this.tokenStorage.getRefreshToken();

    const data = {
      grant_type: 'refresh_token',
      refresh_token: `${token}`,
      client_id: 2,
      client_secret: 'pmILBlIAvkZHYoYUo2PDgNGX9jPE2KWyBjv8hY6h',
      scope: '*',
    };
    return this.http.post<any>('//localhost:8000/oauth/token', data);
  }

  forgotPassword(data: {}) {
    return this.http
      .post('//localhost:8000/forgot-password/forgot', data)
      .pipe((response) => {
        return response;
      });
  }

  resetPassword(data: {}) {
    return this.http
      .post('//localhost:8000/forgot-password/reset', data)
      .pipe((response) => {
        return response;
      });
  }
}
