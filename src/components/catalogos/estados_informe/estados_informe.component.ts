import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoInformeModel } from '../../../models/estado_informe.model';
import { EstadosInformeService } from '../../../providers/catalogos/estados_informe.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { EstadosInformeFormComponent } from './estados_informe_form.component';

@Component({
  selector: 'app-estados-informe-component',
  templateUrl: './estados_informe.component.html'
})
export class EstadosInformeComponent implements OnInit {
  estadosInforme: EstadoInformeModel[];
  // En este caso no se usa el modelo por el campo final
  // filter = { nombre: '', estado_siguiente: null, final: null };
  filter = { nombre: '', estado_siguiente: null, final: '' };
  navigationSubscription;

  constructor(private router: Router,
    private modal: NgbModal,
    private estadosInformeService: EstadosInformeService,
    private common: Common) {
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.estadosInforme && this.estadosInforme.length === 0;
  }

  initialize(): void {
    this.estadosInformeService.all().subscribe((resp) => {
      this.estadosInforme = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new EstadoInformeModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.estadosInformeService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(estadoInforme, isNew = false): void {
    const modalRef = this.modal.open(EstadosInformeFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} EstadosInforme`;
    modalRef.componentInstance.estadoInforme = estadoInforme;
    modalRef.componentInstance.estadosInforme = this.estadosInforme;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(estadoInforme): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar EstadosInforme';
    modalRef.componentInstance.message = `¿Desea eliminar la EstadosInforme ${estadoInforme.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(estadoInforme);
      }
    });
  }

  compare(val1, val2): boolean {
    console.log('ebntra');
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
  }

}
