
export class EntidadModel {
  _id: string;
  nombre: string;
  constructor(options: {
    _id?: string,
    nombre?: string,
  } = {}) {
    this._id = options._id || null;
    this.nombre = options.nombre || null;
  }
}

