import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActividadModel } from '../../../models/actividad.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { DateDiffValidator } from '../../../validators/date_diff.validator';
import { ParamsModel } from '../../../models/params.model';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ProyectoModel } from '../../../models/proyecto.model';


@Component({
  selector: 'app-cronograma-detail-component',
  templateUrl: './cronograma_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ResultadoActividadService, ProyectoService, Common]
})
export class CronogramaDetailComponent implements OnInit {
  frmActividad: FormGroup;
  title: string;
  actividad: BehaviorSubject<ActividadModel>;
  ids: ParamsModel = new ParamsModel();
  maxDate: any;
  minDate: any;
  isEjecucion = false;
  constructor(private resultadoActividadService: ResultadoActividadService,
    private projectService: ProyectoService,
    private activeModal: NgbActiveModal,
    private common: Common,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.projectService.ids = this.ids;
    this.resultadoActividadService.ids = this.ids;
    this.initialize();
    this.frmActividad = this.formBuilder.group({
      planificacion_actividad: this.formBuilder.group({
        fecha_inicio: [null, Validators.compose([Validators.required,
        DateDiffValidator.dateLessThan('planificacion_actividad', 'fecha_inicio', 'fecha_fin', { 'datediff': true })])],
        fecha_fin: [null, Validators.compose([Validators.required,
        DateDiffValidator.dateLessThan('planificacion_actividad', 'fecha_inicio', 'fecha_fin', { 'datediff': true })])],
      }),
      ejecucion_actividad: this.formBuilder.group({
        fecha_inicio: [null, Validators.compose([
          DateDiffValidator.dateLessThan('ejecucion_actividad', 'fecha_inicio', 'fecha_fin', { 'datediff': true })])],
        fecha_fin: [null, Validators.compose([
          DateDiffValidator.dateLessThan('ejecucion_actividad', 'fecha_inicio', 'fecha_fin', { 'datediff': true })])],
      })
    });
    this.getProyecto();
  }

  initialize() {
    const id = this.getActividadId();
    this.resultadoActividadService.get(id)
      .subscribe((resp) => {
        this.actividad = new BehaviorSubject<ActividadModel>(resp);
        this.generateForm();
        // this.setDateValue();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }

  onSubmit() {
    this.edit();
  }

  close() {
    this.activeModal.close(true);
  }

  edit() {
    this.setActividad();
    let actividad;
    this.actividad.subscribe(a => actividad = a);
    // actividad = Object.assign(actividad, this.frmActividad.value);
    this.resultadoActividadService.put(actividad._id, actividad)
      .subscribe((resp) => {
        this.actividad = resp;
        this.close();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }

  private setActividad() {
    let actividad;
    this.actividad.subscribe(a => actividad = a);
    actividad = Object.assign(actividad, this.frmActividad.value);
    this.actividad.next(new ActividadModel(actividad));
  }

  // setDateValue() {
  //   const id = this.getProyectoId();
  //   this.projectService.get(id)
  //     .subscribe((resp) => {
  //     }, (err) => {
  //       this.common.handlerResponse(err.value || err);
  //     });
  // }
  private getProyecto() {
    this.projectService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  private generateForm() {
    if (this.actividad) {
      // this.convertDates();
      this.actividad.subscribe((actividad) => {
        this.frmActividad.setValue({
          ejecucion_actividad: {
            fecha_inicio: actividad.ejecucion_actividad ? actividad.ejecucion_actividad.fecha_inicio : '',
            fecha_fin: actividad.ejecucion_actividad ? actividad.ejecucion_actividad.fecha_fin : ''
          },
          planificacion_actividad: {
            fecha_inicio: actividad.planificacion_actividad.fecha_inicio,
            fecha_fin: actividad.planificacion_actividad.fecha_fin
          }
        });
      });
    }
  }

  private getActividadId() {
    return this.ids.actividad_id;
  }

  private getProyectoId() {
    return this.ids.proyecto_id;
  }

  // private convertDates() {
  //   this.actividad.subscribe((actividad) => {
  //     actividad.planificacion_actividad.fecha_inicio = this.formatter.parse(actividad.planificacion_actividad.fecha_inicio);
  //     actividad.planificacion_actividad.fecha_fin = this.formatter.parse(actividad.planificacion_actividad.fecha_fin);
  //     if (actividad.ejecucion_actividad.fecha_inicio) {
  //       actividad.ejecucion_actividad.fecha_inicio = this.formatter.parse(actividad.ejecucion_actividad.fecha_inicio);
  //     }
  //     if (actividad.ejecucion_actividad.fecha_fin) {
  //       actividad.ejecucion_actividad.fecha_fin = this.formatter.parse(actividad.ejecucion_actividad.fecha_fin);
  //     }
  //   });
  // }

  // private setDates() {
  //   this.frmActividad.value.planificacion_actividad.mes_incio = this.frmActividad.value.planificacion_actividad.fecha_inicio.month;
  //   this.frmActividad.value.planificacion_actividad.anio_incio = this.frmActividad.value.planificacion_actividad.fecha_inicio.year;
  //   this.frmActividad.value.planificacion_actividad.mes_fin = this.frmActividad.value.planificacion_actividad.fecha_fin.month;
  //   this.frmActividad.value.planificacion_actividad.anio_fin = this.frmActividad.value.planificacion_actividad.fecha_fin.year;
  //   this.frmActividad.value.planificacion_actividad.fecha_inicio = this.formatter.format(this.frmActividad.value.planificacion_actividad.fecha_inicio);
  //   this.frmActividad.value.planificacion_actividad.fecha_fin = this.formatter.format(this.frmActividad.value.planificacion_actividad.fecha_fin);
  //   if (this.frmActividad.value.ejecucion_actividad.fecha_inicio) {
  //     this.frmActividad.value.ejecucion_actividad.mes_incio =
  //     this.frmActividad.value.ejecucion_actividad.fecha_inicio.month;
  //     this.frmActividad.value.ejecucion_actividad.anio_incio =
  //     this.frmActividad.value.ejecucion_actividad.fecha_inicio.year;
  //     this.frmActividad.value.ejecucion_actividad.fecha_inicio = this.formatter.format(this.frmActividad.value.ejecucion_actividad.fecha_inicio);
  //   }
  //   if (this.frmActividad.value.ejecucion_actividad.fecha_inicio) {
  //     this.frmActividad.value.ejecucion_actividad.mes_fin =
  //     this.frmActividad.value.ejecucion_actividad.fecha_fin.month;
  //     this.frmActividad.value.ejecucion_actividad.anio_fin =
  //     this.frmActividad.value.ejecucion_actividad.fecha_fin.year;
  //     this.frmActividad.value.ejecucion_actividad.fecha_fin = this.formatter.format(this.frmActividad.value.ejecucion_actividad.fecha_fin);
  //   }
  // }
}
