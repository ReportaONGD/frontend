import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { DocumentoModel } from '../../../models/documento.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DocumentosService extends BaseService {
  constructor( api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.documentos}`, api);
  }

  objectToModel(item): any {
    return new DocumentoModel(item);
  }

  post_document(item: DocumentoModel): Observable<any> {
    const ruta = super.getUrl();
    return this.http.post(ruta, item, {
      responseType: 'blob'
    }).pipe(
        catchError( (error) => {
          return Observable.throw(of(error));
        })
      );
  }
}
