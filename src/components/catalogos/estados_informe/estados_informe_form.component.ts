import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbCheckBox } from '@ng-bootstrap/ng-bootstrap';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap/buttons/label';
import { EstadoInformeModel } from '../../../models/estado_informe.model';
import { EstadosInformeService } from '../../../providers/catalogos/estados_informe.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-estados-informe-form-component',
  templateUrl: './estados_informe_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [NgbCheckBox, NgbButtonLabel]
})
export class EstadosInformeFormComponent implements OnInit {
  frmEstadoInforme: FormGroup;
  estadoInforme: EstadoInformeModel;
  estadosInforme: EstadoInformeModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private estadosInformeService: EstadosInformeService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmEstadoInforme = this.formBuilder.group({
      nombre: [this.estadoInforme.nombre ? this.estadoInforme.nombre : null, Validators.required],
      estado_siguiente: [this.estadoInforme.estado_siguiente ? this.estadoInforme.estado_siguiente : null],
      final: this.estadoInforme.final
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
    this.estadosInformeService.post(this.frmEstadoInforme.value).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const estadoInforme = Object.assign(this.estadoInforme, this.frmEstadoInforme.value);
    this.estadosInformeService.put(estadoInforme._id, estadoInforme).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compare(val1: EstadoInformeModel, val2: EstadoInformeModel): boolean {
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
  }
}
