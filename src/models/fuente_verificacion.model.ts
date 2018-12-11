import { DocumentoModel } from './documento.model';

export class FuenteVerificacionModel {
  _id: string;
  codigo: string;
  descripcion: string;
  documentos: [DocumentoModel];

  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string,
    documentos?: [DocumentoModel]
  } = {}) {
    const item = Object.assign(this, options);
  }
}

