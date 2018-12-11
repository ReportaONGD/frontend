import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-resumen-tesoreria-component',
  templateUrl: './resumen_tesoreria.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ResumenTesoreriaComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  totalsFinanciador: {};
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get keysFinanciador(): Array<string> { return Object.keys(this.totalsFinanciador) as Array<string>; }
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
        this.setTotalsFinanciador();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      }, () => { this.isLoading = false; });
  }
  private setTotalsFinanciador() {
    const totals = {};
    this.proyecto.cuentas_bancarias.forEach(function (cc) {
        cc.operaciones_bancarias.forEach(element => {
            totals[element.tipo_movimiento.valor + '-' + element.financiador.nombre]
            = totals[element.tipo_movimiento.valor + '-' + element.financiador.nombre] || [];
            totals[element.tipo_movimiento.valor + '-' + element.financiador.nombre].push({ importe: element.importe });
        });
    });
    if (totals) {
        this.totalsFinanciador = totals;
        this.showAlert.next(false);
    }
  }
}

