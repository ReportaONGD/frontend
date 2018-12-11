import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratoModel } from '../../../models/contrato.model';
import { ContratoService } from '../../../providers/catalogos/contrato.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-contrato-form-component',
  templateUrl: './contrato_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class ContratoFormComponent implements OnInit {
  frmContrato: FormGroup;
  contrato: ContratoModel;
  contratos: ContratoModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contratoService: ContratoService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmContrato = this.formBuilder.group({
      valor: [this.contrato.valor ? this.contrato.valor : null, Validators.required]
    });
    this.contratoService.all().subscribe(resp => {
      this.contratos = resp;
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
    if (this.comprobarSiExiste(this.frmContrato.controls.valor.value)) {
      this.contratoService.post(this.frmContrato.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('El valor ya existe!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const contrato = Object.assign(this.contrato, this.frmContrato.value);
    if (this.comprobarSiExiste(contrato.valor)) {
      this.contratoService.put(contrato._id, contrato).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('El valor ya existe!', 'Error!', { timeOut: 3000 });
    }
  }
  comprobarSiExiste(valor) {
    const result = this.contratos.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }
}
