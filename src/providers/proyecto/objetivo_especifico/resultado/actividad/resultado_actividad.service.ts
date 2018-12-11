import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../enums/project_endpoints';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../base/api.service';
import { BaseService } from '../../../../base/base.service';
import { ActividadModel } from '../../../../../models/actividad.model';

@Injectable()
export class ResultadoActividadService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.resultado_actividad}`, api);
  }
  objectToModel(item): any {
    return new ActividadModel(item);
  }
}
