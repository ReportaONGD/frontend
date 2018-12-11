import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaisModel } from '../../../models/pais.model';
import { PresupuestoModel } from '../../../models/presupuesto.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { PresupuestoService } from '../../../providers/proyecto/presupuesto/presupuesto.service';


@Component({
  selector: 'app-presupuesto-inicial-detail-component',
  templateUrl: './presupuesto_inicial_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, PresupuestoService, Common]
})
export class PresupuestoInicialDetailComponent implements OnInit {
  ids: ParamsModel;
  frmPresupuesto: FormGroup;
  presupuesto: PresupuestoModel;
  paises: PaisModel[];
  proyecto: ProyectoModel;
  title: string;
  constructor(private formBuilder: FormBuilder,
    private presupuestoService: PresupuestoService,
    private common: Common,
    private activeModal: NgbActiveModal) {
    this.frmPresupuesto = this.formBuilder.group({
      concepto: [null, Validators.required],
      observaciones: [null, Validators.required],
      importe: [null, Validators.required],
      etapa: [null, Validators.required],
      actividad: [null, Validators.required],
      financiador: [null, Validators.required],
      implementador: [null, Validators.required],
      pais: [null, Validators.required],
      moneda: [null, Validators.required],
      partida: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.presupuestoService.ids = this.ids;
    this.initialize();
    this.generateForm();
  }

  initialize() {
    this.loadPaises();
  }

  loadPaises() {
    this.paises = this.proyecto.pais;
  }

  onSubmit() {
    if (!this.getPresupuestoId()) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    this.presupuestoService.post(this.frmPresupuesto.value).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const presupuesto = Object.assign(this.presupuesto, this.frmPresupuesto.value);
    this.presupuestoService.put(presupuesto._id, presupuesto).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  close() {
    this.activeModal.close(true);
  }

  private generateForm() {
    this.frmPresupuesto.patchValue(this.presupuesto);
  }

  private getPresupuestoId(): string {
    return this.presupuesto._id;
  }
}

