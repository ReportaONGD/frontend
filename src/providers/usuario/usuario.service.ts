import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EndPoints } from '../../enums/project_endpoints';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../../models/usuario.model';
import { ApiService } from '../base/api.service';
import { BaseService } from '../base/base.service';


@Injectable()
export class UsuarioService extends BaseService {
  constructor(api: ApiService) {
    super(`${environment.apiEndpoint}${EndPoints.usuario}`, api);
  }

  objectToModel(item): any {
    return new UsuarioModel(item);
  }

  refreshToken(): Observable<any> {
    return this.api.get(this.getUrl() + '/' + 'refresh_token').pipe(
      token => token
    );
  }

  login(usuario): Observable<any> {
    return this.api.post(this.getUrl() + '/' + 'login', usuario).pipe(
      token => token
    );
  }

  forgot(usuario): Observable<any> {
    return this.api.post(this.getUrl() + '/' + 'login', usuario).pipe(
      token => token
    );
  }

}


