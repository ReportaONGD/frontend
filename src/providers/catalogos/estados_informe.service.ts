import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { EstadoInformeModel } from '../../models/estado_informe.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class EstadosInformeService extends BaseService {

  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.estados_informe}`, api);
  }

  objectToModel(item): EstadoInformeModel {
    return new EstadoInformeModel(item);
  }

}
