
export class EmpresaModel {
  _id: string;
  nombre: string;
  cif: string;
  direccion_fiscal: string;
  tfno: string;

  constructor(options: {
    _id?: any,
    nombre?: string,
    cif?: string,
    direccion_fiscal?: string,
    tfno?: string
  } = {}) {
    this._id = options._id || null;
    this.nombre = options.nombre || '';
    this.cif = options.cif || '';
    this.direccion_fiscal = options.direccion_fiscal || '';
    this.tfno = options.tfno || '';
  }
}
