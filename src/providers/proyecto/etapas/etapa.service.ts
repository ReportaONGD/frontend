import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { EtapaModel } from '../../../models/etapa.model';


@Injectable()
export class EtapaService extends BaseService {

  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.etapa}`, api);
  }

  objectToModel(item): any {
    return new EtapaModel(item);
  }
}
