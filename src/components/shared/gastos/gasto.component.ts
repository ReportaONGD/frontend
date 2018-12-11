import { Component, Input, OnInit } from '@angular/core';
import { GastoModel } from '../../../models/gasto.model';
import { GastosService } from '../../../providers/proyecto/gastos/gastos.service';
import { Common } from '../../../providers/common/common';
import { ParamsModel } from '../../../models/params.model';

@Component({
  selector: 'app-gasto-component',
  templateUrl: './gasto.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [GastosService, Common]
})
export class GastosComponent implements OnInit {
  @Input() item: any;
  @Input() isMultiple: boolean;
  @Input() gastos: GastoModel[];
  @Input() ids: ParamsModel;

  constructor(private service: GastosService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.gastos) {
      this.loadGastos();
    }
  }

  loadGastos() {
    this.service.ids = this.ids;
    this.service.all().subscribe((resp) => {
      this.gastos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: GastoModel, c2: GastoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
