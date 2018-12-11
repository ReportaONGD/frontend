import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../../enums/project_endpoints';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../base/api.service';
import { BaseService } from '../../../../../base/base.service';
import { RecursoModel } from '../../../../../../models/recurso.model';


@Injectable()
export class ActividadRecursoService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.actividad_recurso}`, api);
  }

  objectToModel(item): any {
    return new RecursoModel(item);
  }
}
