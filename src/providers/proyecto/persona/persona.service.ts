import { Injectable } from '@angular/core';
import { EndPoints } from '../../../enums/project_endpoints';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../base/api.service';
import { BaseService } from '../../base/base.service';
import { PersonaModel } from '../../../models/persona.model';


@Injectable()
export class PersonaService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.persona}`, api);
  }

  objectToModel(item): any {
    return new PersonaModel(item);
  }
}
