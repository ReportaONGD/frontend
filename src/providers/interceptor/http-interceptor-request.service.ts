// tslint:disable-next-line:max-line-length
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpHeaders, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
@Injectable()
export class HttpInterceptorRequest implements HttpInterceptor {
  private requestInFlight$: BehaviorSubject<boolean>;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private authService: AuthService, private status: HTTPStatus) {  }
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // this.status.setHttpStatus(true);
    let headers = new HttpHeaders();
    if (req.body && typeof(req.body) === 'string') {
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    return req.clone({ headers });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any>> {

    return next.handle(this.addToken(req, !this.isRefreshingToken ? this.authService.getAuthToken() : this.authService.getRefreshToken()))
      // return next.handle(this.addToken(req, this.authService.getAuthToken()))
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
            default:
              return Observable.throw(error);
          }
        } else {
          return Observable.throw(error);
        }
      }).finally(() => { this.status.setHttpStatus(false); })  as any;
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return Observable.throw(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .switchMap((newToken: string) => {
          if (newToken) {
            this.authService.setCurrentUser(newToken);
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, this.authService.getAuthToken()));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        })
        .catch(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, this.authService.getCurrentUser().refresh_token));
        });
    }
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    this.authService.setLoggedOut();
    return Observable.throw('');
  }
}


// import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import { catchError, finalize, map } from 'rxjs/operators';
// import { AuthService } from '../auth/login.service';

// // import {Http} from '@angular/http';

// @Injectable()
// export class HTTPStatus {
//   private requestInFlight$: BehaviorSubject<boolean>;
//   constructor() {
//     this.requestInFlight$ = new BehaviorSubject(false);
//   }

//   setHttpStatus(inFlight: boolean) {
//     this.requestInFlight$.next(inFlight);
//   }

//   getHttpStatus(): Observable<boolean> {
//     return this.requestInFlight$;
//   }
// }
// @Injectable()
// export class HttpInterceptorRequest implements HttpInterceptorRequest {
//   user: any;
//   status: HTTPStatus = new HTTPStatus();

//   constructor(private authService: AuthService) {

//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     console.log('intercepted request ... ');
//     if (sessionStorage.getItem('user')) {
//       this.user = JSON.parse(sessionStorage.getItem('user'));
//     }
//     // Clone the request to add the new header.
//     // if (req.url.indexOf('rer') === -1 && !this.user) {
//     //   // this.app.getActiveNav().push(LoginPage);
//     //   return Observable.throw(new HttpErrorResponse(
//     //     { status: 401 })
//     //   );
//     // }
//     const refresh_token = req.url.indexOf('refresh') > 0 ? true : false;
//     const headers = this.setRequestOptionArgs(refresh_token);
//     const authReq = req.clone({ headers });
//     // const authReq = req.clone();
//     console.log('Sending request with new header now ...');

//     // send the newly created request
//     // return next.handle(authReq)
//     // .catch((error, caught) => {
//     //   // intercept the response error and displace it to the console
//     //   console.log('Error Occurred');
//     //   console.log(error);
//     //   // return the error to the method that called it
//     //   return Observable.throw(error);
//     // }) as any;
//     return next.handle(authReq).pipe(
//       map(event => {
//         this.status.setHttpStatus(true);
//         return event;
//       }),
//       // catchError((error, caugth) => {
//       catchError((error) => {
//         console.log('Error Occurred');
//         console.log(error);
//         // return the error to the method that called it
//         if (error.status === 401) {
//           console.log('Refrescando Token');
//           return null;
//         }
//         return Observable.throw(error);
//       }),
//       finalize(() => {
//         this.status.setHttpStatus(false);
//       })
//     ) as any;
//   }

//   private setRequestOptionArgs(refresh_token) {
//     // let user = {};
//     let headers = new HttpHeaders();
//     headers = headers.append('Content-Type', 'application/json; charset=utf-8');
//     headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     headers = headers.append('Access-Control-Allow-Origin', '*');
//     if (this.user !== undefined) {
//       let token = '';
//       if (!refresh_token) {
//         token = this.user.token;
//       } else {
//         token = this.user.refresh_token;
//       }
//       headers = headers.append('Authorization', 'Bearer ' + token);
//     }
//     return headers;
//   }
// }
