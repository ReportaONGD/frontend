import { EmpresaModel } from './empresa.model';

export class CategoriaModel {
  _id: string;
  valor: string;
  empresa: EmpresaModel;
  constructor(options: {
    _id?: string,
    valor?: string,
    empresa?: EmpresaModel
  } = {}) {
    this._id = options._id || null;
    this.valor = options.valor || null;
    this.empresa = options.empresa || null;
  }
}
