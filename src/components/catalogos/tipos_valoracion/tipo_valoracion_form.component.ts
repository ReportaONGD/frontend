import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TipoValoracionModel } from '../../../models/tipo_valoracion.model';
import { TipoValoracionService } from '../../../providers/catalogos/tipo_valoracion.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-tipo-valoracion-form-component',
  templateUrl: './tipo_valoracion_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class TipoValoracionFormComponent implements OnInit {
  frmTipoValoracion: FormGroup;
  tipo_valoracion: TipoValoracionModel;
  tipo_valoraciones: TipoValoracionModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tipoValoracionService: TipoValoracionService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmTipoValoracion = this.formBuilder.group({
      valor: [this.tipo_valoracion.valor ? this.tipo_valoracion.valor : null, Validators.required]
    });
    this.tipoValoracionService.all().subscribe(resp => {
      this.tipo_valoraciones = resp;
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
    if (this.comprobarSiExiste(this.frmTipoValoracion.controls.valor.value)) {
      this.tipoValoracionService.post(this.frmTipoValoracion.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un tipo de valoración con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const tipoValoracion = Object.assign(this.tipo_valoracion, this.frmTipoValoracion.value);
    if (this.comprobarSiExiste(tipoValoracion.valor)) {
      this.tipoValoracionService.put(tipoValoracion._id, tipoValoracion).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un tipo de valoración con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  comprobarSiExiste(valor) {
    const result = this.tipo_valoraciones.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }

}
