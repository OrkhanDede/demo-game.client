import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { getErrorMessage } from 'src/app/utils/getErrorMessage';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private notifyService: NotifyService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.authService.getAuthUserToken();
    var lang = localStorage.getItem('lang') as string;

    const apiReq = req.clone({
      url: environment.apiUrl + req.url,
      headers: req.headers.set('Authorization', token),
    });

    return next.handle(apiReq).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status == 0) {
          this.notifyService.error(
            'Connection Error',
            'Please try again a few minute later'
          );
        }
        if (response.status == 401 || response.error.statusCode == 401) {
          this.authService.resetAndRedirectToLogin();
        }
        if (response.status == 404) {
          this.router.navigate(['404']);
        }

        var messages = getErrorMessage(response.error);

        if (messages.length > 0) {
          const msg = messages[0];
          this.notifyService.error(msg.reason, msg.title);
        }

        return throwError(response);
      })
    );
  }
}
