import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from '../../../models/categoria.model';
import { CategoriaService } from '../../../providers/catalogos/categoria.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { CategoriaFormComponent } from './categoria_form.component';

@Component({
  selector: 'app-categorias-component',
  templateUrl: './categoria.component.html',
  providers: [CategoriaService, Common],
  entryComponents: [CategoriaFormComponent]
})
export class CategoriaComponent implements OnInit {
  categorias: CategoriaModel[];
  filter: CategoriaModel = new CategoriaModel();

  constructor(
    private modal: NgbModal,
    private categoriaService: CategoriaService,
    private common: Common) {
    this.categorias = [];
  }

  ngOnInit() {
    this.initialize();
  }

  showAlert() {
    return this.categorias && this.categorias.length === 0;
  }

  initialize(): void {
    this.categoriaService.all().subscribe(resp => {
      this.categorias = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onEdit(item): void {
    this.openModal(item);
  }

  onNew(): void {
    this.openModal(new CategoriaModel(), true);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  private delete(item): void {
    this.categoriaService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private openModal(categoria, isNew = false): void {
    const modalRef = this.modal.open(CategoriaFormComponent);
    const text = isNew ? 'Nueva' : 'Edición';
    modalRef.componentInstance.title = `${text} Categoría`;
    modalRef.componentInstance.categoria = categoria;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  private openModalConfirm(categoria): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Categoría';
    modalRef.componentInstance.message = `¿Desea eliminar la Categoría ${categoria.valor}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(categoria);
      }
    });
  }
}
