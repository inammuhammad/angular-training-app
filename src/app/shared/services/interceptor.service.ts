import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private _loadingBar: LoadingBarService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authentication', 'Bearer abc123'),
      body: {
        ...req.body,
        'myParam': 1
      }
    });

    this._loadingBar.start();

    return next.handle(clonedRequest).pipe(delay(5000), map((res: any) => {
      if (res.status === 401) {
        // call login api
        // TODO: refresh TOKEN logic
      }

      this._loadingBar.stop();
      return res;
    }), catchError(error => {
      return of();
    }));
  }
}
