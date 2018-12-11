import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { CategoriaModel } from '../../models/categoria.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class CategoriaService extends BaseService {

  constructor(api: ApiService, private http: HttpClient) {
    super(`${environment.apiEndpoint}${EndPoints.categoria}`, api);
  }

  objectToModel(item: any): CategoriaModel {
    return new CategoriaModel(item);
  }
}
