import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { TipoPartidaModel } from '../../models/tipo_partida.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class TipoPartidaService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.tipo_partida}`, api);
  }

  objectToModel(item): TipoPartidaModel {
    return new TipoPartidaModel(item);
  }
}
