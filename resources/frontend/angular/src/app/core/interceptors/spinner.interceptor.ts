import { SpinnerService } from '../services/spinner.service'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {
  constructor (private spinnerService: SpinnerService) {}

  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let finished = false

    setTimeout(() => {
      if (!finished) {
        this.spinnerService.isLoading.next(true)
      }
    }, 700)

    return next.handle(req).pipe(
      finalize(() => {
        finished = true
        this.spinnerService.isLoading.next(false)
      })
    )
  }
}
