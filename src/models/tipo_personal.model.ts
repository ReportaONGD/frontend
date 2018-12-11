import {EmpresaModel} from './empresa.model';

export class TipoPersonalModel {
  _id: string;
  valor: string;
  codigo: string;
  empresa: EmpresaModel;
  constructor(options: {
    _id?: string,
    valor?: string,
    codigo?: string,
    empresa?: EmpresaModel
  } = {}) {
    this._id = options._id || null;
    this.valor = options.valor || null;
    this.codigo = options.codigo || null;
    this.empresa = options.empresa || null;
  }
}
