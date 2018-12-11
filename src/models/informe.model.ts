import { PeriodoModel } from './periodo.model';

export class InformeModel {
  _id: string;
  nombre: string;
  autor: string;
  periodo: PeriodoModel;
  final: boolean;
  modificaciones_sustanciales: [string];
  modificaciones_accidentales: [string];
  actividades_previstas: [string];
  nuevas_actividades_npi: [string];
  valoracion_general: string;
  grado_de_alineamiento: string;
  puntos_fuertes_debiles: string;
  observaciones: string;
  modificacion_proyecto_inicial: string;
  pertinencia: string;
  coherencia: string;
  eficacia_impacto: string;
  eficiencia: string;
  viabilidad_sostenibilidad: string;
  amortizacion: string;
  cobertura: string;
  otros_criterios: string;
  finalizacion_transferencia: string;
  receptividad_sociolocal: string;
  visibilidad_complementariedad: string;

  constructor(options: {
    _id?: string,
    nombre?: string,
    autor?: string,
    periodo?: PeriodoModel,
    final?: boolean;
    modificaciones_sustanciales?: [string];
    modificaciones_accidentales?: [string];
    actividades_previstas?: [string];
    nuevas_actividades_npi?: [string];
    valoracion_general?: string;
    grado_de_alineamiento?: string;
    puntos_fuertes_debiles?: string;
    observaciones?: string;
    modificacion_proyecto_inicial?: string;
    pertinencia?: string;
    coherencia?: string;
    eficacia_impacto?: string;
    eficiencia?: string;
    viabilidad_sostenibilidad?: string;
    amortizacion?: string;
    cobertura?: string;
    otros_criterios?: string;
    finalizacion_transferencia?: string;
    receptividad_sociolocal?: string;
    visibilidad_complementariedad?: string;
  } = {}) {
    if (options.periodo) {
      this.periodo = options.periodo;
      this.periodo.fecha_inicio = new Date(options.periodo.fecha_inicio);
      this.periodo.fecha_fin = new Date(options.periodo.fecha_fin);
    }
    const item = Object.assign(this, options);
  }
}
