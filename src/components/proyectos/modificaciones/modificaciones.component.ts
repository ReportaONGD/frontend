import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { OnDestroy, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ModificacionModel } from '../../../models/modificacion.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ModificacionService } from '../../../providers/proyecto/modificacion/modificacion.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';


@Component({
  selector: 'app-modificacines-component',
  templateUrl: './modificaciones.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ModificacionService, Common],
  entryComponents: [Confirm2Component]
})
export class ModificacionesComponent implements OnInit, OnDestroy, OnChanges {
  proyecto: ProyectoModel;
  frmModificacion: FormGroup;
  modificaciones: BehaviorSubject<ModificacionModel[]>;
  mod = new ModificacionModel();
  dateStructMod: any;
  isNewModificacion = false;
  isEdit = false;
  isEjecucion = false;
  @Input() ids: any;
  constructor(private common: Common,
    private modal: NgbModal,
    private service: ModificacionService,
    private proyectoService: ProyectoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = {
        proyecto_id: params['id']
      };
      this.service.ids = this.ids;
    });
    // this.service.ids = {
    //   proyecto_id: this.project._id
    //  };
    this.frmModificacion = this.formBuilder.group({
      descripcion: [this.mod.descripcion ? this.mod.descripcion : null, Validators.required],
      _fecha: [this.mod._fecha ? this.mod._fecha : null, Validators.required],
    });
    this.getProyecto();
    this.all();
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.modificaciones) {
      this.modificaciones.unsubscribe();
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (!change.ids.isFirstChange()) {
      this.ids = change.ids.currentValue;
      this.ngOnInit();
    }
  }
  /**
   * Metodo para controlar el alta de una modificacion
   */
  addNewModificacion() {
    this.isNewModificacion = !this.isNewModificacion;
  }

  /**
   * Evento submit del formulario de alta/edicion de una modificacion
   */
  onSubmitModificacion() {
    if (!this.mod._id) {
      this.onCreate();
    } else {
      this.onEdit();
    }
    this.isNewModificacion = !this.isNewModificacion;
    this.mod = new ModificacionModel();
  }

  /**
   * Peticion a servidor para la creacion de una modificacion
   */
  onCreate() {
    // this.frmModificacion.value.fecha =
    //   new Date(this.frmModificacion.value.fecha.year,
    //     this.frmModificacion.value.fecha.month - 1,
    //     this.frmModificacion.value.fecha.day);
    const modificacion = new ModificacionModel(this.frmModificacion.value);
    this.service.post(modificacion).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la edicion de una modificacion
   */
  onEdit() {
    // this.frmModificacion.value.fecha =
    //   new Date(this.frmModificacion.value.fecha.year,
    //     this.frmModificacion.value.fecha.month - 1,
    //     this.frmModificacion.value.fecha.day);
    const modificacion = Object.assign(this.mod, new ModificacionModel(this.frmModificacion.value));
    this.service.put(modificacion._id, modificacion).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
  * Peticion a servidor para la eliminacion de una modificacion
  * @param modificacion modificacion a eliminar
  */
  delete(modificacion) {
    this.service.delete(modificacion._id).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Abre un modal de confirmación para la eliminación de una modificacion
   * @param item entidad a eliminar
   */
  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Modificación';
    modalRef.componentInstance.message = `¿Desea eliminar la Modificación ${item.descripcion}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  /**
  * Habilita la edición de una modificacion
  * @param item modificacion a editar
  */
  editModificacion(item) {
    this.mod = item;
    // HAY que mirar esto
    this.dateStructMod = this.mod._fecha;
    this.isNewModificacion = !this.isNewModificacion;
    this.isEdit = true;
  }

  /**
   * Cancela la edicion de una modificacion
   */
  cancel() {
    this.mod = new ModificacionModel();
    this.dateStructMod = this.mod._fecha;
    this.isNewModificacion = false;
  }

  /**
  * Obtiene todas las modificaciones de un proyecto
  */
  private all() {
    this.service.all().subscribe((resp) => {
      this.modificaciones = new BehaviorSubject<ModificacionModel[]>(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = new ProyectoModel(resp);
      this.isEjecucion = this.proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.modificaciones && this.modificaciones.value.length === 0;
  }
}
