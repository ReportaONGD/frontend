import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';


@Injectable()
export class ProyectoGongService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.proyecto_gong}`, api);
  }

  objectToModel(item): any {
    return item;
  }

  importar(proyecto): Observable<any> {
    return this.api.get(this.getUrl() + '/' + proyecto.id + '/' + 'importar').pipe(
      token => token
    );
  }

}
