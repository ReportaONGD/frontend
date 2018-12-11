import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-resumen-presupuesto-component',
  templateUrl: './resumen_presupuesto.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ResumenPresupuestoComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  totalsPartidas: {};
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get keysPartidas(): Array<string> { return Object.keys(this.totalsPartidas) as Array<string>; }
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
        this.setTotalsPartidas();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }
  private setTotalsPartidas() {
    const totals = {};
    this.proyecto.presupuestos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[a.partida.codigo + '-' + a.partida.nombre] = totals[a.partida.codigo + '-' + a.partida.nombre] || [];
      totals[a.partida.codigo + '-' + a.partida.nombre].push({ importe: a.importe, moneda: a.moneda.codigo });
    });
    if (totals && Object.keys(totals).length > 0) {
        this.totalsPartidas = totals;
        this.showAlert.next(false);
    }
  }
}

