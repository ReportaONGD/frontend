import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../enums/project_endpoints';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../base/api.service';
import { BaseService } from '../../../../base/base.service';
import { HipotesisModel } from '../../../../../models/hipotesis.model';


@Injectable()
export class ResultadoHipotesisService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.resultado_hipotesis}`, api);
  }

  objectToModel(item): any {
    return new HipotesisModel(item);
  }
}
