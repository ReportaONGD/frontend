import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { PartidaModel } from '../../../models/partida.model';


@Injectable()
export class PartidaService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.partida}`, api);
  }

  objectToModel(item): any {
    return new PartidaModel(item);
  }
}
