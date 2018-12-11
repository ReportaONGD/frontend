import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { PagoModel } from '../../../models/pago.model';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';


@Injectable()
export class PagoService extends BaseService {

  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.pago}`, api);
  }

  objectToModel(item): any {
    return new PagoModel(item);
  }
}
