import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor (private tokenExtractor: HttpXsrfTokenExtractor) {}
  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestToForward = req
    const token = this.tokenExtractor.getToken() as string
    if (token !== null) {
      requestToForward = req.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token
        })
      })
    }
    return next.handle(requestToForward)
  }
}
