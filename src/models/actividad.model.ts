import {ProgresoModel} from './progreso.model';
import {RecursoModel} from './recurso.model';
import {PlanificacionActividadModel} from './planificacion_actividad.model';
import {EjecucionActividadModel} from './ejecucion_actividad.model';
import { EtapaModel } from './etapa.model';
export class ActividadModel {
  _id: string;
  codigo: string;
  descripcion: string;
  // recurso?: Array<RecursoModel>;
  comentario?:  string;
  comentarios_ong?: string;
  comentarios_aecid?: string;
  comentarios_costes_personal?: string;
  progreso?: ProgresoModel;
  global: boolean;
  planificacion_actividad?: PlanificacionActividadModel;
  ejecucion_actividad?: EjecucionActividadModel;
  etapa?: EtapaModel;
  constructor(options: {
    _id?: string,
    codigo?: string,
    descripcion?: string,
    // recurso?: Array<RecursoModel>,
    comentario?:  string,
    comentarios_ong?: string;
    comentarios_aecid?: string;
    comentarios_costes_personal?: string,
    progreso?: ProgresoModel,
    global?: boolean,
    planificacion_actividad?: PlanificacionActividadModel,
    ejecucion_actividad?: EjecucionActividadModel,
    etapa?: EtapaModel
  } = {}) {
    this._id = options._id || null;
    this.codigo = options.codigo || null;
    this.descripcion = options.descripcion || null;
    // this.recurso = options.recurso || null;
    this.comentario = options.comentario || null;
    this.comentarios_ong = options.comentarios_ong || null;
    this.comentarios_aecid = options.comentarios_aecid || null;
    this.comentarios_costes_personal = options.comentarios_costes_personal || null;
    this.global = options.global || false;
    this.progreso = options.progreso || null;
    this.planificacion_actividad = new PlanificacionActividadModel(options.planificacion_actividad) || null;
    this.ejecucion_actividad = new EjecucionActividadModel(options.ejecucion_actividad) || null;
    this.etapa = options.etapa || new EtapaModel();
  }
}
