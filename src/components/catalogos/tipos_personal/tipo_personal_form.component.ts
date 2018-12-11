import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPersonalModel } from '../../../models/tipo_personal.model';
import { TipoPersonalService } from '../../../providers/catalogos/tipo_personal.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-tipo-personal-form-component',
  templateUrl: './tipo_personal_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class TipoPersonalFormComponent implements OnInit {
  frmTipoPersonal: FormGroup;
  tipoPersonal: TipoPersonalModel;
  tipoPersonales: TipoPersonalModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tipoPersonalService: TipoPersonalService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmTipoPersonal = this.formBuilder.group({
      codigo: [this.tipoPersonal.codigo ? this.tipoPersonal.codigo : null, Validators.required],
      valor: [this.tipoPersonal.valor ? this.tipoPersonal.valor : null, Validators.required]
    });
    this.tipoPersonalService.all().subscribe(resp => {
      this.tipoPersonales = resp;
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
    if (this.comprobarSiExiste(this.frmTipoPersonal.controls.valor.value)) {
      this.tipoPersonalService.post(this.frmTipoPersonal.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un tipo de personal con ese valor!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const tipoPersonal = Object.assign(this.tipoPersonal, this.frmTipoPersonal.value);
    if (this.comprobarSiExiste(tipoPersonal.valor)) {
      this.tipoPersonalService.put(tipoPersonal._id, tipoPersonal).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un tipo de personal con ese valor!', 'Error!', { timeOut: 3000 });
    }
  }

  comprobarSiExiste(valor) {
    const result = this.tipoPersonales.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }

}
