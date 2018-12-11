import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../../enums/project_endpoints';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../base/api.service';
import { BaseService } from '../../../../../base/base.service';
import { MedidaModel } from '../../../../../../models/medida.model';


@Injectable()
export class ResultadoMedidaService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.resultado_medida}`, api);
  }

  objectToModel(item): any {
    return new MedidaModel(item);
  }
}
