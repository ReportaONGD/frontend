import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../enums/project_endpoints';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../base/api.service';
import { BaseService } from '../../../base/base.service';
import { ResultadoModel } from '../../../../models/resultado.model';


@Injectable()
export class ResultadoService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.resultado}`, api);
  }

  objectToModel(item): any {
    return new ResultadoModel(item);
  }
}
