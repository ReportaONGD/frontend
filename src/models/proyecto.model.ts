import { AgenteModel } from './agente.model';
import { ActividadModel } from './actividad.model';
import { AportacionModel } from './aportacion.model';
import { BienModel } from './bien.model';
import { CuentaBancariaModel } from './cuenta_bancaria.model';
import { EmpresaModel } from './empresa.model';
import { EntidadModel } from './entidad.model';
import { EstadoProyectoModel } from './estado_proyecto.model';
import { EtapaModel } from './etapa.model';
import { FinanciadorModel } from './financiador.model';
import { GastoModel } from './gasto.model';
import { ImplementadorModel } from './implementador.model';
import { ImporteModel } from './importe.model';
import { ImporteEjecutadoModel } from './importe_ejecutado.model';
import { ModificacionModel } from './modificacion.model';
import { ObjetivoModel } from './objetivo.model';
import { PaisModel } from './pais.model';
import { PartidaModel } from './partida.model';
import { PersonaModel } from './persona.model';
import { PresupuestoModel } from './presupuesto.model';
import { PresupuestoEjecutadoModel } from './presupuesto_ejecutado.model';
export class ProyectoModel {
  _id: string;
  nombre: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: any;
  fecha_fin: any;
  // duracion: number;
  gestor: AgenteModel;
  pais: PaisModel[];
  financiador: AgenteModel[];
  implementador: AgenteModel[];
  ong_agrupacion: string;
  provincia_municipio: string;
  socio_local: string;
  coste_total?: number;
  aportacion_financiador: number;
  aportacion_ong: number;
  auditoria?: boolean;
  firma?: string;
  objetivo?: ObjetivoModel;
  partida?: PartidaModel[];
  objetivos_especificos?: ObjetivoModel[];
  importe?: ImporteModel;
  actividad_global?: ActividadModel;
  aportaciones?: AportacionModel[];
  modificaciones?: ModificacionModel[];
  personal?: PersonaModel[];
  gastos?: GastoModel[];
  bienes?: BienModel[];
  presupuesto_ejecutado?: PresupuestoEjecutadoModel[];
  importe_ejecutado?: ImporteEjecutadoModel[];
  cuentas_bancarias?: CuentaBancariaModel[];
  entidades?: EntidadModel[];
  empresa?: EmpresaModel;
  etapas?: EtapaModel[];
  estado_proyecto?: EstadoProyectoModel;
  presupuestos?: PresupuestoModel[];
  readonly: boolean;
  proyecto_padre: string;

  constructor(options: {
    _id?: string,
    nombre?: string,
    codigo?: string,
    titulo?: string,
    descripcion?: string,
    // fecha_inicio?: string,
    // fecha_fin?: string,
    // duracion?: number,
    gestor?: string,
    pais?: PaisModel[],
    ong_agrupacion?: string,
    provincia_municipio?: string,
    socio_local?: string,
    coste_total?: number,
    // aportacion_financiador?: number,
    aportacion_ong?: number,
    auditoria?: boolean,
    firma?: string,
    partida?: PartidaModel[],
    objetivo?: ObjetivoModel,
    objetivos_especificos?: ObjetivoModel[],
    importe?: ImporteModel,
    actividad_global?: ActividadModel,
    aportaciones?: AportacionModel[],
    modificaciones?: ModificacionModel[],
    personal?: PersonaModel[],
    gastos?: GastoModel[],
    bienes?: BienModel[],
    presupuesto_ejecutado?: PresupuestoEjecutadoModel[],
    importe_ejecutado?: ImporteEjecutadoModel[],
    cuentas_bancarias?: CuentaBancariaModel[],
    entidades?: EntidadModel[],
    empresa?: EmpresaModel,
    estado_proyecto?: EstadoProyectoModel,
    etapas?: EtapaModel[],
    presupuestos?: PresupuestoModel[],
    financiador?: AgenteModel[]
    implementador?: AgenteModel[],
    readonly?: boolean,
    proyecto_padre?: string
  } = {}) {
    Object.assign(this, options);
    if (this.readonly === null || this.readonly === undefined) {
      this.readonly = false;
    }
  }
  validateProjectState() {
    if (!this.readonly) {
      if (this.estado_proyecto) {
        if (!this.estado_proyecto.final) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  // get _fecha_inicio(): NgbDateStruct {
  //   if (!this.fecha_inicio) {
  //     return null;
  //   }

  //   const fecha = new Date(this.fecha_inicio);
  //   return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  // }

  // set _fecha_inicio(fecha_inicio: NgbDateStruct) {
  //   this.fecha_inicio = new Date(fecha_inicio.year, fecha_inicio.month - 1, fecha_inicio.day).toISOString();
  // }

  // get _fecha_fin(): NgbDateStruct {
  //   if (!this.fecha_fin) {
  //     return null;
  //   }

  //   const fecha = new Date(this.fecha_fin);
  //   return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  // }

  // set _fecha_fin(fecha_fin: NgbDateStruct) {
  //   this.fecha_fin = new Date(fecha_fin.year, fecha_fin.month - 1, fecha_fin.day).toISOString();
  // }

  // get duracion() {
  //   if (!this.fecha_inicio || !this.fecha_fin) {
  //     return 0;
  //   }

  //   const oneDay = 1000 * 60 * 60 * 24;
  //   const fi = new Date(this.fecha_inicio);
  //   const ff = new Date(this.fecha_fin);
  //   const dateDiff = ff.getTime() - fi.getTime();

  //   return Math.round(dateDiff / oneDay);
  // }

  // // se implementa para que no falle la asignacion automatica
  // set duracion(duracion) {
  // }

}
