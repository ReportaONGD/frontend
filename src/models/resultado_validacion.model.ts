export class ResultadoValidacionModel {
  _id: string;
  nombre: string;
  estado: string;
  color: string;
  constructor(options: {
    _id?: string,
    nombre?: string,
    estado?: string,
    color?: string
  } = {}) {
    Object.assign(this, options);
  }
}
