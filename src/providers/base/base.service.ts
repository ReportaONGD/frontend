import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Utils } from '../../utils/utils';
import { ApiService } from './api.service';

export interface BaseServiceInterface {
  ids: any;
  objectToModel: (item: any) => any;
  all: () => Observable<any>;
  get: (id: string) => Observable<any>;
  post: (item: any) => Observable<any>;
  put: (id: string, item: any) => Observable<any>;
  delete: (id: string) => Observable<any>;
  getUrl: () => string;
}

@Injectable()
export abstract class BaseService implements BaseServiceInterface {
  ids: any;

  constructor(public baseUrl: string, public api: ApiService) {
  }

  abstract objectToModel(item: any): any;

  all(): Observable<any> {
    return this.api.get(this.getUrl()).pipe(map(
      items => items.map(item => this.objectToModel(item))
    ));
  }

  get(id: string): Observable<any> {
    return this.api.get(this.getUrl() + '/' + id).pipe(map(
      item => this.objectToModel(item)
    ));
  }

  post(item: any): Observable<any> {
    return this.api.post(this.getUrl(), item).pipe(map(
      item2 => this.objectToModel(item2)
    ));
  }

  delete(id: string): Observable<any> {
    return this.api.delete(this.getUrl() + '/' + id);
  }

  put(id: string, item: any): Observable<any> {
    return this.api.put(this.getUrl() + '/' + id, item).pipe(map(
      item2 => this.objectToModel(item2)
    ));
  }

  getUrl() {
    return Utils.replace(this.baseUrl, this.ids);
  }

}
