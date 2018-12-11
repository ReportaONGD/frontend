import { AgenteService } from './../../../providers/catalogos/agente.service';
import { AgenteModel } from './../../../models/agente.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { FinanciadorFormComponent } from './financiador_form.component';


@Component({
  selector: 'app-financiador-component',
  templateUrl: './financiador.component.html',
  providers: [AgenteService, Common],
  entryComponents: [FinanciadorFormComponent]
})
export class FinanciadorComponent implements OnInit {
  agentes: AgenteModel[];
  filter: AgenteModel = new AgenteModel();
  constructor(
    private modal: NgbModal,
    private service: AgenteService,
    private common: Common) {
    this.agentes = new Array<AgenteModel>();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.agentes && this.agentes.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe(resp => {
      this.agentes = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new AgenteModel(), true);
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

  private openModal(agente, isNew = false): void {
    const modalRef = this.modal.open(FinanciadorFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} Financiador`;
    modalRef.componentInstance.agente = agente;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(agente): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Financiador';
    modalRef.componentInstance.message = `¿Desea eliminar el Financiador ${agente.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(agente);
      }
    });
  }
}
