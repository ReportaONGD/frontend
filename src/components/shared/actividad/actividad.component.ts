import { Component, Input, OnInit } from '@angular/core';
import { ActividadModel } from '../../../models/actividad.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { ParamsModel } from '../../../models/params.model';

@Component({
  selector: 'app-actividad-combo-component',
  templateUrl: './actividad.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ActividadComboComponent implements OnInit {
  @Input() item: any;
  @Input() isRequired: boolean;
  @Input() ids: ParamsModel;
  actividades: ActividadModel[] = Array<ActividadModel>();

  constructor(private service: ProyectoService,
    private common: Common) {
  }

  ngOnInit() {
    this.service.ids = this.ids;
    this.loadActividades();
  }

  loadActividades() {
    this.service.get(this.ids.proyecto_id).subscribe(resp => {
        resp.objetivos_especificos.forEach((objetivo) => {
            objetivo.resultados.forEach((resultado) => {
                resultado.actividades.forEach((actividad) => {
                    this.actividades.push(actividad);
                });
            });
        });
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: ActividadModel, c2: ActividadModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
