import {EmpresaModel} from './empresa.model';
import { RolModel } from './rol.model';

export class UsuarioModel {
  _id: string;
  username: string;
  email: string;
  empresa?: EmpresaModel;
  admin?: boolean;
  refresh_token?: string;
  fail_login?: number;
  activo?: boolean;
  password?: string;
  roles?: RolModel[];
  constructor(options: {
    _id?: string,
    username?: string,
    email?: string,
    empresa?: EmpresaModel,
    admin?: boolean,
    refresh_token?: string,
    fail_login?: number,
    activo?: boolean,
    password?: string,
    roles?: RolModel[]
  } = {}, opts?: any[]) {
    this._id = options._id || '';
    this.username = options.username || '';
    this.empresa = options.empresa || null;
    this.admin = options.admin || false;
    this.email = options.email || '';
    this.refresh_token = options.refresh_token || null;
    this.fail_login = options.fail_login || 0;
    this.activo = options.activo || true;
    this.password = options.password || null;
    this.roles = options.roles || new Array<RolModel>();
  }
}
