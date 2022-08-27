import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { UserDataService } from './core/services/user-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);
  constructor(
    private authService: AuthService,
    private userDataService: UserDataService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authService.logOut();
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.userDataService.getUser().token;
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
