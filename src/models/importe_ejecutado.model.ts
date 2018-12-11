import {EstadoInformeModel} from './estado_informe.model';
import {ProyectoModel} from './proyecto.model';
import {ImporteModel} from './importe.model';

export class ImporteEjecutadoModel {
  _id: string;
  importe: ImporteModel;
  estados_informe: EstadoInformeModel;
  proyecto: ProyectoModel;
  constructor(options: {
    _id?: string,
    importe?: ImporteModel,
    estados_informe?: EstadoInformeModel,
    proyecto?: ProyectoModel
  } = {}) {
    this._id = options._id || null;
    this.importe = options.importe || null;
    this.estados_informe = options.estados_informe || null;
    this.proyecto = options.proyecto || null;
  }
}
