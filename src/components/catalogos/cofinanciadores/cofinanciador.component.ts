import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CofinanciadorModel } from '../../../models/cofinanciador.model';
import { CofinanciadorService } from '../../../providers/catalogos/cofinanciador.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { CofinanciadorFormComponent } from './cofinanciador_form.component';

@Component({
  selector: 'app-cofinanciador-component',
  templateUrl: './cofinanciador.component.html'
})
export class CofinanciadorComponent implements OnInit {
  cofinanciadores: CofinanciadorModel[];
  filter: CofinanciadorModel = new CofinanciadorModel();
  navigationSubscription;

  constructor(private router: Router,
    private modal: NgbModal,
    private cofinanciadorService: CofinanciadorService,
    private common: Common) {
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.cofinanciadores && this.cofinanciadores.length === 0;
  }

  initialize(): void {
    this.cofinanciadorService.all().subscribe((resp) => {
      this.cofinanciadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new CofinanciadorModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  compare(val1: CofinanciadorModel, val2: CofinanciadorModel): boolean {
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
  }

  private delete(item): void {
    this.cofinanciadorService.delete(item._id).subscribe((resp) => {
     this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(cofinanciador, isNew = false): void {
    const modalRef = this.modal.open(CofinanciadorFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} Cofinanciador`;
    modalRef.componentInstance.cofinanciador = cofinanciador;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(cofinanciador): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Cofinanciador';
    modalRef.componentInstance.message = `¿Desea eliminar el Cofinanciador ${cofinanciador.valor}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(cofinanciador);
      }
    });
  }
}
