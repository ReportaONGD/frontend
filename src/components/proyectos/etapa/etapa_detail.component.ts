import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EtapaModel } from '../../../models/etapa.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { EtapaService } from '../../../providers/proyecto/etapas/etapa.service';
import { DateDiffValidator } from '../../../validators/date_diff.validator';


@Component({
  selector: 'app-etapa-detail-component',
  templateUrl: './etapa_detail.component.html'
})
export class EtapaDetailComponent implements OnInit {
  frmEtapa: FormGroup;
  etapa: EtapaModel;
  isNew: boolean;
  ids: ParamsModel;
  constructor(
    private formBuilder: FormBuilder,
    private service: EtapaService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.service.ids = this.ids;
    this.frmEtapa = this.formBuilder.group({
      nombre: [this.etapa.nombre ? this.etapa.nombre : null, Validators.required],
      descripcion: [this.etapa.descripcion ? this.etapa.descripcion : null],
      _fecha_inicio: [this.etapa._fecha_inicio ? this.etapa._fecha_inicio : null, Validators.required],
      _fecha_fin: [this.etapa._fecha_fin ? this.etapa._fecha_fin : null, Validators.required]
    }, { validator: DateDiffValidator.dateLessThan(null, 'fecha_inicio', 'fecha_fin', { 'datediff': true }) });
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
    const etapa = new EtapaModel(this.frmEtapa.value);
    this.service.post(etapa).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const etapa = new EtapaModel(Object.assign(this.etapa, this.frmEtapa.value));
    this.service.put(etapa._id, etapa).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
