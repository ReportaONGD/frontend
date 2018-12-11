import { AgenteModel } from './agente.model';
import { ActividadModel } from './actividad.model';
import { EtapaModel } from './etapa.model';
import { FinanciadorModel } from './financiador.model';
import { ImplementadorModel } from './implementador.model';
import { MonedaModel } from './moneda.model';
import { PaisModel } from './pais.model';
import { PartidaModel } from './partida.model';
export class PresupuestoModel {
  _id: string;
  concepto: string;
  observaciones: string;
  importe: number;
  etapa?: EtapaModel;
  pais?: PaisModel;
  actividad?: ActividadModel;
  financiador?: AgenteModel;
  implementador?: AgenteModel;
  moneda?: MonedaModel;
  partida?: PartidaModel;
  constructor(options: {
    _id?: string,
    importe?: number,
    etapa?: EtapaModel,
    pais?: PaisModel,
    actividad?: ActividadModel,
    financiador?: AgenteModel,
    implementador?: AgenteModel,
    moneda?: MonedaModel,
    partida?: PartidaModel
  } = {}) {
    Object.assign(this, options);
  }
}
