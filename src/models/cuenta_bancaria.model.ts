import {PaisModel} from './pais.model';
import {MonedaModel} from './moneda.model';
import {LocalizacionModel} from './localizacion.model';
import {OperacionBancariaModel} from './operacion_bancaria.model';

export class CuentaBancariaModel {
  _id: string;
  pais: PaisModel;
  entidad: string;
  ncuenta: string;
  moneda: MonedaModel;
  localizacion: LocalizacionModel;
  operaciones_bancarias: Array<OperacionBancariaModel>;
  constructor(options: {
    _id?: string,
    pais?: PaisModel,
    entidad?: string,
    ncuenta?: string,
    moneda?: MonedaModel,
    localizacion?: LocalizacionModel,
    operaciones_bancarias?: Array<OperacionBancariaModel>
  } =  {}) {
    this._id = options._id || null;
    this.pais = options.pais || null;
    this.entidad = options.entidad || null;
    this.ncuenta = options.ncuenta || null;
    this.moneda = options.moneda || null;
    this.localizacion = options.localizacion || null;
    this.operaciones_bancarias = options.operaciones_bancarias || null;
  }
}
