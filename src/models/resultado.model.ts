import {HipotesisModel} from './hipotesis.model';
import {ActividadModel} from './actividad.model';
import {IndicadorModel} from './indicador.model';
import { ComentarioModel } from './comentario.model';
export class ResultadoModel {
  _id: string;
  codigo: string;
  descripcion: string;
  duracion: number;
  coste_total: number;
  hipotesis?: Array<HipotesisModel>;
  indicadores?: Array<IndicadorModel>;
  actividades?: Array<ActividadModel>;
  comentarios?: Array<ComentarioModel>;
  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string,
    duracion?: number,
    coste_total?: number,
    hipotesis?: Array<HipotesisModel>,
    indicadores?: Array<IndicadorModel>,
    actividades?: Array<ActividadModel>,
    comentarios?: Array<ComentarioModel>
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.descripcion = options.descripcion || null;
    this.duracion = options.duracion || null;
    this.coste_total = options.coste_total || null;
    this.hipotesis = options.hipotesis || null;
    this.indicadores = options.indicadores || null;
    this.actividades = options.actividades || null;
    this.comentarios = options.comentarios || new Array<ComentarioModel>();
  }
}
