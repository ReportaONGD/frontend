import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from '../../../models/categoria.model';
import { CategoriaService } from '../../../providers/catalogos/categoria.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-categoria-form-component',
  templateUrl: './categoria_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class CategoriaFormComponent implements OnInit {
  frmCategoria: FormGroup;
  categoria: CategoriaModel;
  categorias: CategoriaModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmCategoria = this.formBuilder.group({
      valor: [this.categoria.valor ? this.categoria.valor : null, Validators.required]
    });
    this.categoriaService.all().subscribe(resp => {
      this.categorias = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.update();
    }
  }

  onClose(result?: boolean) {
    if (result) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close();
    }
  }

  create() {
    if (this.comprobarSiExiste(this.frmCategoria.controls.valor.value)) {
      this.categoriaService.post(this.frmCategoria.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('El valor ya existe!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const categoria = Object.assign(this.categoria, this.frmCategoria.value);
    if (this.comprobarSiExiste(categoria.valor)) {
      this.categoriaService.put(categoria._id, categoria).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
        });
    } else {
      this.common.toastr.error('El valor ya existe!', 'Error!', { timeOut: 3000 });
    }
  }

  comprobarSiExiste(valor) {
    const result = this.categorias.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }
}
