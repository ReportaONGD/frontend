import { EmpresaModel } from './empresa.model';
import { PaisModel } from './pais.model';

export class ImplementadorModel {
  _id: string;
  nombre: string;
  descripcion: string;
  pais: PaisModel;
  empresa: EmpresaModel;
  publico: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    descripcion?: string,
    pais?: PaisModel,
    publico?: boolean,
    empresa?: EmpresaModel
  } = {}) {
    const item = Object.assign(this, options);
  }
}
