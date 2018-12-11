import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TipoPersonalModel } from '../../../models/tipo_personal.model';
import { TipoPersonalService } from '../../../providers/catalogos/tipo_personal.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoPersonalFormComponent } from './tipo_personal_form.component';

@Component({
  selector: 'app-tipo-personal-component',
  templateUrl: './tipo_personal.component.html'
})
export class TipoPersonalComponent implements OnInit {
  tiposPersonal: Array<TipoPersonalModel>;
  filter: TipoPersonalModel = new TipoPersonalModel();

  constructor(private router: Router,
    private modal: NgbModal,
    private tipoPersonalService: TipoPersonalService,
    private common: Common) {
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.tiposPersonal && this.tiposPersonal.length === 0;
  }

  initialize(): void {
    this.tipoPersonalService.all().subscribe((resp) => {
      this.tiposPersonal = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new TipoPersonalModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.tipoPersonalService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(tipoPersonal, isNew = false): void {
    const modalRef = this.modal.open(TipoPersonalFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} TipoPersonal`;
    modalRef.componentInstance.tipoPersonal = tipoPersonal;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(tipoPersonal): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar TipoPersonal';
    modalRef.componentInstance.message = `¿Desea eliminar la TipoPersonal ${tipoPersonal.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(tipoPersonal);
      }
    });
  }
}
