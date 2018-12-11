import { AgenteModel } from './../../../models/agente.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanciadorModel } from '../../../models/financiador.model';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-financiador-form-component',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  templateUrl: './financiador_form.component.html'
})
export class FinanciadorFormComponent implements OnInit {
  frmAgente: FormGroup;
  agente: AgenteModel;
  agentes: AgenteModel[];
  isNew: boolean;
  haySocioLocal: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: FinanciadorService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
    // this.haySocioLocal = false;
  }

  ngOnInit(): void {
    this.frmAgente = this.formBuilder.group({
      nombre: [this.agente.nombre || null, Validators.required],
      descripcion: [this.agente.descripcion || null, Validators.required],
      implementador: [this.agente.implementador || false, Validators.required],
      financiador: [this.agente.financiador || false, Validators.required],
      socio_local: [this.agente.socio_local || false, Validators.required],
      pais: [this.agente.pais || null, Validators.required],
      publico: [this.agente.publico || false, Validators.required]
    });
    this.service.all().subscribe(resp => {
      this.agentes = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });

    /* this.service.all().subscribe((resp) => {
      let nombre = '';
      resp.forEach(agente => {
          if ( agente.socio_local ) {
            this.haySocioLocal = agente.socio_local;
            nombre = agente.nombre;
          }
      });

      if (!this.isNew && (nombre === this.agente.nombre)) {
        this.haySocioLocal = false;
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }); */

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
    if (this.comprobarSiExiste(this.frmAgente.controls.nombre.value)) {
      this.service.post(this.frmAgente.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un agente con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const agente = Object.assign(this.agente, this.frmAgente.value);
    if (this.comprobarSiExiste(agente.nombre)) {
      this.service.put(agente._id, agente).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un agente con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

  comprobarSiExiste(valor) {
    const result = this.agentes.filter(cat => cat.nombre.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }
}
