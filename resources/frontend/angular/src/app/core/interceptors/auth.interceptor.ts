import { AuthenticationService } from './../services/authentication.service'
import { Router } from '@angular/router'
import { TokenStorageService } from '../services/token-storage.service'
import { Observable, throwError } from 'rxjs'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor (
  private auth: AuthenticationService,
  private tokenService: TokenStorageService,
  private route: Router
  ) {}

  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req
    const token = this.tokenService.getAccessToken() // access token from token service
    if (token != null) {
      authReq = this.addTokenHeader(req, token)
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse && error.status === 401 // check if error is 401
        ) {
          this.tokenService.signOut()
          this.route.navigate(['/login'])
        } else {
          return throwError(error)
        }
        return throwError(error)
      })
    )
  }

  private addTokenHeader (request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
