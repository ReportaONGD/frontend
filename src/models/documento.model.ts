
export class DocumentoModel {
  _id: string;
  nombre: string;
  ruta:  string;
  fecha: any;
  es_gasto: boolean;
  constructor(options: {
    _id?: string,
    nombre?: string,
    ruta?:	string,
    fecha?: any
    es_gasto?: boolean;
  } = {}) {
    this._id = options._id || null;
    this.nombre = options.nombre || null;
    this.ruta = options.ruta || null;
    this.fecha = options.fecha || null;
    this.es_gasto = options.es_gasto;
  }
}
