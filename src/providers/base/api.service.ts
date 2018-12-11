import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  get(url: string): Observable<any> {
   return this.http.get<any>(url)
   .pipe(
      catchError(this.handleError('get'))
    );
  }

  post(url: string, item: any): Observable<any> {
    return this.http.post<any>(url, JSON.stringify(item))
      .pipe(
        catchError(this.handleError('post'))
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }

  put(url: string, item: any): Observable<any> {
    // const id = item.categoria._id;
    return this.http.put<any>(url, JSON.stringify(item))
      .pipe(
        catchError(this.handleError<any>('put'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(of(error as T));
    };
  }

  private log(message: string) {
    console.log('Project Service: ' + message);
  }
}
