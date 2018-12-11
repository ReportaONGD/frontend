
export class EstadoInformeModel {
  _id: string;
  nombre: string;
  estado_siguiente: EstadoInformeModel;
  final: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    estado_siguiente?: EstadoInformeModel,
    final?: boolean,
  } = {}) {
    this._id = options._id || '';
    this.nombre = options.nombre || '';
    this.estado_siguiente = options.estado_siguiente || null;
    this.final = options.final || false;
  }
}
