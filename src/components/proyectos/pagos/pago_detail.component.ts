import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PagoModel } from '../../../models/pago.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { PagoService } from '../../../providers/proyecto/pagos/pago.service';


@Component({
  selector: 'app-pago-detail-component',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  templateUrl: './pago_detail.component.html'
})
export class PagoDetailComponent implements OnInit {
  frmPago: FormGroup;
  pago: PagoModel;
  isNew: boolean;
  ids: ParamsModel;
  proyecto: ProyectoModel;
  moneda_origen: string;
  moneda_destino: string;
  tipos_movimiento: TipoMovimientoModel[];
  origen: boolean;
  destino: boolean;
  cheque: boolean;
  hay_destino = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: PagoService,
    private tipoMovimientoService: TipoMovimientoService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.service.ids = this.ids;
    this.loadTiposMovimiento();
    this.initialize();
  }

  initialize() {
    this.frmPago = this.formBuilder.group({
      concepto: [this.pago.concepto ? this.pago.concepto : null, Validators.required],
      num_cheque: [this.pago.num_cheque ? this.pago.num_cheque : null],
      _fecha: [this.pago._fecha ? this.pago._fecha : null, Validators.required],
      importe: [this.pago.importe ? this.pago.importe : null, Validators.required],
      importe_enviado: [this.pago.importe_enviado ? this.pago.importe_enviado : null],
      tipo_movimiento: [this.pago.tipo_movimiento ? this.pago.tipo_movimiento : null, Validators.required],
      cuenta_origen: [this.pago.cuenta_origen ? this.pago.cuenta_origen : null, Validators.required],
      cuenta_destino: [this.pago.cuenta_destino ? this.pago.cuenta_destino : null]
    });
    if (this.pago.cuenta_origen) {
      this.moneda_origen = this.pago.cuenta_origen.moneda.codigo;
    }
    if (this.pago.cuenta_destino) {
      this.moneda_destino = this.pago.cuenta_destino.moneda.codigo;
    }
    if (this.pago.tipo_movimiento) {
      this.hay_destino = this.pago.tipo_movimiento.destino;
    }

    this.frmPago.controls['cuenta_origen'].valueChanges.subscribe((value) => {
      if (value) {
        this.moneda_origen = value.moneda.codigo;
      }
    });

    this.frmPago.controls['cuenta_destino'].valueChanges.subscribe((value) => {
      if (value) {
        this.moneda_destino = value.moneda.codigo;
      }
    });

    this.frmPago.controls['tipo_movimiento'].valueChanges.subscribe((value) => {
      if (value) {
        this.hay_destino = value.destino;
        this.comprobarDestino();

        this.pago = value.pago;
        this.origen = value.origen;
        this.destino = value.destino;
        this.cheque = value.cheque;
      }
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
    this.comprobarDestino();
    const pago = new PagoModel(this.frmPago.value);
    this.service.post(pago).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    this.comprobarDestino();
    const pago = new PagoModel(Object.assign(this.pago, this.frmPago.value));
    this.service.put(pago._id, pago).subscribe((resp) => {
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareTipoMovimientoFn(c1: TipoMovimientoModel, c2: TipoMovimientoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  private comprobarDestino() {
    if (!this.hay_destino) {
      this.frmPago.controls.cuenta_destino.setValue(null);
      this.frmPago.controls.importe_enviado.setValue(null);
    }
  }

  private loadTiposMovimiento() {
    this.tipoMovimientoService.all().subscribe((resp) => {
      this.tipos_movimiento = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
