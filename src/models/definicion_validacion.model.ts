import { ReglaValidacionModel } from './regla_validacion.model';

export class DefinicionValidacionModel {
  _id: string;
  nombre: string;
  model: string;
  reglas?: ReglaValidacionModel[];
  constructor(options: {
    _id?: string,
    nombre?: string,
    model?: string,
    reglas?: ReglaValidacionModel[]
  } = {}) {
    Object.assign(this, options);
  }
}
