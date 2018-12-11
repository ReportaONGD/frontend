import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
const dateFormat = new NgbCumstonDateParserFormatter();
export class BienModel {
  _id: string;
  proveedor: string;
  descripcion: string;
  cantidad: number;
  importe: number;
  fecha: any;
  constructor(options: {
    _id?: string,
    proveedor?: string,
    descripcion?: string,
    cantidad?: number,
    importe?: number,
    fecha?: any,
  } = {}) {
    this._id = options._id || null;
    this.proveedor = options.proveedor || null;
    this.descripcion = options.descripcion || null;
    this.cantidad = options.cantidad || null;
    this.importe = options.importe || null;
    this.fecha = this.setDateValue(options.fecha);
  }
  setDateValue(value) {
    if (!value) { return null; }
    if (typeof (value) === 'string') {
      return dateFormat.parse(value);
    } else {
      return dateFormat.format(value);
    }
  }
}
