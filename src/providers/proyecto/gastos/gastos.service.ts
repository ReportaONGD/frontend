import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { GastoModel } from '../../../models/gasto.model';


@Injectable()
export class GastosService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.gasto}`, api);
  }

  objectToModel(item): any {
    return new GastoModel(item);
  }
}
