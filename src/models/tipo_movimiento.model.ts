import { EmpresaModel } from './empresa.model';

export class TipoMovimientoModel {
  _id: string;
  valor: string;
  empresa: EmpresaModel;
  es_entrada: boolean;
  origen: boolean;
  destino: boolean;
  cheque: boolean;
  pago: boolean;
  constructor(options: {
    _id?: string,
    valor?: string,
    empresa?: EmpresaModel,
    es_entrada?: boolean,
    origen?: boolean,
    destino?: boolean,
    cheque?: boolean,
    pago?: boolean
  } = {}) {
    this._id = options._id || null;
    this.valor = options.valor || null;
    this.empresa = options.empresa || null;
    this.es_entrada = options.es_entrada !== undefined ? options.es_entrada : null;
    this.origen = options.origen !== undefined ? options.origen : null;
    this.destino = options.destino !== undefined ? options.destino : null;
    this.pago = options.pago || null;
  }
}
