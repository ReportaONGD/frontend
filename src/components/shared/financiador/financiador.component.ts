import { AgenteModel } from './../../../models/agente.model';
import { Component, Input, OnInit } from '@angular/core';
import { FinanciadorModel } from '../../../models/financiador.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-financiador-combo-component',
  templateUrl: './financiador.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [FinanciadorService, Common]
})
export class FinanciadorComboComponent implements OnInit {
  @Input() item: any;
  @Input() isMultiple: boolean;
  @Input() isAecid: BehaviorSubject<boolean>;
  // financiadores: FinanciadorModel[] = Array<FinanciadorModel>();
  @Input() financiadores: any;

  constructor(private service: FinanciadorService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.financiadores) {
      this.loadFinanciadores();
    }
    // if (this.ids) {
      // this.service.ids = this.ids;
    // }
  }

  loadFinanciadores() {
    this.service.all().subscribe((resp) => {
      this.financiadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: AgenteModel, c2: AgenteModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
