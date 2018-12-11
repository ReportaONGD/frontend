export class ExcelConfig {
  DESCRIPCION: any;
  MATRIZ_PLANIFICACION: any;

  constructor() {
    this.DESCRIPCION = {
    codigo: 'C4',
    titulo: 'B10',
    ong_agrupacion: 'B11',
    pais: 'B12',
    provincia_municipio: 'B13',
    socio_local: 'B14',
    entidad:  'B15',
    coste_total: 'B16',
    aportacion_financiador: 'B17',
    aportacion_ong: 'B18',
    aportacion: 'B20-C30',
    fecha_inicio:  '',
    duracion: '',
    fecha_fin:  '',
    auditoria:  '',
    modificaciones: 'B35',
    subvencion_ejecutada: 'B41'
    };
    this.MATRIZ_PLANIFICACION = {
      OBJETIVO_GENERAL: {
        codigo: '',
        descripcion: 'B13',
        indicador: {
          codigo: 'D13',
          descripcion: 'D13',
          linea_base: 'F13',
          meta:  'G13',
          comentarios:  'K13',
          comentarios_ong: '',
          comentarios_aecid: '',
          fuente_verificacion: 'L13'
        }
      },
      OBJETIVOS_ESPECIFICOS: {},
      ACTIVIDAD_GLOBAL: {
        codigo: '',
        descripcion: '',
        recursos: {
          descripcion:  '',
          coste:  0
        },
        comentarios: '',
      }
    };
  }
}
