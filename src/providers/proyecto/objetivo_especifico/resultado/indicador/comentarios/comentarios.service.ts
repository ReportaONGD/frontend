import { Injectable } from '@angular/core';
import { EndPoints } from '../../../../../../enums/project_endpoints';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../base/api.service';
import { BaseService } from '../../../../../base/base.service';
import { ComentarioModel } from '../../../../../../models/comentario.model';


@Injectable()
export class ResultadoIndicadorComentariosService extends BaseService {
  constructor( api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.resultado_ind_comentarios}`, api);
  }

  objectToModel(item): any {
    return new ComentarioModel(item);
  }
}
