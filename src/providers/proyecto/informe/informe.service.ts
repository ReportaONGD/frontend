import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { InformeModel } from '../../../models/informe.model';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class InformeService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.informe}`, api);
  }

  objectToModel(item): any {
    return new InformeModel(item);
  }

  get_document(): Observable<any> {
    return this.http.get(environment.excelEndPoint, {
      responseType: 'blob'
    }).pipe(
        catchError( (error) => {
          return Observable.throw(of(error));
        })
      );
  }
}
