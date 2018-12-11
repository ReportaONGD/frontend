import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActividadModel } from '../../../models/actividad.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';


@Component({
  selector: 'app-actividad-global-component',
  templateUrl: './actividad_global.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, ActividadGlobalService, Common]
})
export class ActividadGlobalComponent implements OnInit, OnDestroy {
  ids: ParamsModel = new ParamsModel();
  frmActividad: FormGroup;
  actividad: BehaviorSubject<ActividadModel>;
  existsActividad = new BehaviorSubject<boolean>(false);
  isEjecucion = false;
  controlesInactivos = [];

  constructor(private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private service: ActividadGlobalService,
    private common: Common,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids.proyecto_id = params['id'];
      this.proyectoService.ids = this.ids;
      this.service.ids = this.ids;
      this.initialize();
    });
  }

  public ngOnDestroy() {
    if (this.existsActividad) {
      this.existsActividad.unsubscribe();
    }
  }
  initialize() {
    const id = this.getProyectoId();
    this.frmActividad = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      comentario: [''],
      comentarios_ong: [''],
      comentarios_aecid: [''],
      comentarios_costes_personal: ['']
    });

    this.proyectoService.get(id).subscribe((resp) => {
      if (resp && resp.actividad_global) {
        this.actividad = new BehaviorSubject<ActividadModel>(resp.actividad_global);
        this.ids.actividad_global_id = resp.actividad_global._id;
        this.existsActividad.next(true);
        this.isEjecucion = resp.validateProjectState();
        this.accionElementosXEstado();
      } else {
        this.actividad = new BehaviorSubject<ActividadModel>(new ActividadModel());
      }
      this.generateForm();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onSubmit() {
    const id = this.getActividadId();
    if (!id) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    this.frmActividad.value.global = true;
    this.service.post(this.frmActividad.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    this.setActividadGlobal();
    const actividad_global = new ActividadModel(this.actividad.getValue());
    this.service.put(actividad_global._id, actividad_global).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  generateForm() {
    this.frmActividad.patchValue(this.actividad.getValue());
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmActividad, this.controlesInactivos, this.isEjecucion);
  }

  private getProyectoId() {
    return this.ids.proyecto_id;
  }

  private getActividadId() {
    let id;
    if (this.actividad) {
      this.actividad.subscribe(a => id = a._id);
    }
    return id;
  }

  private setActividadGlobal() {
    this.frmActividad.value.global = true;
    const actividad = new ActividadModel(Object.assign(this.actividad.getValue(), this.frmActividad.value));
    this.actividad.next(actividad);
  }
}
