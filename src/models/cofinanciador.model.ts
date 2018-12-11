import {EmpresaModel} from './empresa.model';

export class CofinanciadorModel {
  _id: string;
  valor: string;
  empresa: EmpresaModel;
  publica?: boolean;
  constructor(options: {
    _id?: string,
    valor?: string,
    empresa?: EmpresaModel,
    publica?: boolean
  } = {}) {
    this._id = options._id || null;
    this.valor = options.valor || null;
    this.empresa = options.empresa || null;
    this.publica = options.publica || null;
  }
}
