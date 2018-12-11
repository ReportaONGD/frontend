import { Component, Input, OnInit } from '@angular/core';
import { MonedaModel } from '../../../models/moneda.model';
import { Common } from '../../../providers/common/common';
import { MonedaService } from '../../../providers/catalogos/moneda.service';

@Component({
  selector: 'app-moneda-component',
  templateUrl: './moneda.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [MonedaService, Common]
})
export class MonedaComponent implements OnInit {
  @Input() item: any;
  @Input() isRequired: boolean;
  @Input() monedas: MonedaModel[];

  constructor(private service: MonedaService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.monedas) {
      this.loadMonedas();
    }
  }

  loadMonedas() {
    this.service.all().subscribe(resp => {
      this.monedas = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: MonedaModel, c2: MonedaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
