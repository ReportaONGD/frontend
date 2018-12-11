import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoMovimientoFormComponent } from './tipo_movimiento_form.component';

@Component({
  selector: 'app-tipo-movimiento-component',
  templateUrl: './tipo_movimiento.component.html'
})
export class TipoMovimientoComponent implements OnInit {
  tiposMovimiento: TipoMovimientoModel[];
  filter: TipoMovimientoModel = new TipoMovimientoModel();

  constructor(private router: Router,
    private modal: NgbModal,
    private tipoMovimientoService: TipoMovimientoService,
    private common: Common) {
    // this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.tiposMovimiento && this.tiposMovimiento.length === 0;
  }

  initialize(): void {
    this.tipoMovimientoService.all().subscribe((resp) => {
      this.tiposMovimiento = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new TipoMovimientoModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.tipoMovimientoService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(tipoMovimiento, isNew = false): void {
    const modalRef = this.modal.open(TipoMovimientoFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} TipoMovimiento`;
    modalRef.componentInstance.tipoMovimiento = tipoMovimiento;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(tipoMovimiento): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar TipoMovimiento';
    modalRef.componentInstance.message = `¿Desea eliminar la TipoMovimiento ${tipoMovimiento.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(tipoMovimiento);
      }
    });
  }
}
