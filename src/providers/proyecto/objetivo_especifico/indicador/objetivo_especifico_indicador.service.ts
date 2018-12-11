import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../enums/project_endpoints';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../base/api.service';
import { BaseService } from '../../../base/base.service';
import { IndicadorModel } from '../../../../models/indicador.model';

@Injectable()
export class ObjetivoEspecificoIndicadorService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.indicador_oe}`, api);
  }

  objectToModel(item): any {
    return new IndicadorModel(item);
  }
}
