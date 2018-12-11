import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LocalizacionModel } from '../../../models/localizacion.model';
import { LocalizacionService } from '../../../providers/catalogos/localizacion.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { LocalizacionFormComponent } from './localizacion_form.component';

@Component({
  selector: 'app-localizacion-component',
  templateUrl: './localizacion.component.html'
})
export class LocalizacionComponent implements OnInit {
  localizaciones: LocalizacionModel[];
  filter: LocalizacionModel = new LocalizacionModel();

  constructor(private router: Router,
    private modal: NgbModal,
    private localizacionService: LocalizacionService,
    private common: Common) {
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.localizaciones && this.localizaciones.length === 0;
  }

  initialize(): void {
    this.localizacionService.all().subscribe((resp) => {
      this.localizaciones = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new LocalizacionModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.localizacionService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(localizacion, isNew = false): void {
    const modalRef = this.modal.open(LocalizacionFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} Localización`;
    modalRef.componentInstance.localizacion = localizacion;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(localizacion): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Localización';
    modalRef.componentInstance.message = `¿Desea eliminar la Localización ${localizacion.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(localizacion);
      }
    });
  }
}
