import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PeriodoModel } from '../../../models/periodo.model';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { PeriodoService } from '../../../providers/proyecto/periodo/periodo.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ParamsModel } from '../../../models/params.model';
import { PeriodoDetailComponent } from './periodo_detail.component';
import { ProyectoModel } from '../../../models/proyecto.model';

@Component({
  selector: 'app-periodo-component',
  templateUrl: './periodo.component.html',
  providers: [PeriodoService, ProyectoService, Common],
  entryComponents: [PeriodoDetailComponent]
})
export class PeriodoComponent implements OnInit, OnChanges {
  // filter: PeriodoModel = new PeriodoModel();
  ds: NgbCumstonDateParserFormatter = new NgbCumstonDateParserFormatter();
  @Input() ids: ParamsModel;
  periodos: PeriodoModel[];
  isEjecucion = false;
  constructor(
    private modal: NgbModal,
    private service: PeriodoService,
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
    return this.periodos && this.periodos.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe((resp) => {
      this.periodos = resp;
    });
  }

  editPeriodo(item): void {
    this.openModal(item);
  }

  addPeriodo(): void {
    this.openModal(new PeriodoModel(), true);
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

  openModal(periodo, isNew = false): void {
    const modalRef = this.modal.open(PeriodoDetailComponent);
    const text = isNew ? 'Nueva' : 'Edición';
    modalRef.componentInstance.title = `${text} Periodo`;
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.periodo = periodo;
    modalRef.componentInstance.isNewPeriodo = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  openModalConfirm(periodo): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Periodo';
    modalRef.componentInstance.message = `¿Desea eliminar la Periodo ${periodo.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(periodo);
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
