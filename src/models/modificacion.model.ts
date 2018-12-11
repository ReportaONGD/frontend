import { NgbCumstonDateParserFormatter } from './../providers/dateStruct/dateParseFormatter';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class ModificacionModel {
  _id: string;
  fecha: any;
  descripcion: string;
  dateFormat?= new NgbCumstonDateParserFormatter();
  constructor(options: {
    _id?: string,
    fecha?: any,
    descripcion?: string,
  } = {}) {
    const item = Object.assign(this, options);
  }

  get _fecha(): NgbDateStruct {
    if (!this.fecha) {
      return null;
    }

    const fecha = new Date(this.fecha);
    return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  }

  set _fecha(fecha: NgbDateStruct) {
    this.fecha = new Date(fecha.year, fecha.month - 1, fecha.day).toISOString();
  }

}
