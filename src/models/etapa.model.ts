import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
import { EmpresaModel } from './empresa.model';

export class EtapaModel {
  _id: string;
  nombre: string;
  descripcion: string;
  fecha_inicio: any;
  fecha_fin: any;
  empresa: EmpresaModel;
  dateFormat?= new NgbCumstonDateParserFormatter();

  constructor(options: {
    _id?: string,
    nombre?: string,
    descripcion?: string,
    fecha_inicio?: string,
    fecha_fin?: string,
    empresa?: EmpresaModel
  } = {}) {
    const item = Object.assign(this, options);
  }

  get _fecha_inicio(): NgbDateStruct {
    if (!this.fecha_inicio) {
      return null;
    }

    const fecha = new Date(this.fecha_inicio);
    return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  }

  set _fecha_inicio(fecha_inicio: NgbDateStruct) {
    this.fecha_inicio = new Date(fecha_inicio.year, fecha_inicio.month - 1, fecha_inicio.day).toISOString();
  }

  get _fecha_fin(): NgbDateStruct {
    if (!this.fecha_fin) {
      return null;
    }

    const fecha = new Date(this.fecha_fin);
    return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  }

  set _fecha_fin(fecha_fin: NgbDateStruct) {
    this.fecha_fin = new Date(fecha_fin.year, fecha_fin.month - 1, fecha_fin.day).toISOString();
  }
}
