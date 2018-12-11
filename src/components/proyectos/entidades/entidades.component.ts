import { Component, Input, OnInit } from '@angular/core';
import { OnDestroy, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { EntidadModel } from '../../../models/entidad.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { EntidadService } from '../../../providers/proyecto/entidad/entidad.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-entidades-component',
  templateUrl: './entidades.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [EntidadService, Common],
  entryComponents: [Confirm2Component]
})
export class EntidadesComponent implements OnInit, OnDestroy, OnChanges {
  proyecto: ProyectoModel;
  entidades: BehaviorSubject<EntidadModel[]>;
  frmEntidad: FormGroup;
  entidad = new EntidadModel();
  isNewEntidad = false;
  isEdit = false;
  @Input() ids: ParamsModel;
  isEjecucion = false;
  constructor(private common: Common,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private entidadService: EntidadService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute) {
    this.frmEntidad = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = new ParamsModel({
        proyecto_id: params['id']
      });
      this.entidadService.ids = this.ids;
    });
    this.getProyecto();
    this.all();
    // this.provider.ids = {
    //   proyecto_id: this.project._id
    //  };
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.entidades) {
      this.entidades.unsubscribe();
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (!change.ids.isFirstChange()) {
      this.ids = change.ids.currentValue;
      this.ngOnInit();
    }
  }
  /**
   * Metodo para controlar el alta de una entidad
   */
  addNewEntidad() {
    this.entidad = new EntidadModel();
    this.isNewEntidad = !this.isNewEntidad;
    this.frmEntidad.patchValue(this.entidad);
  }

  /**
   * Evento submit del formulario de alta de entidad
   */
  onSubmitEntidad() {
    if (!this.entidad._id) {
      this.onCreate();
    } else {
      this.onEdit();
    }
    this.isNewEntidad = !this.isNewEntidad;
    this.entidad = new EntidadModel();
  }

  /**
   * Peticion a servidor para la creacion de una entidad
   */
  onCreate() {
    this.entidadService.post(this.frmEntidad.value).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la edicion de una entidad
   */
  onEdit() {
    const item = Object.assign(this.entidad, this.frmEntidad.value);
    this.entidadService.put(item._id, item).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la eliminacion de una entidad
   * @param entidad elemento a eliminar
   */
  delete(entidad) {
    this.entidadService.delete(entidad._id).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Abre un modal de confirmación para la eliminación de una entidad
   * @param item entidad a eliminar
   */
  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Entidad';
    modalRef.componentInstance.message = `¿Desea eliminar la Entidad ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  /**
   * Habilita la edición de una entidad
   * @param item entidad a editar
   */
  editEntidad(item) {
    this.entidad = item;
    this.isNewEntidad = !this.isNewEntidad;
    this.isEdit = true;
    this.frmEntidad.patchValue(this.entidad);
  }

  /**
   * Cancela la edicion de una entidad
   */
  cancel() {
    this.isNewEntidad = false;
  }

  /**
   * Obtiene todas las entidades de un proyecto
   */
  private all() {
    this.entidadService.all().subscribe((resp) => {
      this.entidades = new BehaviorSubject<EntidadModel[]>(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
