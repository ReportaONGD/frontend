import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbCheckBox } from '@ng-bootstrap/ng-bootstrap';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap/buttons/label';
import { EstadoProyectoModel } from '../../../models/estado_proyecto.model';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-estados-proyecto-form-component',
  templateUrl: './estados_proyecto_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [NgbCheckBox, NgbButtonLabel]
})
export class EstadosProyectoFormComponent implements OnInit {
  frmEstadoProyecto: FormGroup;
  estadoProyecto: EstadoProyectoModel;
  estadosProyecto: EstadoProyectoModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private estadosProyectoService: EstadosProyectoService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmEstadoProyecto = this.formBuilder.group({
      id: [this.estadoProyecto._id ? this.estadoProyecto._id : null],
      nombre: [this.estadoProyecto.nombre ? this.estadoProyecto.nombre : null, Validators.required],
      estado_anterior: [this.estadoProyecto.estado_anterior ? this.estadoProyecto.estado_anterior : null],
      final: this.estadoProyecto.final
    });
    this.estadosProyectoService.all().subscribe(resp => {
      this.estadosProyecto = resp;
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
    if (this.comprobarSiExiste(this.frmEstadoProyecto.controls.nombre.value)) {
      this.estadosProyectoService.post(this.frmEstadoProyecto.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un estado con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const estadoProyecto = Object.assign(this.estadoProyecto, this.frmEstadoProyecto.value);
    if (this.comprobarSiExiste(estadoProyecto.nombre)) {
      this.estadosProyectoService.put(estadoProyecto._id, estadoProyecto).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un tipo de valoración con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  compare(val1: EstadoProyectoModel, val2: EstadoProyectoModel): boolean {
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
  }

  comprobarSiExiste(valor) {
    const result = this.estadosProyecto.filter(cat => cat.nombre.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }
}
