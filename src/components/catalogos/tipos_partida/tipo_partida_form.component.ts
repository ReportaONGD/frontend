import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPartidaModel } from '../../../models/tipo_partida.model';
import { TipoPartidaService } from '../../../providers/catalogos/tipo_partida.service';
import { CostesService } from '../../../providers/catalogos/costes.service';
import { Common } from '../../../providers/common/common';
import { CostesModel } from '../../../models/costes.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-tipo-partida-form-component',
  templateUrl: './tipo_partida_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [TipoPartidaService, CostesService, Common]
})
export class TipoPartidaFormComponent implements OnInit {
  frmTipoPartida: FormGroup;
  tipoPartida: TipoPartidaModel;
  isNew: boolean;
  costes: BehaviorSubject<CostesModel[]>;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tipoPartidaService: TipoPartidaService,
    private costesService: CostesService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.getCostes();
    this.frmTipoPartida = this.formBuilder.group({
      codigo: [this.tipoPartida.codigo ? this.tipoPartida.codigo : null, Validators.required],
      nombre: [this.tipoPartida.nombre ? this.tipoPartida.nombre : null, Validators.required],
      costes:  [this.tipoPartida.costes, Validators.required]
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
    this.tipoPartidaService.post(this.frmTipoPartida.value).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const tipoPartida = Object.assign(this.tipoPartida, this.frmTipoPartida.value);
    this.tipoPartidaService.put(tipoPartida._id, tipoPartida).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: CostesModel, c2: CostesModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  private getCostes() {
    this.costesService.all().subscribe((resp) => {
      this.costes = new BehaviorSubject<CostesModel[]>(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
