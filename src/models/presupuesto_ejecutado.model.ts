import {PartidaModel} from './partida.model';
import {EstadoInformeModel} from './estado_informe.model';
import {ProyectoModel} from './proyecto.model';

export class PresupuestoEjecutadoModel {
  _id: string;
  Partida: PartidaModel;
  EstadosInforme: EstadoInformeModel;
  Project: ProyectoModel;
  constructor(options: {
    _id?: string,
    Partida?: PartidaModel,
    EstadosInforme?: EstadoInformeModel,
    Project?: ProyectoModel
  } = {}) {
    this._id = options._id || null;
    this.Partida = options.Partida || null;
    this.EstadosInforme = options.EstadosInforme || null;
    this.Project = options.Project || null;
  }
}
