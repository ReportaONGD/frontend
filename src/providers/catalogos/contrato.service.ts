import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ContratoModel } from '../../models/contrato.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class ContratoService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.contrato}`, api);
  }

  objectToModel(item): ContratoModel {
    return new ContratoModel(item);
  }
}
