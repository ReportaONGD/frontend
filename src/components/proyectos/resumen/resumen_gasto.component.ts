import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { ResumenGastosModel } from '../../../models/resumen/resumen_gastos.model';


@Component({
  selector: 'app-resumen-gasto-component',
  templateUrl: './resumen_gasto.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ResumenGastoComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  totalsPartidasPresuepuestos: {};
  totalsPartidasGastos: {};
  resumen_gasto: BehaviorSubject<ResumenGastosModel[]>;
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get keysPartidasPresupuestos(): Array<string> { return Object.keys(this.totalsPartidasPresuepuestos) as Array<string>; }
  get keysPartidasGastos(): Array<string> { return Object.keys(this.totalsPartidasGastos) as Array<string>; }
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
        this.setTotalsPartidasPresupuesto();
        this.setTotalsPartidasGastos();
        this.createList();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }
  private setTotalsPartidasPresupuesto() {
    const totals = {};
    this.proyecto.presupuestos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[a.partida.codigo + '-' + a.partida.nombre] = totals[a.partida.codigo + '-' + a.partida.nombre] || [];
      totals[a.partida.codigo + '-' + a.partida.nombre].push({ importe: a.importe, moneda: a.moneda.codigo });
    });
    if (totals) {
        this.totalsPartidasPresuepuestos = totals;
        this.showAlert.next(false);
    }
  }

  private setTotalsPartidasGastos() {
    const totals = {};
    this.proyecto.gastos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[a.partida.codigo + '-' + a.partida.nombre] = totals[a.partida.codigo + '-' + a.partida.nombre] || [];
      totals[a.partida.codigo + '-' + a.partida.nombre].push({ importe: a.importe_local, moneda: a.moneda.codigo });
    });
    this.totalsPartidasGastos = totals;
  }

  private createList() {
    const keysP = [];
    const keysG = [];
    const resumen = [];
    let moneda = '';
    let valor = 0;
    this.keysPartidasGastos.forEach(key => {
      this.totalsPartidasGastos[key].forEach(element => {
          valor += element.importe;
          moneda = element.moneda;
      });
      keysP.push({partida: key, valor: `${valor}` , moneda: `${moneda}`});
    });
    this.keysPartidasPresupuestos.forEach(key => {
      this.totalsPartidasGastos[key].forEach(element => {
          valor += element.importe;
          moneda = element.moneda;
      });
      keysG.push({partida: key, valor: `${valor}` , moneda: `${moneda}`});
    });
    keysP.forEach((element, index) => {
      const item =  new ResumenGastosModel();
      const result = keysG.filter(e => e.partida === element.partida);
        item.partida = element.partida;
        item.presupuesto = result.length > 0 ? result[0].valor : 0;
        item.gasto = element.valor;
        item.pendiente = result.length > 0 ? (result[0].valor - element.valor) : 0;
        item.ejecutado = item.pendiente === 0 ? '100%' : ((element.valor * 100) / result[0].valor) + '%';
        if (result.length > 0) {
          keysG.splice(index, 1);
        }
      resumen.push(item);
    });
    if (keysG.length > 0) {
      keysG.forEach((element) => {
        const item =  new ResumenGastosModel();
        const result = keysP.filter(e => e.partida === element.partida);
        if (result.length === 0) {
          item.partida = element.partida;
          item.gasto = element.valor;
          item.presupuesto = 0;
          item.pendiente = -element.valor;
          item.ejecutado = '-';
          resumen.push(item);
        }
      });
    }
    this.resumen_gasto = new BehaviorSubject<ResumenGastosModel[]>(resumen);
  }
}



