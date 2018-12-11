import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ImportExcelService extends BaseService {
  constructor( api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.import_excel}`, api);
  }

  objectToModel(item): any {
    return item;
  }

  post_document(file: any): Observable<any> {
    const ruta = super.getUrl();
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // formData.append('data', JSON.stringify(item));
    return this.http.post<any>(ruta, formData)
      .pipe(
        catchError( (error) => {
          return Observable.throw(of(error));
        })
      );
  }
}
