export class MonedaModel {
  _id: string;
  codigo: string;
  descripcion: string;
  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string
  } = {}) {
    this._id = options._id || '';
    this.codigo = options.codigo || '';
    this.descripcion = options.descripcion || '';
  }
}
