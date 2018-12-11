import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';


@Injectable()
export class CuentaBancariaService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.cuenta_bancaria}`, api);
  }

  objectToModel(item): any {
    return new CuentaBancariaModel(item);
  }
}
