import {EmpresaModel} from './empresa.model';
import { CostesModel } from './costes.model';
export class TipoPartidaModel {
  _id: string;
  codigo: string;
  nombre: string;
  empresa: EmpresaModel;
  costes: CostesModel;
  constructor(options: {
    _id?: string,
    codigo?: string,
    nombre?: string,
    empresa?: EmpresaModel,
    costes?: CostesModel
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.nombre = options.nombre || null;
    this.empresa = options.empresa || null;
    this.costes = options.costes || null;
  }
}
