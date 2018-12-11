import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { TipoPersonalModel } from '../../models/tipo_personal.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class TipoPersonalService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.tipo_personal}`, api);
  }

  objectToModel(item): TipoPersonalModel {
    return new TipoPersonalModel(item);
  }
}
