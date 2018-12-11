
export class RecursoModel {
  _id: string;
  descripcion: string;
  coste: number;
  constructor(options: {
    _id?: string,
    descripcion?: string,
    coste?: number
  } = {}) {
    this._id = options._id || null;
    this.descripcion = options.descripcion || null;
    this.coste = options.coste || null;
  }
}
