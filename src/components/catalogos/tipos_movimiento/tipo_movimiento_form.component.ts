import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-tipo-movimiento-form-component',
  templateUrl: './tipo_movimiento_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class TipoMovimientoFormComponent implements OnInit {
  frmTipoMovimiento: FormGroup;
  tipoMovimiento: TipoMovimientoModel;
  tipoMovimientos: TipoMovimientoModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tipoMovimientoService: TipoMovimientoService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmTipoMovimiento = this.formBuilder.group({
      valor: [this.tipoMovimiento.valor ? this.tipoMovimiento.valor : null, Validators.required],
      es_entrada: [this.tipoMovimiento.es_entrada ? this.tipoMovimiento.es_entrada : false],
      origen: [this.tipoMovimiento.origen ? this.tipoMovimiento.origen : false],
      destino: [this.tipoMovimiento.destino ? this.tipoMovimiento.destino : false],
      pago: [this.tipoMovimiento.pago ? this.tipoMovimiento.pago : false],
      cheque: [this.tipoMovimiento.cheque ? this.tipoMovimiento.cheque : false]
    });
    this.tipoMovimientoService.all().subscribe(resp => {
      this.tipoMovimientos = resp;
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
    if (this.comprobarSiExiste(this.frmTipoMovimiento.controls.valor.value)) {
      this.tipoMovimientoService.post(this.frmTipoMovimiento.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe un movimiento con ese nombre!', 'Error!', { timeOut: 3000 });
    }
  }

    update() {
      const tipoMovimiento = Object.assign(this.tipoMovimiento, this.frmTipoMovimiento.value);
      if (this.comprobarSiExiste(tipoMovimiento.valor)) {
        this.tipoMovimientoService.put(tipoMovimiento._id, tipoMovimiento).subscribe((resp) => {
          this.onClose(true);
        }, (err) => {
          this.common.handlerResponse(err.value || err);
        });
      } else {
        this.common.toastr.error('Ya existe un movimiento con ese nombre!', 'Error!', { timeOut: 3000 });
      }
  }

  comprobarSiExiste(valor) {
    const result = this.tipoMovimientos.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }
}
