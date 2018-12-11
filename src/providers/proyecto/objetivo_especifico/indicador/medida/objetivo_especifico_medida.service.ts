import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../enums/project_endpoints';
import { environment } from '../../../../../environments/environment';
import { MedidaModel } from '../../../../../models/medida.model';
import { ApiService } from '../../../../base/api.service';
import { BaseService } from '../../../../base/base.service';

@Injectable()
export class OEMedidaService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.medida_oe}`, api);
  }

  objectToModel(item): any {
    return new MedidaModel(item);
  }
}
