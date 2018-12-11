import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
const dateFormat = new NgbCumstonDateParserFormatter();
export class ComentarioModel {
    _id: string;
    fecha: any;
    texto: string;
    constructor(options: {
      _id?: string,
      fecha?: any,
      texto?: string,
    } = {}) {
      this._id = options._id || null;
      this.fecha = this.setDateValue(options.fecha);
      this.texto = options.texto || null;
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
