import { AgenteModel } from './agente.model';
import { GastoModel } from './gasto.model';
import { CuentaBancariaModel } from './cuenta_bancaria.model';
import {FinanciadorModel} from './financiador.model';
import {TipoMovimientoModel} from './tipo_movimiento.model';
import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
const dateFormat = new NgbCumstonDateParserFormatter();
export class OperacionBancariaModel {
  _id: string;
  fecha: any;
  fecha_destino: any;
  importe?: number;
  importe_enviado: number;
  financiador: AgenteModel;
  tipo_movimiento: TipoMovimientoModel;
  concepto: string;
  cuenta_origen: CuentaBancariaModel;
  cuenta_destino: CuentaBancariaModel;
  gastos: GastoModel[];
  num_cheque: string;
  constructor(options: {
    _id?: string,
    fecha?: string,
    fecha_destino?: string,
    importe?: number,
    importe_enviado?: number,
    financiador?: AgenteModel,
    tipo_movimiento?: TipoMovimientoModel,
    concepto?: string,
    cuenta_origen?: CuentaBancariaModel,
    cuenta_destino?: CuentaBancariaModel,
    gastos?: GastoModel[],
    num_cheque?: string;
  } = {}) {
    this._id = options._id || null;
    this.fecha = this.setDateValue(options.fecha);
    this.fecha_destino = this.setDateValue(options.fecha_destino);
    this.importe = options.importe || null;
    this.importe_enviado = options.importe_enviado || null;
    this.financiador = options.financiador || null;
    this.gastos = options.gastos || [];
    this.cuenta_origen = options.cuenta_origen || null;
    this.cuenta_destino = options.cuenta_destino || null;
    this.tipo_movimiento = options.tipo_movimiento || null;
    this.concepto = options.concepto || null;
    this.num_cheque = options.num_cheque || null;
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
