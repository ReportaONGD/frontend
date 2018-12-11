export class ParamsModel {
  proyecto_id?: string;
  objetivo_id?: string;
  objetivo_especifico_id?: string;
  indicador_id?: string;
  resultado_id?: string;
  actividad_id?: string;
  actividad_global_id?: string;
  usuario_id?: string;
  fuente_verificacion_id?: string;
  cuenta_bancaria_id?: string;
  gasto_id?: string;
  informe_id?: string;
  constructor(options: {
    proyecto_id?: string,
    objetivo_id?: string,
    objetivo_especifico_id?: string,
    indicador_id?: string,
    resultado_id?: string,
    actividad_id?: string,
    actividad_global_id?: string,
    usuario_id?: string,
    fuente_verificacion_id?: string,
    cuenta_bancaria_id?: string,
    gasto_id?: string,
    informe_id?: string
  } = {}) {
    Object.assign(this, options);
    // this.proyecto_id = options.proyecto_id;
    // this.objetivo_id = options.objetivo_id;
    // this.objetivo_especifico_id = options.objetivo_especifico_id;
    // this.indicador_id = options.proyecto_id;
    // this.indicador_id = options.indicador_id;
    // this.resultado_id = options.resultado_id;
    // this.actividad_id = options.actividad_id;
    // this.actividad_global_id = options.actividad_global_id;
    // this.usuario_id = options.usuario_id;
    // this.fuente_verificacion_id = options.fuente_verificacion_id;
  }
}
