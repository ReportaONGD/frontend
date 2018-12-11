import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoProyectoModel } from '../../../models/estado_proyecto.model';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { EstadosProyectoFormComponent } from './estados_proyecto_form.component';

@Component({
  selector: 'app-estados-proyecto-component',
  templateUrl: './estados_proyecto.component.html'
})
export class EstadosProyectoComponent implements OnInit {
  estadosProyecto: EstadoProyectoModel[];
  // En este caso no se usa el modelo por el campo final
  // filter = { nombre: '', estado_siguiente: null, final: null };
  filter = { nombre: '', estado_siguiente: null, final: '' };
  navigationSubscription;

  constructor(private router: Router,
    private modal: NgbModal,
    private estadosProyectoService: EstadosProyectoService,
    private common: Common) {
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.estadosProyecto && this.estadosProyecto.length === 0;
  }

  initialize(): void {
    this.estadosProyectoService.all().subscribe((resp) => {
      this.estadosProyecto = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new EstadoProyectoModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.estadosProyectoService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(estadoProyecto, isNew = false): void {
    const modalRef = this.modal.open(EstadosProyectoFormComponent);
    const text = isNew ? 'Nuevo' : 'Edición';
    modalRef.componentInstance.title = `${text} EstadosProyecto`;
    modalRef.componentInstance.estadoProyecto = estadoProyecto;
    modalRef.componentInstance.estadosProyecto = this.estadosProyecto;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(estadoProyecto): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar EstadosProyecto';
    modalRef.componentInstance.message = `¿Desea eliminar la EstadosProyecto ${estadoProyecto.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(estadoProyecto);
      }
    });
  }

  compare(val1, val2): boolean {
    console.log('ebntra');
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
  }

}
