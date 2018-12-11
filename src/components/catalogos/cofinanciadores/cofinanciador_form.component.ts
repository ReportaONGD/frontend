import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CofinanciadorModel } from '../../../models/cofinanciador.model';
import { CofinanciadorService } from '../../../providers/catalogos/cofinanciador.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-cofinanciador-form-component',
  templateUrl: './cofinanciador_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class CofinanciadorFormComponent implements OnInit {
  frmCofinanciador: FormGroup;
  cofinanciador: CofinanciadorModel;
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cofinanciadorService: CofinanciadorService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmCofinanciador = this.formBuilder.group({
      valor: [this.cofinanciador.valor ? this.cofinanciador.valor : null, Validators.required],
      publica: [this.cofinanciador.publica ? true : false, Validators.required]
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
    if (!this.frmCofinanciador.value.publica) {
      this.frmCofinanciador.value.publica = false;
    }
    this.cofinanciadorService.post(this.frmCofinanciador.value).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const cofinanciador = Object.assign(this.cofinanciador, this.frmCofinanciador.value);
    this.cofinanciadorService.put(cofinanciador._id, cofinanciador).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

}
