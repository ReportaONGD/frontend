import { PagoModel } from './pago.model';
import { AgenteModel } from './agente.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActividadModel } from './actividad.model';
import { DocumentoModel } from './documento.model';
import { FinanciadorModel } from './financiador.model';
import { MonedaModel } from './moneda.model';
import { PartidaModel } from './partida.model';

export class GastoModel {
  _id: string;
  fecha: any;
  numero_orden: string;
  emisor: string;
  concepto: string;
  importe_local: number;
  tipo_de_cambio_dm: number;
  tipo_de_cambio_ld: number;
  moneda: MonedaModel;
  partida: PartidaModel;
  actividad: ActividadModel;
  financiador: AgenteModel;
  documentos: [DocumentoModel];
  pagos: [PagoModel];

  constructor(options: {
    _id?: string,
    fecha?: any,
    numero_orden?: string,
    emisor?: string,
    concepto?: string,
    importe_local?: number,
    tipo_de_cambio_dm?: number,
    tipo_de_cambio_ld?: number,
    moneda?: MonedaModel,
    partida?: PartidaModel,
    financiador?: AgenteModel,
    actividad?: ActividadModel,
    documentos?: [DocumentoModel]
    pagos?: [PagoModel]
  } = {}) {
    const item = Object.assign(this, options);
  }

  get _fecha(): NgbDateStruct {
    if (!this.fecha) {
      return null;
    }

    const fecha = new Date(this.fecha);
    return { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() };
  }

  set _fecha(fecha: NgbDateStruct) {
    this.fecha = new Date(fecha.year, fecha.month - 1, fecha.day).toISOString();
  }
}
