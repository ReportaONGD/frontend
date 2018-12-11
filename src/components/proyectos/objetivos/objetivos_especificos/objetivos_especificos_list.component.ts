import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { ObjetivoEspecificoService } from '../../../../providers/proyecto/objetivo_especifico/objetivo_especifico.service';
import { AlertComponent, IAlert } from '../../../shared/alert/alert.component';
import { ParamsModel } from '../../../../models/params.model';
import { Common } from '../../../../providers/common/common';


@Component({
  selector: 'app-objetivos-especificos-list-component',
  templateUrl: './objetivos_especificos_list.component.html',
  styleUrls: ['../../proyectos.component.css'],
  providers: [ObjetivoEspecificoService, Common]
})
export class ObjetivosEspecificosListComponent implements OnInit {
  objetivos_especificos: Array<ObjetivoModel>;
  alert: IAlert;
  alertComponent = new AlertComponent();
  showAlert = false;
  objetivoEspecifico;

  @Input() ids: ParamsModel;
  @Output() selectObjetivo: EventEmitter<ObjetivoModel> = new EventEmitter<ObjetivoModel>();
  @Output() addResultado: EventEmitter<ObjetivoModel> = new EventEmitter<ObjetivoModel>();

  constructor(private service: ObjetivoEspecificoService,
    private common: Common) {
  }
  ngOnInit() {
    this.service.ids = this.ids;
    this.initialize();
  }

  initialize() {
    this.service.all().subscribe((resp) => {
      if (!resp || resp.length <= 0) {
        this.showAlert = true;
        this.alert = this.alertComponent.getAlert(3);
      } else {
        this.objetivos_especificos = resp;
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  add(event: Event, item: ObjetivoModel) {
    event.preventDefault();
    event.stopPropagation();
    this.addResultado.emit(item);
  }
  select(event: Event, item: ObjetivoModel) {
    event.preventDefault();
    event.stopPropagation();
    this.objetivoEspecifico = item;
    this.selectObjetivo.emit(item);
  }


}
