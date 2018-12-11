import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { CuentaBancariaService } from '../../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';

@Component({
  selector: 'app-cuenta-combo-component',
  templateUrl: './cuenta.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [CuentaBancariaService, Common]
})
export class CuentaComboComponent implements OnInit {
  @Input() item: any;
  @Input() cuentas: any;
  @Input() controlLabel: any;
  @Input() controlName: any;
  @Input() ids: ParamsModel;
  @Output() valueChange = new EventEmitter();
  constructor(private service: CuentaBancariaService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.cuentas) {
      this.service.ids = this.ids;
      this.loadCuentas();
    }
  }

  loadCuentas() {
    this.service.all().subscribe(resp => {
      this.cuentas = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: CuentaBancariaModel, c2: CuentaBancariaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

}
