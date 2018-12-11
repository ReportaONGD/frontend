import {Injectable} from '@angular/core';
import {ExcelConfig} from '../../models/excel_config/excel.config';
import {ProyectoModel} from '../../models/proyecto.model';
import {DatosGeneralesProvider} from './datos_generales.provider';
import {ObjetivoModel} from '../../models/objetivo.model';
import {IndicadorModel} from '../../models/indicador.model';

@Injectable()
export class ImportExcelProvider {
  project = new ProyectoModel();
  config: ExcelConfig = new ExcelConfig();
  datosGenerales: DatosGeneralesProvider = new DatosGeneralesProvider();
  // @Output() loggedIn = new BehaviorSubject<boolean>(false); // {1}
  constructor () {
  }
  /**
  * Genera los datos generales del proyecto
  * @param sheet - hoja excel a tratar
  **/
  GenerateDatosGenerales (sheet: any): ProyectoModel {
    this.datosGenerales.ConfigDescription(sheet, this.config);
    Object.keys(this.config.DESCRIPCION).forEach((key) => {
      if (this.config.DESCRIPCION[key].indexOf('-') === -1) {
        if (sheet.hasOwnProperty(this.config.DESCRIPCION[key])) {
          if (key === 'auditoria') {
              this.project[key] = sheet[this.config.DESCRIPCION[key]].w.toLowerCase() === 'no' ? false : true;
          } else if (key === 'entidad') {
            this.datosGenerales.LoadEntidades(sheet, this.project, this.config);
          } else {
            this.project[key] = sheet[this.config.DESCRIPCION[key]].w;
          }
        }
      } else {
        if (key === 'aportacion') {
          this.datosGenerales.LoadAportaciones(sheet, this.project, this.config);
        } else if (key === 'modificacion') {
          this.datosGenerales.LoadModificaciones(sheet, this.project, this.config);
        }
      }
    });
    // TODO: NO SE VA A DEVOLVER SINO A ALMACENAR EN LOCAL STORAGE PARA LUEGO VOLCARLO
    return this.project;
  }
  GenerateMatrizPlanificacon(sheet: any) {
    Object.keys(this.config.MATRIZ_PLANIFICACION).forEach((key) => {
      if (key === 'OBJETIVO_GENERAL') {
        if (!this.project.objetivo) {
          this.project.objetivo = new ObjetivoModel();
          this.project.objetivo.general = true;
        }
        Object.keys(this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL).forEach((k) => {
          if (k !== 'Indicador') {
            if (sheet.hasOwnProperty(this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL[k])) {
              const w = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL[k]].w;
              this.project.objetivo[k] = w;
            }
          } else {
              if (sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.Codigo]) {
                if (!this.project.objetivo.indicadores) {
                  this.project.objetivo.indicadores = new Array<IndicadorModel>();
                }
                const indicador = new IndicadorModel();
                indicador.codigo = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.Codigo].w;
                indicador.descripcion = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.Descripcion].w;
                indicador.linea_base = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.LineaBase].w;
                indicador.meta = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.Meta].w;
                indicador.comentario = sheet[this.config.MATRIZ_PLANIFICACION.OBJETIVO_GENERAL.Indicador.Meta].w;
                this.project.objetivo.indicadores.push(indicador);
                }
            }
        });
      } else if (key === 'ACTIVIDAD_GLOBAL') {

        }
    });
    // TODO: NO SE VA A DEVOLVER SINO A ALMACENAR EN LOCAL STORAGE PARA LUEGO VOLCARLO
    return this.project;
  }
}

