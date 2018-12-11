import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagoModel } from '../../../models/pago.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { PagoService } from '../../../providers/proyecto/pagos/pago.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { PagoDetailComponent } from './pago_detail.component';
@Component({
  selector: 'app-pago-component',
  templateUrl: './pago.component.html',
  providers: [PagoService, Common],
  entryComponents: [PagoDetailComponent]
})
export class PagoComponent implements OnInit, OnChanges {
  filter: PagoModel = new PagoModel();
  ds: NgbCumstonDateParserFormatter = new NgbCumstonDateParserFormatter();
  @Input() ids: ParamsModel;
  pagos: PagoModel[];
  title = 'Pagos';
  proyecto: ProyectoModel;
  isEjecucion = false;
  constructor(
    private modal: NgbModal,
    private service: PagoService,
    private common: Common,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService
  ) {
  }

  ngOnInit() {
    this.pagos = [];
    this.route.params.subscribe((params: any) => {
      this.ids.gasto_id = params['gasto_id'];
    });

    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids.proyecto_id = params['id'];
        this.service.ids = this.ids;
        this.proyectoService.ids = this.ids;
      });
    }
    this.getProyecto();
    this.initialize();
  }
  ngOnChanges(change: SimpleChanges) {
    if (!change.ids.isFirstChange()) {
      this.ids = change.ids.currentValue;
      this.ngOnInit();
    }
  }
  showAlert() {
    return this.pagos && this.pagos.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe((resp) => {
      this.pagos = resp;
    });
  }

  editPago(item): void {
    this.openModal(item);
  }

  addPago(): void {
    this.openModal(new PagoModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  openModal(pago, isNew = false): void {
    const modalRef = this.modal.open(PagoDetailComponent);
    const text = isNew ? 'Nueva' : 'Edición';
    modalRef.componentInstance.title = `${text} Pago`;
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.pago = pago;
    modalRef.componentInstance.proyecto = this.proyecto;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  openModalConfirm(pago): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Pago';
    modalRef.componentInstance.message = `¿Desea eliminar la Pago ${pago.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(pago);
      }
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
}
