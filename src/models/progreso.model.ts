
export class ProgresoModel {
  _id: string;
  fecha: Date;
  porcentaje: number;
  constructor(options: {
    _id?: string,
    fecha?: Date,
    porcentaje?: number,
  } = {}) {
    this._id = options._id || null;
    this.fecha = options.fecha || null;
    this.porcentaje = options.porcentaje || null;
  }
}
