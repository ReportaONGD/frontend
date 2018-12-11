import {ProyectoModel} from '../../models/proyecto.model';
import {ExcelConfig} from '../../models/excel_config/excel.config';
import {ActividadGlobal} from '../../enums/actividad_global.enum';
import {RecursoModel} from '../../models/recurso.model';
import {ActividadModel} from '../../models/actividad.model';

export class MatrizPlanificacionProvider {
  cellRecursoDescription = 'D';
  cellRecursoCostes = 'E';
  cellActividadComentarios = 'K';
  LoadActividadGlobal(sheet: any, project: ProyectoModel, config: ExcelConfig) {
    Object.keys(sheet).forEach((key) => {
      if (sheet[key] && typeof(sheet[key].w) === 'string' && sheet[key].w.indexOf(ActividadGlobal.Title) > -1) {
        const row = key.substr(1, key.length - 1);
        this.cellRecursoDescription += row;
        this.cellRecursoCostes += row;
        this.cellActividadComentarios += row;
        if (!project.actividad_global) {
          project.actividad_global = new ActividadModel();
        }
        project.actividad_global.global = true;
        // if (sheet[this.cellRecursoDescription] || sheet[this.cellRecursoCostes]) {
        //   if (!project.actividad_global.recurso) {
        //     project.actividad_global.recurso = new Array<RecursoModel>();
        //   }
        //   const r = new RecursoModel();
        //   r.descripcion = sheet[this.cellRecursoDescription] ? sheet[this.cellRecursoDescription].w : '';
        //   r.coste = sheet[this.cellRecursoCostes] ? sheet[this.cellRecursoCostes].w : '';
        //   project.actividad_global.recurso.push(r);
        // }
        project.actividad_global.comentario = sheet[this.cellActividadComentarios] ? sheet[this.cellActividadComentarios].w : '';
      }
    });
  }
}
