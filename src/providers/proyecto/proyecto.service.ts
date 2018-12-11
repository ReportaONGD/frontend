import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ProyectoModel } from '../../models/proyecto.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class ProyectoService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.proyecto}`, api);
  }

  objectToModel(item): any {
    return new ProyectoModel(item);
  }
}
