import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { TipoPeriodoModel } from '../../../models/tipo_periodo.model';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';


@Injectable()
export class TipoPeriodoService extends BaseService {

  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.tipo_periodo}`, api);
  }

  objectToModel(item): any {
    return new TipoPeriodoModel(item);
  }
}
