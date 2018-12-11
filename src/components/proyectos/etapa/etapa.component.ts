import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtapaModel } from '../../../models/etapa.model';
import { EtapaService } from '../../../providers/proyecto/etapas/etapa.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { EtapaDetailComponent } from './etapa_detail.component';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ParamsModel } from '../../../models/params.model';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
@Component({
  selector: 'app-etapa-component',
  templateUrl: './etapa.component.html',
  providers: [EtapaService, Common],
  entryComponents: [EtapaDetailComponent]
})
export class EtapaComponent implements OnInit, OnChanges {
  filter: EtapaModel  = new EtapaModel();
  ds: NgbCumstonDateParserFormatter = new NgbCumstonDateParserFormatter();
  @Input() ids: ParamsModel;
  etapas: EtapaModel[];
  isEjecucion = false;
  constructor(
    private modal: NgbModal,
    private service: EtapaService,
    private common: Common,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService
    ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = {
          proyecto_id: params['id']
        };
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
    return this.etapas && this.etapas.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe((resp) => {
      this.etapas = resp;
    });
  }

  editEtapa(item): void {
    this.openModal(item);
  }

  addEtapa(): void {
    this.openModal(new EtapaModel(), true);
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

  openModal(etapa, isNew = false): void {
    const modalRef = this.modal.open(EtapaDetailComponent);
    const text = isNew ? 'Nueva' : 'Edición';
    modalRef.componentInstance.title = `${text} Etapa`;
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.etapa = etapa;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  openModalConfirm(etapa): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Etapa';
    modalRef.componentInstance.message = `¿Desea eliminar la Etapa ${etapa.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(etapa);
      }
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
