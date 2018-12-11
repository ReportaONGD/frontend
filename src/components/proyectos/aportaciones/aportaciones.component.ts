import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AportacionModel } from '../../../models/aportacion.model';
import { CofinanciadorModel } from '../../../models/cofinanciador.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { AportacionService } from '../../../providers/proyecto/aportacion/aportacion.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { CofinanciadorService } from '../../../providers/catalogos/cofinanciador.service';
import { ParamsModel } from '../../../models/params.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';


@Component({
  selector: 'app-aportaciones-component',
  templateUrl: './aportaciones.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [AportacionService, CofinanciadorService, ProyectoService, Common],
  entryComponents: [Confirm2Component]
})
export class AportacionesComponent implements OnInit, OnDestroy, OnChanges {
  proyecto: ProyectoModel;
  frmApor: FormGroup;
  aportaciones: BehaviorSubject<AportacionModel[]>;
  isNewAportacion = false;
  isEdit = false;
  apor = new AportacionModel();
  cofinanciadores: CofinanciadorModel[];
  isEjecucion = false;
  @Input() ids: ParamsModel;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private service: AportacionService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private cofinanciadorService: CofinanciadorService) {
      this.loadCofinanciadores();
  }
  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.service.ids = this.ids;
      });
    }
    this.frmApor = this.formBuilder.group({
      cuantia: [null, Validators.required],
      cofinanciador: [null, Validators.required]
    });
    this.getProyecto();
    this.all();
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.aportaciones) {
      this.aportaciones.unsubscribe();
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (!change.ids.isFirstChange()) {
      this.ids = change.ids.currentValue;
      this.ngOnInit();
    }
  }
  /**
   * Metodo para controlar el alta de una aportacion
   */
  addNewAportacion() {
    if (!this.apor.cofinanciador) {
      this.apor.cofinanciador = new CofinanciadorModel();
    }
    this.apor = new AportacionModel();
    this.isNewAportacion = !this.isNewAportacion;
    this.frmApor.patchValue(this.apor);
  }

  /**
   * Evento submit del formulario de alta/edicion de una aportacion
   */
  onSubmitAportacion() {
    // this.apor.publica = !this.apor.privada;
    if (!this.apor._id) {
      this.onCreate();
    } else {
      this.onEdit();
    }
    this.isNewAportacion = !this.isNewAportacion;
    this.apor = new AportacionModel();
  }

  /**
   * Peticion a servidor para la creacion de una aportacion
   */
  onCreate() {
    this.service.post(this.frmApor.value).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la edicion de una aportacion
   */
  onEdit() {
    const aportacion = Object.assign(this.apor, this.frmApor.value);
    this.service.put(aportacion._id, aportacion).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la eliminacion de una aportacion
   * @param aportacion aportacion a eliminar
   */
  delete(aportacion) {
    this.service.delete(aportacion._id).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  /**
   * Obtiene todas las aportaciones de un proyecto
   */
  all() {
    this.service.all().subscribe((resp) => {
      this.aportaciones = new BehaviorSubject<AportacionModel[]>(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  /**
   * Abre un modal de confirmación para la eliminación de una aportacion
   * @param item aportacion a eliminar
   */
  openModalRemove(item: AportacionModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Aportación';
    modalRef.componentInstance.message = `¿Desea eliminar la Aportación de la entidad ${item.cofinanciador.valor}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  /**
  * Habilita la edición de una aportacion
  * @param item aportacion a editar
  */
  editAportacion(item) {
    this.apor = item;
    this.isNewAportacion = !this.isNewAportacion;
    this.isEdit = true;
    this.frmApor.patchValue(this.apor);
  }

  /**
   * Cancela la edicion de una aportacion
   */
  cancel() {
    this.apor = new AportacionModel();
    this.isNewAportacion = false;
  }

  compareFn(c1: CofinanciadorModel, c2: CofinanciadorModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  private loadCofinanciadores() {
    this.cofinanciadorService.all().subscribe((resp) => {
      this.cofinanciadores = resp;
    }, (err => {
      this.common.handlerResponse(err.value || err);
    }));
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
