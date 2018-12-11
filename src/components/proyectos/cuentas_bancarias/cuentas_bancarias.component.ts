import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { CuentaBancariaService } from '../../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';



@Component({
  selector: 'app-cuentas-bancarias-component',
  templateUrl: './cuentas_bancarias.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [CuentaBancariaService, ProyectoService, Common],
  entryComponents: [Confirm2Component]
})
export class CuentasBancariasComponent implements OnInit, OnDestroy {
  frmCuenta: FormGroup;
  showForm = false;
  isNew = false;
  isEjecucion = false;
  proyecto: ProyectoModel = new ProyectoModel();
  cuenta: CuentaBancariaModel;
  showOperaciones: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // Este atributo se usa en los servicios para resolver los id de las entidades
  ids: ParamsModel;
  controlesInactivos = [];

  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private cuentaBancariaService: CuentaBancariaService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.cuenta = new CuentaBancariaModel();
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.cuentaBancariaService.ids = this.ids;
      });
    }
    this.initialize();
  }

  ngOnDestroy() {

  }

  initialize() {
    this.isNew = false;
    this.showForm = false;

    this.frmCuenta = this.formBuilder.group({
      entidad: [this.cuenta.entidad || '', Validators.required],
      ncuenta: [this.cuenta.ncuenta || '', Validators.required],
      pais: [this.cuenta.pais || '', Validators.required],
      moneda: [this.cuenta.moneda || '', Validators.required],
      localizacion: [this.cuenta.localizacion || '', Validators.required]
    });

    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.isEjecucion = this.proyecto.validateProjectState();
      this.accionElementosXEstado();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addNewCuenta() {
    this.cuenta = new CuentaBancariaModel();
    this.initialize();
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

  editCuenta(item) {
    this.cuenta = item;
    this.frmCuenta.patchValue(this.cuenta);
    this.showForm = !this.showForm;
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      cuenta_bancaria_id: item._id
    });
    // this.ids.cuenta_bancaria_id = item._id;
    this.isNew = false;
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Cuenta Bancaria';
    modalRef.componentInstance.message = `¿Desea eliminar la Cuenta Bancaria de la entidad ${item.entidad} y nº de cuenta ${item.ncuenta}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  selectCC(item: CuentaBancariaModel) {
    this.showOperaciones.next(true);
    this.cuenta = item;
  }
  create() {
    const cuenta = Object.assign(this.cuenta, this.frmCuenta.value);
    this.cuentaBancariaService.post(cuenta).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const cuenta = Object.assign(this.cuenta, this.frmCuenta.value);
    this.cuentaBancariaService.put(this.cuenta._id, cuenta).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(cuenta_bancaria) {
    this.cuentaBancariaService.delete(cuenta_bancaria._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.proyecto.cuentas_bancarias && this.proyecto.cuentas_bancarias.length === 0;
  }

  showMovimientos(item) {
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      cuenta_bancaria_id: item._id
    });
    this.cuenta = item;
  }
  /**
  * Cancela la edicion de una cuenta
  */
  cancel() {
    this.cuenta = new CuentaBancariaModel();
    this.initialize();
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmCuenta, this.controlesInactivos, this.isEjecucion);
  }
}
