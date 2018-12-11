import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../enums/project_endpoints';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../base/api.service';
import { BaseService } from '../../../base/base.service';
import { OperacionBancariaModel } from '../../../../models/operacion_bancaria.model';


@Injectable()
export class OperacionBancariaService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.operacion_bancaria}`, api);
  }

  objectToModel(item): any {
    return new OperacionBancariaModel(item);
  }
}
