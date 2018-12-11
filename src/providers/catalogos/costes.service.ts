import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { CostesModel } from '../../models/costes.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class CostesService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.costes}`, api);
  }

  objectToModel(item): CostesModel {
    return new CostesModel(item);
  }
}
