import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-resumen-proveedor-component',
  templateUrl: './resumen_proveedor.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common]
})
export class ResumenProveedorComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  totalsProveedores: {};
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get keysProveedor(): Array<string> { return Object.keys(this.totalsProveedores) as Array<string>; }
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
        this.setTotalsProveedor();
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }
  private setTotalsProveedor() {
    const totals = {};
    this.proyecto.gastos.forEach(function (element) {
        totals[element.emisor] = totals[element.emisor] || [];
        totals[element.emisor].push({ importe: element.importe_local });
    });
    if (totals) {
        this.totalsProveedores = totals;
        this.showAlert.next(false);
    }
  }
}

