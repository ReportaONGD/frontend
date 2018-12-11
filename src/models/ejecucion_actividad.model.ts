import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
const dateFormat = new NgbCumstonDateParserFormatter();
export class EjecucionActividadModel {
  _id: string;
  fecha_inicio: any;
  fecha_fin: any;
  // mes_inicio: number;
  // mes_fin: number;
  // anio_inicio: number;
  // anio_fin: number;
  constructor(options: {
    _id?: string,
    fecha_inicio?: any,
    fecha_fin?: any,
    // mes_inicio?: number,
    // mes_fin?:	number,
    // anio_inicio?: number,
    // anio_fin?:	number,
  } = {}) {
    this._id = options._id || null;
    this.fecha_inicio = this.setDateValue(options.fecha_inicio);
    this.fecha_fin = this.setDateValue(options.fecha_fin);
    // this.mes_inicio = this.setMonthValue(this.fecha_inicio);
    // this.mes_fin = this.setMonthValue(this.fecha_fin);
    // this.anio_inicio = this.setYearValue(this.fecha_inicio);
    // this.anio_fin =  this.setYearValue(this.fecha_fin);
  }
  setDateValue(value) {
    if (!value) { return null; }
    if (typeof(value) === 'string') {
      return dateFormat.parse(value);
    } else {
      return dateFormat.format(value);
    }
  }
  // setMonthValue(value) {
  //   if (!value) { return null; }
  //   if (typeof(value) !== 'string') {
  //     return value.month;
  //   } else {
  //     return value.split('/')[1];
  //   }
  // }
  // setYearValue(value) {
  //   if (!value) { return null; }
  //   if (typeof(value) !== 'string') {
  //     return value.year;
  //   }else {
  //     return value.split('/')[2];
  //   }
  // }
}
