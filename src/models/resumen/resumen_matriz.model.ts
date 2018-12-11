
export class ResumenObjetivoEspecificoModel {
  objetivo_especifico: string;
  indicador: string[];
  fuente_verificacion: string[];
  hipotesis: string[];
  constructor(options: {
    objetivo_especifico?: string,
    indicador?: string[],
    fuente_verificacion?: string[],
    hipotesis?: string[]
  } = {}) {
    this.indicador = options.indicador || new Array<string>();
    this.fuente_verificacion = options.fuente_verificacion || new Array<string>();
    this.hipotesis = options.hipotesis || new Array<string>();
  }
}
export class ResumenResultadoModel {
  resultado: string;
  indicador: string[];
  fuente_verificacion: string[];
  hipotesis: string[];
  constructor(options: {
    resultado?: string,
    indicador?: string[],
    fuente_verificacion?: string[],
    hipotesis?: string[]
  } = {}) {
    this.indicador = options.indicador || new Array<string>();
    this.fuente_verificacion = options.fuente_verificacion || new Array<string>();
    this.hipotesis = options.hipotesis || new Array<string>();
  }
}
export class ResumenActividadModel {
  actividad: string;
  recurso: string[];
  coste: number[];
  constructor(options: {
    actividad?: string,
    recurso?: string[],
    coste?: number[]
  } = {}) {
    this.recurso = options.recurso || new Array<string>();
    this.coste = options.coste || new Array<number>();
  }
}
