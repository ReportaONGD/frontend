import { AgenteModel } from './../../../models/agente.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImplementadorModel } from '../../../models/implementador.model';
import { ImplementadorService } from '../../../providers/catalogos/implementador.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ImplementadorFormComponent } from './implementador_form.component';


@Component({
  selector: 'app-implementador-component',
  templateUrl: './implementador.component.html',
  providers: [ImplementadorService, Common],
  entryComponents: [ImplementadorFormComponent]
})
export class ImplementadorComponent implements OnInit {
  implementadores: AgenteModel[];
  filter: AgenteModel = new AgenteModel();
  constructor(
    private modal: NgbModal,
    private service: ImplementadorService,
    private common: Common) {
    this.implementadores = new Array<AgenteModel>();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.implementadores && this.implementadores.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe(resp => {
      this.implementadores = resp;
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

  private openModal(implementador, isNew = false): void {
    const modalRef = this.modal.open(ImplementadorFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} Implementador`;
    modalRef.componentInstance.implementador = implementador;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(implementador): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Implementador';
    modalRef.componentInstance.message = `¿Desea eliminar el Implementador ${implementador.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(implementador);
      }
    });
  }
}
