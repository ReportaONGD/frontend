import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActividadModel } from '../../../models/actividad.model';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { DateDiffValidator } from '../../../validators/date_diff.validator';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { EjecucionActividadModel } from '../../../models/ejecucion_actividad.model';
import { PlanificacionActividadModel } from '../../../models/planificacion_actividad.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Utils } from '../../../utils/utils';
import { EtapaModel } from '../../../models/etapa.model';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';

@Component({
  selector: 'app-actividad-detail-component',
  templateUrl: './actividad_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, NgbCumstonDateParserFormatter, Common]
})
export class ActividadDetailComponent implements OnInit {
  ids: ParamsModel;
  frmActividad: FormGroup;
  actividad: BehaviorSubject<ActividadModel>;
  maxDate: any;
  minDate: any;
  title: string;
  existsActividad = new BehaviorSubject<boolean>(false);
  isEjecucion = false;
  controlesInactivos = ['ejecucion_actividad'];
  constructor(private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private resultadoService: ResultadoActividadService,
    private common: Common,
    private activeModal: NgbActiveModal,
    private ds: NgbCumstonDateParserFormatter) {
  }
  ngOnInit() {
    this.resultadoService.ids = this.ids;
    this.initialize();
    this.generateForm();
  }

  initialize() {
    this.getProyecto();
  }

  // loadProject() {
  //   const id = this.getProyectoId();
  //   this.proyectoService.get(id).subscribe((resp) => {
  //     if (resp) {
  //       // this.maxDate = this.formatter.parse(resp.fecha_fin);
  //       // this.minDate = this.formatter.parse(resp.fecha_inicio);
  //     }
  //   }, (err) => {
  //     this.common.handlerResponse(err.value || err);
  //   });
  // }

  onSubmit() {
    if (!this.getActividadId()) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    // this.setActividad();

    const actividad = new ActividadModel(this.frmActividad.value);
    this.resultadoService.post(actividad).subscribe((resp) => {
     this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    // this.setActividad();
    const actividad = this.actividad.getValue();
    this.resultadoService.put(actividad._id, this.frmActividad.value).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  close() {
    this.activeModal.close(true);
  }

  private getProyectoId() {
    return this.ids.proyecto_id;
  }

  private generateForm() {
    if (this.getActividadId()) {
      this.existsActividad.next(true);
    }
    this.frmActividad = this.formBuilder.group({
      codigo: ['' , Validators.required],
      descripcion: ['', Validators.required],
      planificacion_actividad:  this.formBuilder.group({
        fecha_inicio: [null, Validators.required],
        fecha_fin: [null, Validators.required],
      }),
      ejecucion_actividad:  this.formBuilder.group({
        fecha_inicio: [null, []],
        fecha_fin: [null, []],
      }),
      comentario: [''],
      comentarios_ong: [''],
      comentarios_aecid: [''],
      comentarios_costes_personal: [''],
      etapa: [null, Validators.required]
    }, [
      {
        validator: DateDiffValidator.dateLessThan('ejecucion_actividad', 'fecha_inicio', 'fecha_fin', {'datediff': true})
      },
      {
        validator: DateDiffValidator.dateLessThan('planificacion_actividad', 'fecha_inicio', 'fecha_fin', {'datediff': true})
      }]);
      this.frmActividad.controls.etapa.valueChanges.subscribe((value) => {
        this.setLimitDates(value);
      });
      if (this.actividad.getValue().etapa) {
       this.setLimitDates(this.actividad.getValue().etapa);
      }
    this.frmActividad.patchValue(this.actividad.getValue());
  }

  private setActividad() {
    this.frmActividad.value.global = false;
    // this.frmActividad.controls['ejecucion_actividad'].patchValue((new EjecucionActividadModel(this.frmActividad.value.ejecucion_actividad)));
    // this.frmActividad.controls['planificacion_actividad'].patchValue((new PlanificacionActividadModel(this.frmActividad.value.planificacion_actividad)));
    // const actividad =  new ActividadModel(Object.assign(this.actividad.getValue(), this.frmActividad.value));
    const actividad = Object.assign(this.actividad.getValue(), this.frmActividad.value);
    this.actividad.next(actividad);
  }

  private getActividadId(): string {
    if (this.actividad.getValue()) {
      return this.actividad.getValue()._id;
    }
  }
  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
      this.accionElementosXEstado();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private accionElementosXEstado() {
    Utils.accionControles(this.frmActividad, this.controlesInactivos, this.isEjecucion);
  }

  private setLimitDates(value: EtapaModel) {
    const etapa = value;
    const etapa_inicio = new Date(value.fecha_inicio).toLocaleDateString();
    const etapa_fin = new Date(value.fecha_fin).toLocaleDateString();
    this.maxDate = this.ds.parse(etapa_fin);
    this.minDate = this.ds.parse(etapa_inicio);
  }
}

