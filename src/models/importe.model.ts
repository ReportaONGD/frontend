import {DetalleImporteModel} from './detalle_importe.model';

export class ImporteModel {
  _id: string;
  subvencion: number;
  rendimiento: number;
  detalle_importe: DetalleImporteModel;
  constructor(options: {
    _id?: string,
    subvencion?: number,
    rendimiento?: number,
    detalle_importe?: DetalleImporteModel,
  } = {}) {
    this._id = options._id || null;
    this.subvencion = options.subvencion || null;
    this.rendimiento = options.rendimiento || null;
    this.detalle_importe = options.detalle_importe || null;
  }
}
