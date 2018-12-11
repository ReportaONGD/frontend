import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../enums/project_endpoints';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../base/api.service';
import { BaseService } from '../../../../base/base.service';
import { FuenteVerificacionModel } from '../../../../../models/fuente_verificacion.model';

@Injectable()
export class OEFuenteVerificacionService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.fuente_vrificacion_oe}`, api);
  }

  objectToModel(item): any {
    return new FuenteVerificacionModel(item);
  }
}
