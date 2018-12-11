import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratoModel } from '../../../models/contrato.model';
import { ContratoService } from '../../../providers/catalogos/contrato.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ContratoFormComponent } from './contrato_form.component';

@Component({
  selector: 'app-contrato-component',
  templateUrl: './contrato.component.html'
})
export class ContratoComponent implements OnInit {
  contratos: Array<ContratoModel>;
  filter: ContratoModel = new ContratoModel();
  navigationSubscription;

  constructor(private router: Router,
    private modal: NgbModal,
    private contratoService: ContratoService,
    private common: Common) {
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.contratos && this.contratos.length === 0;
  }

  initialize(): void {
    this.contratoService.all().subscribe((resp) => {
      this.contratos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new ContratoModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.contratoService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(contrato, isNew = false): void {
    const modalRef = this.modal.open(ContratoFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} Contrato`;
    modalRef.componentInstance.contrato = contrato;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(contrato): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Contrato';
    modalRef.componentInstance.message = `¿Desea eliminar la Contrato ${contrato.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(contrato);
      }
    });
  }
}
