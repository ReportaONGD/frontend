import { Component, Input, OnInit } from '@angular/core';
import { PartidaModel } from '../../../models/partida.model';
import { Common } from '../../../providers/common/common';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { ParamsModel } from '../../../models/params.model';

@Component({
  selector: 'app-partida-combo-component',
  templateUrl: './partida.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [PartidaService, Common]
})
export class PartidaComboComponent implements OnInit {
  @Input() item: any;
  @Input() isRequired: boolean;
  @Input() ids: ParamsModel;
  partidas: PartidaModel[] = Array<PartidaModel>();

  constructor(private service: PartidaService,
    private common: Common) {
  }

  ngOnInit() {
    this.service.ids = this.ids;
    this.loadPartidas();
  }

  loadPartidas() {
    this.service.all().subscribe((resp) => {
        this.partidas = resp.filter(p => p.es_padre === false);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: PartidaModel, c2: PartidaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
