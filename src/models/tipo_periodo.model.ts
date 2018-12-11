import { EmpresaModel } from './empresa.model';

export class TipoPeriodoModel {
  _id: string;
  codigo: string;
  nombre: string;
  empresa: EmpresaModel;

  constructor(options: {
    _id?: string,
    nombre?: string,
    descripcion?: string,
    fecha_inicio?: string,
    fecha_fin?: string,
    empresa?: EmpresaModel
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.nombre || null;
    this.nombre = options.nombre || null;
    this.empresa = options.empresa || null;
  }
}
