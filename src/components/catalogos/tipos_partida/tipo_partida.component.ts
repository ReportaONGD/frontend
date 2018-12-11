import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPartidaModel } from '../../../models/tipo_partida.model';
import { TipoPartidaService } from '../../../providers/catalogos/tipo_partida.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoPartidaFormComponent } from './tipo_partida_form.component';

@Component({
  selector: 'app-tipo-partida-component',
  templateUrl: './tipo_partida.component.html'
})
export class TipoPartidaComponent implements OnInit {
  tiposPartida: TipoPartidaModel[];
  filter: TipoPartidaModel = new TipoPartidaModel();

  constructor(private router: Router,
    private modal: NgbModal,
    private tipoPartidaService: TipoPartidaService,
    private common: Common) {
    this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.tiposPartida && this.tiposPartida.length === 0;
  }

  initialize(): void {
    this.tipoPartidaService.all().subscribe((resp) => {
      this.tiposPartida = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new TipoPartidaModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.tipoPartidaService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(tipoPartida, isNew = false): void {
    const modalRef = this.modal.open(TipoPartidaFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} TipoPartida`;
    modalRef.componentInstance.tipoPartida = tipoPartida;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(tipoPartida): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar TipoPartida';
    modalRef.componentInstance.message = `¿Desea eliminar la TipoPartida ${tipoPartida.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(tipoPartida);
      }
    });
  }
}
