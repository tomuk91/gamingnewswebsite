import { User } from './../../features/user/user'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Data, Router } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service'
import { CookieService } from 'ngx-cookie-service'
import { UserDetails } from 'src/app/features/user/UserDetails'
import { Token } from 'src/app/features/user/token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
userData!: User | null;
public userSubject = new BehaviorSubject<UserDetails | null>(null);

private baseUrl = '//localhost:8000/api';

private isLoggedIn: BehaviorSubject<string | null>;
public public = new Subject<boolean>();
public loggedIn: Observable<any>;
public user: Observable<any>;

constructor (
  private router: Router,
  private http: HttpClient,
  private tokenStorage: TokenStorageService,
  private CookieService: CookieService
) {
  this.isLoggedIn = new BehaviorSubject(
    this.tokenStorage.getAccessToken() ?? null)
  this.user = this.userSubject.asObservable()
  this.loggedIn = this.isLoggedIn.asObservable()
}

public get userValue () {
  return this.userSubject.value
}

public get loginStatus () {
  return this.isLoggedIn.value
}

// public methods

public register (data: Data) {
  const endpoint = '/register'
  return this.http.post(`${this.baseUrl}${endpoint}`, data)
}

public getCurrentUser () {
  const endpoint = '/getLoggedInuser'
  return this.http
    .get<User[]>(`${this.baseUrl}${endpoint}`)
    .pipe(first())
}

public getProfileData (id: number) {
  const endpoint = '/profiledata'
  const params = new HttpParams({
    fromObject: { id }
  })
  return this.http
    .get<User[]>(`${this.baseUrl}${endpoint}`, { params: params })
    .pipe(first())
}

public updateUser (id: number, data: Data) {
  const endpoint = '/update' + id
  return this.http.post(`${this.baseUrl}${endpoint}`, data)
}

public login (data: {}) {
  const endpoint = '/login'
  return this.http
    .post<Token>(`${this.baseUrl}${endpoint}`, data)
    .pipe(switchMap((token: Token) => this.returnUser(token.token)))
    .pipe(
      map((user: UserDetails) => {
        return this.userSubject.next(user)
      })
    )
}

public delete () {
  const endpoint = '/delete'
  return this.http
    .delete(`${this.baseUrl}${endpoint}`)
    .pipe((response) => {
      this.userSubject.next(null)
      return response
    })
}

public logout () {
  const endpoint = '/logout'
  return this.http
    .post<any>(`${this.baseUrl}${endpoint}`, null)
    .pipe((response) => {
      this.userSubject.next(null)
      this.isLoggedIn.next(null)
      return response
    })
}

public logoutSuccess (): void {
  this.userSubject.next(null)
  this.tokenStorage.signOut()
  this.CookieService.deleteAll()
  this.router.navigate(['/home'])
}

public forgotPassword (data: {}) {
  const endpoint = '/forgot-password/forgot'
  return this.http
    .post(`${this.baseUrl}${endpoint}`, data)
    .pipe((response) => {
      return response
    })
}

public resetPassword (data: {}) {
  const endpoint = '/forgot-password/reset'
  return this.http
    .post(`${this.baseUrl}${endpoint}`, data)
    .pipe((response) => {
      return response
    })
}

// protected methods

protected returnUser (token: any) {
  this.tokenStorage.saveAccessToken(token)
  this.isLoggedIn.next(token)

  const endpoint = '/getLoggedInuser'
  const headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  })
  return this.http.get<UserDetails>(`${this.baseUrl}${endpoint}`, {
    headers: headers
  })
}
}
