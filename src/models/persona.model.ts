import {CategoriaModel} from './categoria.model';
import {ContratoModel} from './contrato.model';
import {TipoPersonalModel} from './tipo_personal.model';

export class PersonaModel {
  _id: string;
  nombre: string;
  residencia: string;
  horas_imputadas: number;
  salario_mensual: number;
  meses: number;
  salario_total: number;
  categoria: CategoriaModel;
  contrato: ContratoModel;
  tipo_personal: TipoPersonalModel;
  constructor(options: {
    _id?: string,
    nombre?: string,
    residencia?: string,
    horas_imputadas?: number,
    salario_mensual?: number,
    meses?: number,
    salario_total?: number,
    categoria?: CategoriaModel,
    contrato?: ContratoModel,
    tipo_personal?: TipoPersonalModel,
  } = {}) {
    this._id = options._id || null;
    this.nombre = options.nombre || null;
    this.residencia = options.residencia || null;
    this.horas_imputadas = options.horas_imputadas || null;
    this.salario_mensual = options.salario_mensual || null;
    this.meses = options.meses || null;
    this.salario_total = options.salario_total || null;
    this.categoria = options.categoria || null;
    this.contrato = options.contrato || null;
    this.tipo_personal = options.tipo_personal || null;
  }
}
