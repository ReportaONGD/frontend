import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { AportacionModel } from '../../../models/aportacion.model';


@Injectable()
export class AportacionService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.aportacion}`, api);
  }

  objectToModel(item): any {
    return new AportacionModel(item);
  }
}
