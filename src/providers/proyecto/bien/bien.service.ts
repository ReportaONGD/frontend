import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { BienModel } from '../../../models/bien.model';


@Injectable()
export class BienService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.bien}`, api);
  }

  objectToModel(item): any {
    return new BienModel(item);
  }
}
