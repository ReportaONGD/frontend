import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RecursoModel } from '../../../models/recurso.model';
import { ActividadModel } from '../../../models/actividad.model';
import { ProyectoModel } from '../../../models/proyecto.model';

import { Common } from '../../../providers/common/common';
import {
  ActividadRecursoService
} from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/recursos/actividad_recurso.service';
import {
  ResultadoActividadService
} from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';
import { ActividadGlobalRecursoService } from '../../../providers/proyecto/actividad_global/recursos/actividad_global_recurso.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';



@Component({
  selector: 'app-recurso-component',
  templateUrl: './recursos.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ActividadRecursoService, ResultadoActividadService, Common],
  entryComponents: [Confirm2Component]
})
export class RecursoComponent implements OnInit {
  @Input() ids: any;
  @Input() isResultado: boolean;
  @Input() actividad: BehaviorSubject<ActividadModel>;
  frmRecurso: FormGroup;
  project: ProyectoModel;
  recurso: RecursoModel = new RecursoModel();
  recursos: RecursoModel[];
  isNewRecurso = false;
  isEdit = false;
  modalRef: any;
  actividadExist = new BehaviorSubject<boolean>(false);
  isEjecucion = false;
  constructor(private common: Common,
              private formBuilder: FormBuilder,
              private service: ActividadRecursoService,
              private resultadoActividadService: ResultadoActividadService,
              private actividadGlobalService: ActividadGlobalService,
              private actividadGlobalRecursoService: ActividadGlobalRecursoService,
              private proyectoService: ProyectoService,
              private modal: NgbModal) {
  }
  ngOnInit() {
    if (this.isResultado) {
      this.service.ids = this.ids;
      this.resultadoActividadService.ids = this.ids;
    } else {
      this.actividadGlobalService.ids = this.ids;
      this.actividadGlobalRecursoService.ids = this.ids;
    }
    // this.initialize();
    // this.setRecursos();
    this.frmRecurso = this.formBuilder.group({
      coste: [null, Validators.required],
      descripcion: ['', Validators.required],
    });
    this.getActividadId();
    this.getProyecto();
  }
  addNewRecurso() {
    this.isNewRecurso = !this.isNewRecurso;
    this.recurso = new RecursoModel();
    this.generateForm();
  }
  editRecurso(item) {
    this.recurso = item;
    this.generateForm();
    this.isNewRecurso = !this.isNewRecurso;
    this.isEdit = true;
  }

  onSubmit() {
    if (this.isResultado) {
      this.saveRA();
    } else {
      this.saveAG();
    }
    this.isNewRecurso = !this.isNewRecurso;
  }
  /**
   * Abre el panel de confirmacion para eliminar un indicador
   */
  openModalRemove(item: RecursoModel): void {
    this.modalRef = this.modal.open(Confirm2Component);
    this.modalRef.componentInstance.title = 'Eliminar Recurso';
    this.modalRef.componentInstance.message = `¿Desea eliminar el Recurso ${ item.descripcion }?`;
    this.modalRef.result.then((result) => {
      if (result) {
        if (this.isResultado) {
          this.deleteRA(item);
        } else {
        }
      }
    });
  }

  cancel() {
    this.isNewRecurso = false;
    this.recurso = new RecursoModel();
  }

  saveRA() {
    if (!this.recurso._id) {
      this.createRA();
    } else {
      this.editRA();
    }
  }
  saveAG() {
    if (!this.recurso._id) {
      this.createAG();
    } else {
      this.editAG();
    }
  }

  loadRA() {
    const id = this.getActividadId();
    this.resultadoActividadService.get(id).subscribe((resp) => {
      this.actividad.next(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  createRA() {
    this.service.post(this.frmRecurso.value).subscribe((resp) => {
     this.loadRA();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  editRA() {
    const recurso = Object.assign(this.recurso, this.frmRecurso.value);
    this.service.put(recurso._id, recurso).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.loadRA();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  deleteRA(recurso) {
    this.service.delete(recurso._id).subscribe((resp) => {
      this.loadRA();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  loadAG() {
    const id = this.getActividadId();
    this.actividadGlobalService.get(id).subscribe((resp) => {
      this.actividad.next(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  createAG() {
    this.actividadGlobalRecursoService.post(this.frmRecurso.value).subscribe((resp) => {
     this.loadAG();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  editAG() {
    const recurso = Object.assign(this.recurso, this.frmRecurso.value);
    this.actividadGlobalRecursoService.put(recurso._id, recurso).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.loadAG();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  deleteAG(recurso) {
    this.actividadGlobalRecursoService.delete(recurso._id).subscribe((resp) => {
      this.loadAG();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  private generateForm() {
    this.frmRecurso.patchValue(this.recurso);
  }
  private getActividadId() {
    let id;
    if (this.actividad && this.actividad.getValue() && this.actividad.getValue()._id) {
      this.actividadExist.next(true);
      this.actividad.subscribe(i => id = i._id);
    }
    return id;
  }
  // private setRecursos() {
  //   this.actividad.subscribe(i => this.recursos = i.recurso);
  // }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}

