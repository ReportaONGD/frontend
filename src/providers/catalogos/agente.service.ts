import { AgenteModel } from './../../models/agente.model';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class AgenteService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.agente}`, api);
  }

  objectToModel(item): any {
    return new AgenteModel(item);
  }
}
