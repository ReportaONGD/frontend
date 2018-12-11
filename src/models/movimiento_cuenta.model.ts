import {TipoMovimientoModel} from './tipo_movimiento.model';
import {CuentaBancariaModel} from './cuenta_bancaria.model';

export class MovimientoCuentaModel {
  _id: string;
  Fecha: Date;
  TipoMovimiento: TipoMovimientoModel;
  CuentaBancaria: CuentaBancariaModel;
  constructor(options: {
    _id?: string,
    Fecha?: Date,
    TipoMovimiento?: TipoMovimientoModel,
    CuentaBancaria?: CuentaBancariaModel
  } = {}) {
    this._id = options._id || null;
    this.Fecha = options.Fecha || null;
    this.TipoMovimiento = options.TipoMovimiento || null;
    this.CuentaBancaria = options.CuentaBancaria || null;
  }
}
