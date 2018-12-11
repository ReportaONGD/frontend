import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ParamsModel } from '../../../models/params.model';
import { PeriodoModel } from '../../../models/periodo.model';
import { TipoPeriodoModel } from '../../../models/tipo_periodo.model';
import { Common } from '../../../providers/common/common';
import { PeriodoService } from '../../../providers/proyecto/periodo/periodo.service';
import { TipoPeriodoService } from '../../../providers/proyecto/tipo_periodo/tipo_periodo.service';
import { DateDiffValidator } from '../../../validators/date_diff.validator';


@Component({
  selector: 'app-periodo-detail-component',
  templateUrl: './periodo_detail.component.html',
  providers: [TipoPeriodoService, PeriodoService]
})
export class PeriodoDetailComponent implements OnInit {
  frmPeriodo: FormGroup;
  periodo: PeriodoModel;
  isNewPeriodo: boolean;
  ids: ParamsModel;
  tipos_periodo: TipoPeriodoModel[];

  constructor(
    private formBuilder: FormBuilder,
    private service: PeriodoService,
    private tipoPeriodoService: TipoPeriodoService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNewPeriodo = false;
  }

  ngOnInit(): void {
    this.service.ids = this.ids;

    this.loadTipoPeriodo();
    this.frmPeriodo = this.formBuilder.group({
      nombre: [this.periodo.nombre ? this.periodo.nombre : null, Validators.required],
      tipo_periodo: [this.periodo.tipo_periodo ? this.periodo.tipo_periodo : null, Validators.required],
      _fecha_inicio: [this.periodo._fecha_inicio ? this.periodo._fecha_inicio : null, Validators.required],
      _fecha_fin: [this.periodo._fecha_fin ? this.periodo._fecha_fin : null, Validators.required]
    }, { validator: DateDiffValidator.dateLessThan(null, 'fecha_inicio', 'fecha_fin', { 'datediff': true }) });
  }

  onSubmitPeriodo() {
    if (this.isNewPeriodo) {
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
    const periodo = new PeriodoModel(this.frmPeriodo.value);
    this.service.post(periodo).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const periodo = Object.assign(this.periodo, this.frmPeriodo.value);
    this.service.put(periodo._id, periodo).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: TipoPeriodoModel, c2: TipoPeriodoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  private loadTipoPeriodo() {
    this.tipoPeriodoService.all().subscribe((resp) => {
      this.tipos_periodo = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
