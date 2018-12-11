import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { EntidadModel } from '../../../models/entidad.model';


@Injectable()
export class EntidadService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.entidad}`, api);
  }

  objectToModel(item): any {
    return new EntidadModel(item);
  }
}
