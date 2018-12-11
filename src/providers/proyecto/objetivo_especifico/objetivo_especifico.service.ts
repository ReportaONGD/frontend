import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { ObjetivoModel } from '../../../models/objetivo.model';


@Injectable()
export class ObjetivoEspecificoService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.objetivo_especifico}`, api);
  }

  objectToModel(item): any {
    return new ObjetivoModel(item);
  }
}
