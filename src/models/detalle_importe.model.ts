 export class DetalleImporteModel {
  _id: string;
  ongd: number;
  local: boolean;
  exterior: boolean;
  constructor(options: {
    _id?: string,
    ongd?: number,
    local?: boolean,
    exterior?: boolean
  } = {}) {
    this._id = options._id || null;
    this.local = options.local || null;
    this.exterior = options.exterior || null;
    this.ongd = options.ongd || null;
  }
}
