import { AgenteModel } from './../../models/agente.model';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';
import { FinanciadorModel } from '../../models/financiador.model';


@Injectable()
export class SocioLocalService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.socio_local}`, api);
  }

  objectToModel(item): any {
    return new AgenteModel(item);
  }
}
