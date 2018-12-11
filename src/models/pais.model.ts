
export class PaisModel {
  _id: string;
  valor: string;
  constructor(options: {
    _id?: string,
    valor?: string
  } = {}) {
    this._id = options._id || '';
    this.valor = options.valor || '';
  }
}
