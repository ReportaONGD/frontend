import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { EtapaValidacionModel } from '../../../models/etapa_validacion.model';


@Injectable()
export class ValidacionService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.validacion}`, api);
  }

  objectToModel(item): any {
    return new EtapaValidacionModel(item);
  }
}
