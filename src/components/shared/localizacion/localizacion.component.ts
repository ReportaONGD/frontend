import { Component, Input, OnInit } from '@angular/core';
import { LocalizacionModel } from '../../../models/localizacion.model';
import { Common } from '../../../providers/common/common';
import { LocalizacionService } from '../../../providers/catalogos/localizacion.service';

@Component({
  selector: 'app-localizaciones-combo-component',
  templateUrl: './localizacion.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [LocalizacionService, Common]
})
export class LocalizacionComboComponent implements OnInit {
  @Input() item: any;
  @Input() isRequired: boolean;
  localizaciones: LocalizacionModel[];

  constructor(private service: LocalizacionService,
    private common: Common) {
    this.loadLocalizaciones();
  }

  ngOnInit() {
  }

  loadLocalizaciones() {
    this.service.all().subscribe(resp => {
      this.localizaciones = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: LocalizacionModel, c2: LocalizacionModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
