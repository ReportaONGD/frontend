import { TipoMovimientoModel } from '../tipo_movimiento.model';

export class ResumenCajaModel {
  ncuenta: string;
  tipo: TipoMovimientoModel[];
  concepto: string[];
  importe: number[];
  constructor(options: {
    ncuenta?: string;
    tipo?: TipoMovimientoModel[];
    concepto?: string[];
    importe?: number[];
  } = {}) {
    this.tipo = options.tipo || new Array<TipoMovimientoModel>();
    this.concepto = options.concepto || new Array<string>();
    this.importe = options.importe || new Array<number>();
  }
}
