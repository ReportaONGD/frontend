import { Component, Input, OnInit } from '@angular/core';
import { PaisModel } from '../../../models/pais.model';
import { PaisService } from '../../../providers/catalogos/pais.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-paises-component',
  templateUrl: './pais.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [PaisService, Common]
})
export class PaisComponent implements OnInit {
  @Input() item: any;
  @Input() isMultiple: boolean;
  @Input() paises: PaisModel[];

  constructor(private service: PaisService,
    private common: Common) {
  }

  ngOnInit() {
    if (!this.paises) {
      this.loadPaises();
    }
  }

  loadPaises() {
    this.service.all().subscribe(resp => {
      this.paises = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: PaisModel, c2: PaisModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
