import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { User } from '../../features/user/user'
import { first, map, switchMap } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service'
import { Token } from '../../features/user/token'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
userData!: User | null;
public userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

private baseUrl = 'http://localhost:8000'

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
    this.tokenStorage.getRefreshToken() ?? null
  )
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

public login (data: {}) {
  const endpoint = '/oauth/token'
  return this.http
    .post<Token>(`${this.baseUrl}${endpoint}`, data)
    .pipe(switchMap((token: Token) => this.returnUser(token)))
    .pipe(
      map((user) => {
        this.userSubject.next(user)
        return user
      })
    )
}

public delete () {
  const endpoint = '/delete'
  return this.http.delete(`${this.baseUrl}${endpoint}`).pipe((response) => {
    this.userSubject.next([])
    return response
  })
}

public refreshLogout (): void {
  this.tokenStorage.signOut()
  this.CookieService.deleteAll()
  this.userSubject.next([])
}

public logout () {
  const endpoint = '/logout'
  return this.http
    .post<any>(`${this.baseUrl}${endpoint}`, null)
    .pipe((response) => {
      this.userSubject.next([])
      this.isLoggedIn.next(null)
      return response
    })
}

public logoutSuccess (): void {
  this.userSubject.next([])
  this.tokenStorage.signOut()
  this.CookieService.deleteAll()
  this.router.navigate(['/home'])
}

public refreshToken () {
  const endpoint = '/oauth/token'
  const token = this.tokenStorage.getRefreshToken()

  const data = {
    grant_type: 'refresh_token',
    refresh_token: `${token}`,
    client_id: 2,
    client_secret: 'pmILBlIAvkZHYoYUo2PDgNGX9jPE2KWyBjv8hY6h',
    scope: '*'
  }
  return this.http.post<any>(`${this.baseUrl}${endpoint}`, data)
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

protected returnUser (token: any): Observable<User[]> {
  this.tokenStorage.saveAccessToken(token.access_token)
  this.tokenStorage.saveRefreshToken(token.refresh_token)
  this.isLoggedIn.next(token.access_token)

  const endpoint = '/getLoggedInuser'
  const headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer ' + token.access_token
  })
  return this.http.get<User[]>(`${this.baseUrl}${endpoint}`, {
    headers: headers
  })
}
}
