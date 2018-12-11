import { Component, Input, OnInit } from '@angular/core';
import { EtapaModel } from '../../../models/etapa.model';
import { EtapaService } from '../../../providers/proyecto/etapas/etapa.service';
import { Common } from '../../../providers/common/common';
import { ParamsModel } from '../../../models/params.model';

@Component({
  selector: 'app-etapa-combo-component',
  templateUrl: './etapa.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [EtapaService, Common]
})
export class EtapaComboComponent implements OnInit {
  @Input() item: any;
  @Input() etapas: any;
  @Input() ids: ParamsModel;
  constructor(private service: EtapaService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.etapas) {
      this.service.ids = this.ids;
      this.loadEtapas();
    }
  }

  loadEtapas() {
    this.service.all().subscribe(resp => {
      this.etapas = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: EtapaModel, c2: EtapaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
