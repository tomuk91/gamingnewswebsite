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
  private tokenService: TokenStorageService,
  private route: Router
  ) {}

  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req
    const token = this.tokenService.getAccessToken()
    if (token != null) {
      authReq = this.addTokenHeader(req, token)
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse && error.status === 401
        ) {
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
