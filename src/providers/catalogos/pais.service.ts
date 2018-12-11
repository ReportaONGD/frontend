import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class PaisService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.pais}`, api);
  }

  objectToModel(item): any {
    return item;
  }
}
