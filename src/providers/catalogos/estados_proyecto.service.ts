import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { EstadoProyectoModel } from '../../models/estado_proyecto.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class EstadosProyectoService extends BaseService {

  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.estados_proyecto}`, api);
  }

  objectToModel(item): EstadoProyectoModel {
    return new EstadoProyectoModel(item);
  }

}
