import { CofinanciadorModel } from './cofinanciador.model';

export class AportacionModel {
  _id: string;
  cofinanciador: CofinanciadorModel;
  cuantia: number;
  constructor(options: {
    _id?: string;
    cofinanciador?: CofinanciadorModel;
    cuantia?: number
  } = {}) {
    this._id = options._id || null;
    this.cofinanciador = options.cofinanciador || null;
    this.cuantia = options.cuantia || null;
  }
}
