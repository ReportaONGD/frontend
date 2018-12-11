import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { TipoMovimientoModel } from '../../models/tipo_movimiento.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class TipoMovimientoService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.tipo_movimiento}`, api);
  }

  objectToModel(item): TipoMovimientoModel {
    return new TipoMovimientoModel(item);
  }
}
