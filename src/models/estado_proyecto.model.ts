
export class EstadoProyectoModel {
  _id: string;
  nombre: string;
  estado_anterior: EstadoProyectoModel;
  final: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    estado_anterior?: EstadoProyectoModel,
    final?: boolean,
  } = {}) {
    this._id = options._id || '';
    this.nombre = options.nombre || '';
    this.estado_anterior = options.estado_anterior || null;
    this.final = options.final || false;
  }
}
