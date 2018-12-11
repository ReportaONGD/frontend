import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { PeriodoModel } from '../../../models/periodo.model';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';


@Injectable()
export class PeriodoService extends BaseService {

  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.periodo}`, api);
  }

  objectToModel(item): any {
    return new PeriodoModel(item);
  }
}
