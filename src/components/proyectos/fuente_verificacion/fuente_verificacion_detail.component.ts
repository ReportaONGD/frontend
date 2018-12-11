import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FuenteVerificacionModel } from '../../../models/fuente_verificacion.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';

@Component({
  selector: 'app-fuente-verificacion-detail-component',
  templateUrl: './fuente_verificacion_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common]
})
export class FuenteVerificacionDetailComponent implements OnInit {
  frmFV: FormGroup;
  fv: FuenteVerificacionModel;
  ids: any;
  service: BaseServiceInterface;
  modalRef: any;

  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.service.ids = this.ids;
    this.frmFV = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.generateForm();
  }

  onSubmit() {
    if (!this.fv._id) {
      this.create();
    } else {
      this.edit();
    }
  }

  close() {
    this.modal.close(true);
  }

  create() {
    this.service.post(this.frmFV.value).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const fv = Object.assign(this.fv, this.frmFV.value);
    this.service.put(fv._id, fv).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private generateForm() {
    if (this.fv._id) {
      this.frmFV.patchValue(this.fv);
    }
  }
}

