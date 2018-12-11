import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { PresupuestoModel } from '../../../models/presupuesto.model';


@Injectable()
export class PresupuestoService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.presupuesto}`, api);
  }

  objectToModel(item): any {
    return new PresupuestoModel(item);
  }
}
