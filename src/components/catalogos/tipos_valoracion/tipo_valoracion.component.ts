import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TipoValoracionModel } from '../../../models/tipo_valoracion.model';
import { TipoValoracionService } from '../../../providers/catalogos/tipo_valoracion.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoValoracionFormComponent } from './tipo_valoracion_form.component';

@Component({
  selector: 'app-tipo-valoracion-component',
  templateUrl: './tipo_valoracion.component.html'
})
export class TipoValoracionComponent implements OnInit {
  tipos_valoracion: TipoValoracionModel[];
  filter: TipoValoracionModel = new TipoValoracionModel();

  constructor(private router: Router,
    private modal: NgbModal,
    private tipo_valoracionService: TipoValoracionService,
    private common: Common) {
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.tipos_valoracion && this.tipos_valoracion.length === 0;
  }

  initialize(): void {
    this.tipo_valoracionService.all().subscribe((resp) => {
      this.tipos_valoracion = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new TipoValoracionModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.tipo_valoracionService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(tipo_valoracion, isNew = false): void {
    const modalRef = this.modal.open(TipoValoracionFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} TipoValoracion`;
    modalRef.componentInstance.tipo_valoracion = tipo_valoracion;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(tipo_valoracion): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar TipoValoracion';
    modalRef.componentInstance.message = `¿Desea eliminar la TipoValoracion ${tipo_valoracion.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(tipo_valoracion);
      }
    });
  }
}
