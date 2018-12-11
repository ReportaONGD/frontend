
export class HipotesisModel {
  _id: string;
  descripcion: string;
  constructor(options: {
    _id?: string,
    descripcion?: string,
  } = {}) {
    this._id = options._id || null;
    this.descripcion = options.descripcion || null;
  }
}
