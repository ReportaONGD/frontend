import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuenteVerificacionModel } from '../../../models/fuente_verificacion.model';
import { IndicadorModel } from '../../../models/indicador.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { DocumentosComponent } from '../../shared/documentos/documento.component';


@Component({
  selector: 'app-fuente-verificacion-component',
  templateUrl: './fuente_verificacion.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common],
  entryComponents: [Confirm2Component, DocumentosComponent]
})
export class FuenteVerificacionComponent implements OnInit, OnChanges {
  @Input() ids: any;
  @Input() indicador: IndicadorModel;
  @Input() service: BaseServiceInterface;
  @Input() documentosService: BaseServiceInterface;
  frmFV: FormGroup;
  fuentes_verificacion: FuenteVerificacionModel[];
  fv: FuenteVerificacionModel = new FuenteVerificacionModel();
  modalRef: any;
  showForm = false;
  isEjecucion = false;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private proyectoService: ProyectoService,
  ) {
  }

  ngOnInit() {
    this.ids.indicador_id = this.indicador._id;
    this.service.ids = this.ids;
    this.getProyecto();
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.ids.isFirstChange()) {
      this.ids = changes.ids.currentValue;
      this.ngOnInit();
    } else if (!changes.service.isFirstChange()) {
      this.service = changes.service.currentValue;
      this.ngOnInit();
    }
  }

  initialize() {
    this.showForm = false;

    this.frmFV = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.service.all().subscribe((resp) => {
      this.fuentes_verificacion = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addFV() {
    this.showForm = true;
    this.fv = new FuenteVerificacionModel();
  }

  editFV(item) {
    this.showForm = true;
    this.fv = item;
    this.frmFV.patchValue(this.fv);
  }

  onSubmit() {
    if (this.isNew()) {
      this.create();
    } else {
      this.edit();
    }
  }
  openModalDocuments(item: FuenteVerificacionModel): void {
    this.ids.fuente_verificacion_id = item._id;
    const modalRef = this.modal.open(DocumentosComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.documentosService;
    modalRef.componentInstance.documentos = item.documentos;
    modalRef.componentInstance.title = 'Agregar Documento';
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }
  /**
   * Abre el panel de confirmacion para eliminar un indicador
   */
  openModalRemove(item): void {
    this.modalRef = this.modal.open(Confirm2Component);
    this.modalRef.componentInstance.title = 'Eliminar Fuente de Verificación';
    this.modalRef.componentInstance.message = `¿Desea eliminar la Fuente de Verificación ${item.codigo}?`;
    this.modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  cancel() {
    this.showForm = false;
  }

  create() {
    this.service.post(this.frmFV.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const fv = Object.assign(this.fv, this.frmFV.value);
    this.service.put(fv._id, fv).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(fv) {
    this.service.delete(fv._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  isNew() {
    return !this.fv._id;
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

