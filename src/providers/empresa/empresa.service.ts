import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';
import { EmpresaModel } from '../../models/empresa.model';


@Injectable()
export class EmpresaService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.empresa}`, api);
  }

  objectToModel(item): any {
    return new EmpresaModel(item);
  }
}
