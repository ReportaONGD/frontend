import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { CofinanciadorModel } from '../../models/cofinanciador.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class CofinanciadorService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.cofinanciador}`, api);
  }

  objectToModel(item): CofinanciadorModel {
    return new CofinanciadorModel(item);
  }

}
