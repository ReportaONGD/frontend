import { DefinicionValidacionModel } from './definicion_validacion.model';

export class EtapaValidacionModel {
  _id: string;
  nombre: string;
  definiciones?: DefinicionValidacionModel[];
  constructor(options: {
    _id?: string,
    nombre?: string,
    definiciones?: DefinicionValidacionModel[]
  } = {}) {
    Object.assign(this, options);
  }
}
