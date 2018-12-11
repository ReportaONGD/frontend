import { CostesModel } from './costes.model';
import { EtapaModel } from './etapa.model';

export class PartidaModel {
  _id: string;
  nombre: string;
  codigo: string;
  costes?: CostesModel;
  importe?: number;
  aecid: boolean;
  partida_padre?: PartidaModel;
  es_padre?: boolean;
  es_inversion?: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    codigo?: string,
    costes?: CostesModel,
    importe?: number,
    aecid?: boolean,
    partida_padre?: PartidaModel,
    es_padre?: boolean,
    es_inversion?: boolean
  } = {}) {
    this._id = options._id || null;
    this.nombre = options.nombre || null;
    this.codigo = options.codigo || null;
    this.importe = options.importe || null;
    this.aecid = options.aecid ? true : false;
    this.costes = options.costes || null;
    this.partida_padre = options.partida_padre || null;
    this.es_padre = options.es_padre;
    this.es_inversion = options.es_inversion;
  }
}
