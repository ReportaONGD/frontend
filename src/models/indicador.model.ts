import {ProgresoModel} from './progreso.model';
import { FuenteVerificacionModel } from './fuente_verificacion.model';
import { MedidaModel } from './medida.model';


export class IndicadorModel {
  _id: string;
  codigo: string;
  descripcion: string;
  linea_base: number;
  meta:  number;
  comentario:  string;
  comentarios_ong: string;
  comentarios_aecid: string;
  progreso: ProgresoModel;
  fuente_verificacion?: Array<FuenteVerificacionModel>;
  medida?: MedidaModel[];
  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string,
    linea_base?: number,
    meta?: number,
    comentario?:  string,
    comentarios_ong?: string,
    comentarios_aecid?: string,
    progreso?: ProgresoModel,
    fuente_verificacion?: Array<FuenteVerificacionModel>
    medida?: MedidaModel[]
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.descripcion = options.descripcion || null;
    this.linea_base = options.linea_base || null;
    this.meta = options.meta || null;
    this.comentario = options.comentario || null;
    this.comentarios_ong = options.comentarios_ong || null;
    this.comentarios_aecid = options.comentarios_aecid || null;
    this.progreso = options.progreso || null;
    this.fuente_verificacion = options.fuente_verificacion || null;
    this.medida = options.medida || null;
  }
}
