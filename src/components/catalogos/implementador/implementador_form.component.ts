import { AgenteModel } from './../../../models/agente.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImplementadorModel } from '../../../models/implementador.model';
import { ImplementadorService } from '../../../providers/catalogos/implementador.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-implementador-form-component',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  templateUrl: './implementador_form.component.html'
})
export class ImplementadorFormComponent implements OnInit {
  frmImplementador: FormGroup;
  implementador: AgenteModel;
  isNew: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: ImplementadorService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmImplementador = this.formBuilder.group({
      nombre: [this.implementador.nombre ? this.implementador.nombre : null, Validators.required],
      descripcion: [this.implementador.descripcion ? this.implementador.descripcion : null, Validators.required],
      pais: [this.implementador.pais ? this.implementador.pais : null, Validators.required],
      publico: [this.implementador.publico ? this.implementador.publico : null, Validators.required]
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
    this.service.post(this.frmImplementador.value).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const categoria = Object.assign(this.implementador, this.frmImplementador.value);
    this.service.put(categoria._id, categoria).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
