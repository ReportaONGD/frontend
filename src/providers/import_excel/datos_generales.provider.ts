
import {EntidadModel} from '../../models/entidad.model';
import {AportacionModel} from '../../models/aportacion.model';
import {ProyectoModel} from '../../models/proyecto.model';
import {ModificacionModel} from '../../models/modificacion.model';
import {TitleDescription} from '../../enums/title_description.enum';
import {ExcelConfig} from '../../models/excel_config/excel.config';
import { CofinanciadorModel } from '../../models/cofinanciador.model';

export class DatosGeneralesProvider {
  constructor() {}
  ConfigDescription(sheet: any, config: ExcelConfig): void {
    Object.keys(sheet).filter((key) => {
      if (sheet[key] && typeof(sheet[key].w) === 'string' && sheet[key].w.indexOf(TitleDescription.FechaInicio) > -1) {
        const endColum = key.substr(1, key.length - 1).toString();
        config.DESCRIPCION.Aportacion += '-' + 'B' + (parseInt(endColum, 0) - 1).toString();
        config.DESCRIPCION.FechaInicio = 'B' + key.substr(1, key.length - 1);
      }else if (sheet[key] && typeof(sheet[key].w) === 'string' && sheet[key].w.indexOf(TitleDescription.Duracion) > -1) {
        config.DESCRIPCION.Duracion = 'B' + key.substr(1, key.length - 1);
      } else if (sheet[key] && typeof(sheet[key].w) === 'string' && sheet[key].w.indexOf(TitleDescription.FechaFin) > -1) {
        config.DESCRIPCION.FechaFin = 'B' + key.substr(1, key.length - 1);
      } else if (sheet[key] && typeof(sheet[key].w) === 'string' && sheet[key].w.indexOf(TitleDescription.Auditoria) > -1) {
        config.DESCRIPCION.Auditoria = 'B' + key.substr(1, key.length - 1);
        config.DESCRIPCION.Modificacion = 'B' + (parseInt(config.DESCRIPCION.FechaFin
            .substr(1, config.DESCRIPCION.FechaFin.length - 1), 0) + 2).toString() + '-' + 'B' +
          (parseInt(config.DESCRIPCION.Auditoria
            .substr(1, config.DESCRIPCION.Auditoria.length - 1), 0) - 1).toString();
      }
    });
  }
  LoadAportaciones(sheet: any, project: ProyectoModel, config: ExcelConfig) {
    const startColumn = config.DESCRIPCION.Aportacion.split('-')[0];
    const endColumn = config.DESCRIPCION.Aportacion.split('-')[1];
    const startRow = parseInt(startColumn.substr(1, startColumn.length - 1), 0);
    const endRow = parseInt(endColumn.substr(1, endColumn.length - 1), 0);
    for (let i = startRow; i <= endRow; i++) {
      const aportacion = new AportacionModel();
      const positionEntidad = 'B' + i;
      const positionCuantia = 'C' + i;
      if (sheet[positionEntidad] && sheet[positionCuantia]) {
        aportacion.cofinanciador = new CofinanciadorModel();
        aportacion.cofinanciador.valor = sheet[positionEntidad].w;
        aportacion.cuantia = sheet[positionCuantia].w;
        if (!project.aportaciones) {
          project.aportaciones = new Array<AportacionModel>();
        }
        project.aportaciones.push(aportacion);
      }
    }
  }
  LoadEntidades(sheet: any, project: ProyectoModel, config: ExcelConfig) {
    if (sheet[config.DESCRIPCION.Entidad]) {
      const entidades = sheet[config.DESCRIPCION.Entidad].w.split(',');
      for (let i = 0; i < entidades.length; i++) {
        const entidad = new EntidadModel();
        entidad.nombre = entidades[i];
        if (!project.entidades) {
          project.entidades = new Array<EntidadModel>();
        }
        project.entidades.push(entidad);
      }
    }
  }
  LoadModificaciones(sheet: any, project: ProyectoModel, config: ExcelConfig) {
    const startColumn = config.DESCRIPCION.Modificacion.split('-')[0];
    const endColumn = config.DESCRIPCION.Modificacion.split('-')[1];
    const startRow = parseInt(startColumn.substr(1, startColumn.length - 1), 0);
    const endRow = parseInt(endColumn.substr(1, endColumn.length - 1), 0);
    for (let i = startRow; i <= endRow; i++) {
      const modificacion = new ModificacionModel();
      const position = 'B' + i;
      if (sheet[position]) {
        modificacion.descripcion = sheet[position].w.split(',')[0];
        modificacion.fecha = sheet[position].w.split(',')[1];
        if (!project.modificaciones) {
          project.modificaciones = new Array<ModificacionModel>();
        }
        project.modificaciones.push(modificacion);
      }
    }
  }
}
