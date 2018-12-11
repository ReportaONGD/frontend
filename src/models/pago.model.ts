import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CuentaBancariaModel } from './cuenta_bancaria.model';
import { TipoMovimientoModel } from './tipo_movimiento.model';

export class PagoModel {
  _id: string;
  concepto: string;
  num_cheque: string;
  fecha: string;
  importe: Number;
  importe_enviado: Number;
  tipo_movimiento: TipoMovimientoModel;
  cuenta_origen: CuentaBancariaModel;
  cuenta_destino: CuentaBancariaModel;

  constructor(options: {
    _id?: string,
    concepto?: string,
    num_cheque?: string,
    fecha?: string,
    importe?: Number,
    importe_enviado?: Number,
    tipo_movimiento?: TipoMovimientoModel,
    cuenta_origen?: CuentaBancariaModel,
    cuenta_destino?: CuentaBancariaModel,
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
