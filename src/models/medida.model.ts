import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
const dateFormat = new NgbCumstonDateParserFormatter();

export class MedidaModel {
  _id: string;
  valor: string;
  comentario: string;
  fecha: any;

  constructor(options: {
    _id?: string,
    valor?: string,
    comentario?: string,
    fecha?: any,
    _fecha?: any
  } = {}) {
    options.fecha = this.setDateValue(options.fecha);
    const item = Object.assign(this, options);
  }
  setDateValue(value) {
    if (!value) { return null; }
    if (typeof(value) === 'string') {
      return dateFormat.parse(value);
    } else {
      return dateFormat.format(value);
    }
  }
}
