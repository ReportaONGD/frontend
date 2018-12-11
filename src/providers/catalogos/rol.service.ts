import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';
import { RolModel } from '../../models/rol.model';


@Injectable()
export class RolService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.rol}`, api);
  }

  objectToModel(item): any {
    return new RolModel(item);
  }
}
