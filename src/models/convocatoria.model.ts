import { AgenteModel } from './agente.model';
import { EmpresaModel } from './empresa.model';
import { FinanciadorModel } from './financiador.model';

export class ConvocatoriaModel {
  _id: string;
  codigo: string;
  nombre: string;
  financiador: AgenteModel;
  empresa: EmpresaModel;
  constructor(options: {
    _id?: string,
    codigo?: string,
    nombre?: string,
    financiador?: AgenteModel,
    empresa?: EmpresaModel
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.nombre = options.nombre || null;
    this.financiador = new AgenteModel(options.financiador) || null;
    this.empresa = options.empresa || null;
  }
}
