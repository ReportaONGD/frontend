import {PaisModel} from './pais.model';
export class ProyectoListadoModel {
  _id: string;
  codigo: string;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  pais: string;
  coste_total: string;
  constructor(options: {
    _id?: string,
    codigo?: string,
    nombre?: string,
    titulo?: string,
    fecha_inicio?: any,
    fecha_fin?: any,
    pais?: PaisModel,
    coste_total?: number
  } = {}) {

    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.nombre = options.nombre || null;
    this.fecha_inicio =  options.fecha_inicio ? options.fecha_inicio : null;
    this.fecha_fin = options.fecha_fin ? options.fecha_fin : null;
    this.pais = options.pais ? options.pais.valor : null;
    this.coste_total = options.coste_total ? options.coste_total.toFixed(2) : null;
  }
}
