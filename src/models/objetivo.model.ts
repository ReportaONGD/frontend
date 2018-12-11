import {HipotesisModel} from './hipotesis.model';
import {ResultadoModel} from './resultado.model';
import {IndicadorModel} from './indicador.model';
import { ComentarioModel } from './comentario.model';

export class ObjetivoModel {
  _id: string;
  codigo: string;
  descripcion: string;
  general: boolean;
  resultados?: Array<ResultadoModel>;
  hipotesis?: Array<HipotesisModel>;
  indicadores?: Array<IndicadorModel>;
  comentarios?: Array<ComentarioModel>;
  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string,
    general?: boolean,
    hipotesis?: Array<HipotesisModel>,
    resultados?: Array<ResultadoModel>,
    indicadores?: Array<IndicadorModel>,
    comentarios?: Array<ComentarioModel>
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.descripcion = options.descripcion || null;
    this.general = options.general || false;
    this.hipotesis = options.hipotesis || null;
    this.resultados = options.resultados || null;
    this.indicadores = options.indicadores || null;
    this.comentarios = options.comentarios || new Array<ComentarioModel>();
  }
}
