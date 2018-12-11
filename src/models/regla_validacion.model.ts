import { ResultadoValidacionModel } from './resultado_validacion.model';

export class ReglaValidacionModel {
  _id: string;
  mensaje: string;
  route_link: string;
  resultados?: ResultadoValidacionModel;
  constructor(options: {
    _id?: string,
    mensaje?: string,
    route_link?: string,
    resultados?: ResultadoValidacionModel
  } = {}) {
    Object.assign(this, options);
  }
}
