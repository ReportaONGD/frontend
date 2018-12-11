import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProyectoModel } from '../../../models/proyecto.model';
import { ResumenCajaModel } from '../../../models/resumen/resumen_caja.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';


@Component({
  selector: 'app-resumen-caja-component',
  templateUrl: './resumen_caja.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ResumenCajaComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  totales: any;
  resumen_cuentas: BehaviorSubject<ResumenCajaModel[]>;
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private common: Common,
    private service: ProyectoService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this._id = params['id'];
      this.initialize();
    });
  }

  initialize() {
    this.service.get(this._id).subscribe((resp) => {
      this.proyecto = new ProyectoModel(resp);
      if (this.proyecto.cuentas_bancarias && this.proyecto.cuentas_bancarias.length > 0) {
        this.loadResumenCuentas();
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => { this.isLoading = false; });
  }

  loadResumenCuentas() {
    const resumen = [];
    this.proyecto.cuentas_bancarias.forEach((cb) => {
      const item = new ResumenCajaModel();
      item.ncuenta = cb.ncuenta;
      cb.operaciones_bancarias.forEach((ob) => {
        item.concepto.push(ob.concepto);
        item.tipo.push(ob.tipo_movimiento);
        item.importe.push(ob.importe);
      });
      resumen.push(item);
    });
    this.resumen_cuentas = new BehaviorSubject<ResumenCajaModel[]>(resumen);
    this.setTotales();
  }

  setTotales() {
    let totalIngresos = 0;
    let totalRetiradas = 0;
    let saldoActual = 0;
    this.totales = [];
    this.resumen_cuentas.getValue().forEach((cuenta) => {
      cuenta.tipo.forEach((t, index) => {
        if (t.es_entrada) {
          totalIngresos += cuenta.importe[index];
        } else {
          totalRetiradas += cuenta.importe[index];
        }
      });
      saldoActual = totalIngresos - totalRetiradas;
      this.totales.push({
        ncuenta: cuenta.ncuenta,
        totalIngresos: totalIngresos,
        totalRetiradas: totalRetiradas,
        saldoActual: saldoActual
      });
      totalIngresos = 0;
      totalRetiradas = 0;
      saldoActual = 0;
    });
  }
}



