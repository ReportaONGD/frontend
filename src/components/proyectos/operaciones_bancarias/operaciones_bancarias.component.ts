import { AgenteModel } from './../../../models/agente.model';
import { CuentaBancariaService } from './../../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';
import { FinanciadorModel } from '../../../models/financiador.model';
import { GastoModel } from '../../../models/gasto.model';
import { OperacionBancariaModel } from '../../../models/operacion_bancaria.model';
import { ParamsModel } from '../../../models/params.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProyectoModel } from '../../../models/proyecto.model';
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { OperacionBancariaService } from '../../../providers/proyecto/cuenta_bancaria/operacion_bancaria/operacion_bancaria.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';

@Component({
  selector: 'app-operacion-bancaria-component',
  templateUrl: './operaciones_bancarias.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [OperacionBancariaService, FinanciadorService,
     CuentaBancariaService, TipoMovimientoService, Common, NgbCumstonDateParserFormatter],
  entryComponents: [Confirm2Component]
})
export class OperacionBancariaComponent implements OnInit, OnChanges {
  // @Input() cuenta: CuentaBancariaModel;
  @Input() ids: ParamsModel;
  frmOperacionBancaria: FormGroup;
  showForm = false;
  isNew = false;
  financiadores: AgenteModel[];
  tipos_movimiento: TipoMovimientoModel[];
  showAlertCuentaBancaria: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  operaciones_bancarias: OperacionBancariaModel[];
  operacion_bancaria: OperacionBancariaModel;
  importeFormateado: string[];
  proyecto: ProyectoModel;
  isEjecucion = false;
  controlesInactivos = [];
  hay_destino = false;
  moneda_origen: string;
  moneda_destino: string;
  tasa_cambio: string;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private operacionService: OperacionBancariaService,
    private tipoMovimientoService: TipoMovimientoService,
    private proyectoService: ProyectoService,
    private cuentaProvider: CuentaBancariaService,
    private route: ActivatedRoute,
    private router: Router,
    private ds: NgbCumstonDateParserFormatter
  ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.operacionService.ids = this.ids;
      });
    }
    this.frmOperacionBancaria = this.formBuilder.group({
      fecha: [null, Validators.required],
      fecha_destino: [null],
      financiador: [null, Validators.required],
      tipo_movimiento: [null, Validators.required],
      importe: [null, Validators.required],
      importe_enviado: [null],
      concepto: [null],
      cuenta_origen: [null, Validators.required],
      cuenta_destino: [null],
      gastos: [null],
      tasa_cambio: [null],
      num_cheque: [null]
    });
    this.frmOperacionBancaria.controls.tipo_movimiento.valueChanges.subscribe((value) => {
      if (value) {
        this.hay_destino = value.destino;
        this.comprobarDestino();
      }
    });
    this.frmOperacionBancaria.controls.cuenta_origen.valueChanges.subscribe((value) => {
      if (value) {
        this.moneda_origen = value.moneda.codigo;
      }
    });
    this.frmOperacionBancaria.controls.cuenta_destino.valueChanges.subscribe((value) => {
      if (value) {
        this.moneda_destino = value.moneda.codigo;
      }
    });
    this.loadTiposMovimiento();
    this.loadCuentas();
    this.initialize();
  }

  ngOnChanges(change: SimpleChanges) {
    if (!change.ids.isFirstChange()) {
      this.ngOnInit();
    }
  }

  initialize() {
    this.isNew = false;
    this.showForm = false;
    this.moneda_origen = '';
    this.moneda_destino = '';
    this.importeFormateado = new Array<string>();
    this.operaciones_bancarias = new Array<OperacionBancariaModel>();
    this.operacionService.all().subscribe((resp) => {
      // this.operaciones_bancarias = resp;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const importe = Utils.formatMoney(element.importe);
        this.importeFormateado.push(importe);
        this.operaciones_bancarias.push(element);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });

    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.isEjecucion = resp.validateProjectState();
      // this.accionElementosXEstado();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  add() {
    this.operacion_bancaria = new OperacionBancariaModel();
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = true;
  }

  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.edit();
    }
  }

  onEditOB(item) {
    this.operacion_bancaria = item;
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = false;
    this.calcularTasa();
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Operaciones Bancarias';
    // tslint:disable-next-line:max-line-length
    modalRef.componentInstance.message = `¿Desea eliminar la operación bancaria con fecha proveedor ${this.ds.format(item.fecha)} y financiador ${item.financiador.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  private comprobarDestino() {
    if (!this.hay_destino) {
      this.frmOperacionBancaria.controls.fecha_destino.setValue(null);
      this.frmOperacionBancaria.controls.cuenta_destino.setValue(null);
      this.frmOperacionBancaria.controls.importe_enviado.setValue(null);
      this.tasa_cambio = '';
    }
  }

  create() {
    this.comprobarDestino();
    const operacion_bancaria = new OperacionBancariaModel(this.frmOperacionBancaria.value);
    this.operacionService.post(operacion_bancaria).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    this.comprobarDestino();
    const operacion_bancaria = new OperacionBancariaModel(Object.assign(this.operacion_bancaria, this.frmOperacionBancaria.value));
    this.operacionService.put(operacion_bancaria._id, operacion_bancaria).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(operacion_bancaria) {
    this.operacionService.delete(operacion_bancaria._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.operaciones_bancarias && this.operaciones_bancarias.length === 0;
  }

  private loadCuentas() {
    this.cuentaProvider.ids = this.ids;
    this.cuentaProvider.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertCuentaBancaria.next(false);
      } else {
        this.showAlertCuentaBancaria.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private goTo() {
    this.router.navigate(['proyectos', this.ids.proyecto_id, 'edit', 'cuentas-bancarias']);
  }

  compareTipoMovimientoFn(c1: TipoMovimientoModel, c2: TipoMovimientoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  goToCuentasBancarias() {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'cuentas_bancarias']);
  }

  private loadTiposMovimiento() {
    this.tipoMovimientoService.all().subscribe((resp) => {
      this.tipos_movimiento = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private generateForm() {
    this.frmOperacionBancaria.patchValue(this.operacion_bancaria);
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmOperacionBancaria, this.controlesInactivos, this.isEjecucion);
  }

  calcularTasa() {
    if ((this.moneda_origen === this.moneda_destino) && this.frmOperacionBancaria.controls.importe_enviado.value) {
      const importeTotal = this.frmOperacionBancaria.controls.importe_enviado.value;
      const importe = this.frmOperacionBancaria.controls.importe.value;
      // let tasa = ((importeTotal - importe) / 100);
      // if (tasa < 0) {
      //   tasa = (tasa * -1);
      // }
      const tasa = importeTotal / importe;

      // this.tasa_cambio = tasa + '%';
      this.tasa_cambio = tasa.toString() ;
    }
  }

}
