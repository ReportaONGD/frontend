
export class ResumenGastosModel {
  partida: string;
  presupuesto: number;
  gasto: number;
  pendiente: number;
  ejecutado: string;
  constructor(options: {
    partida?: string,
    presupuesto?: number,
    gasto?: number,
    pendiente?: number,
    ejecutado?: string,
  } = {}) {
    this.presupuesto = options.presupuesto || 0;
    this.gasto = options.gasto || 0;
    this.pendiente = options.pendiente || 0;
    this.ejecutado = options.ejecutado || '-';
  }
}
