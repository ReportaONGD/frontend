import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { ModificacionModel } from '../../../models/modificacion.model';


@Injectable()
export class ModificacionService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.modificacion}`, api);
  }

  objectToModel(item): any {
    return new ModificacionModel(item);
  }
}
