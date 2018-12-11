import { EmpresaModel } from './empresa.model';
import { PaisModel } from './pais.model';

export class AgenteModel {
  _id: string;
  nombre: string;
  descripcion: string;
  pais: PaisModel;
  empresa: EmpresaModel;
  financiador: boolean;
  implementador: boolean;
  socio_local: boolean;
  publico: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    descripcion?: string,
    pais?: PaisModel,
    publico?: boolean,
    financiador?: boolean,
    implementador?: boolean,
    socio_local?: boolean,
    empresa?: EmpresaModel
  } = {}) {
    const item = Object.assign(this, options);
  }
}
