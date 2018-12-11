import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../../enums/project_endpoints';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../base/api.service';
import { BaseService } from '../../../../../base/base.service';
import { DocumentoModel } from '../../../../../../models/documento.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Utils } from '../../../../../../utils/utils';


@Injectable()
export class ObjetivoFuenteVerificacionDocumentosService extends BaseService {
  constructor( api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.og_fuente_verificacion_documento}`, api);
  }
  objectToModel(item): any {
    return new DocumentoModel(item);
  }
  post_document(item: any, file: any): Observable<any> {
    const ruta = super.getUrl();
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('data', JSON.stringify(item));
    return this.http.post<any>(ruta, formData)
      .pipe(
        catchError( (error) => {
          return Observable.throw(of(error));
        })
      );
  }

  download(item: DocumentoModel): Observable<any> {
    const ruta = `${environment.apiEndpoint}${EndPoints.og_fuente_verificacion_documento_download}`;
    const url = Utils.replace(ruta, this.ids);
    return this.http.post(url, item, {
      responseType: 'blob'
    }).pipe(
        catchError( (error) => {
          return Observable.throw(of(error));
        })
      );
  }
}
