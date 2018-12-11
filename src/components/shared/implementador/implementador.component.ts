import { AgenteModel } from './../../../models/agente.model';
import { Component, Input, OnInit } from '@angular/core';
import { ImplementadorModel } from '../../../models/implementador.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { ImplementadorService } from '../../../providers/catalogos/implementador.service';
import { SocioLocalService } from '../../../providers/catalogos/socio_local.service';

@Component({
  selector: 'app-implementador-combo-component',
  templateUrl: './implementador.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [ImplementadorService, SocioLocalService, Common]
})
export class ImplementadorComboComponent implements OnInit {
  @Input() item: any;
  @Input() isMultiple: boolean;
  @Input() etiqueta = 'Implementador';
  @Input() nombreControl = 'implementador';
  @Input() socio: boolean;

  // @Input() ids: ParamsModel;
  // implementadores: ImplementadorModel[] = Array<ImplementadorModel>();
  @Input() implementadores: any;

  constructor(private service: ImplementadorService,
    private socioService: SocioLocalService,
    private common: Common) {
  }

  ngOnInit() {

    if (!this.implementadores) {
      if (this.socio) {
        this.loadSocios();
      }else {
        this.loadImplementadores();
      }
    }
    // if (this.ids) {
      // this.service.ids = this.ids;
      // this.loadImplementadores();
    // }
  }

  loadImplementadores() {
    this.service.all().subscribe((resp) => {
      this.implementadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  loadSocios() {
    this.socioService.all().subscribe((resp) => {
      this.implementadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: AgenteModel, c2: AgenteModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
