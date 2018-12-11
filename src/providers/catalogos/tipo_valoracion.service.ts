import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { TipoValoracionModel } from '../../models/tipo_valoracion.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class TipoValoracionService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.tipo_valoracion}`, api);
  }

  objectToModel(item): TipoValoracionModel {
    return new TipoValoracionModel(item);
  }
}
