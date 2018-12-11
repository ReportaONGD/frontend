import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtapaValidacionModel } from '../../../models/etapa_validacion.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { ParamsModel } from '../../../models/params.model';
import { ValidacionService } from '../../../providers/proyecto/validaciones/validacion.service';


@Component({
  selector: 'app-validacion-etapa-component',
  templateUrl: './validacion_etapa.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, ValidacionService, Common]
})
export class ValidacionEtapaComponent implements OnInit {
  proyecto: ProyectoModel = new ProyectoModel();
  etapas_validacion: EtapaValidacionModel;
  // Este atributo se usa en los servicios para resolver los id de las entidades
  ids: ParamsModel;

  constructor(private common: Common,
    private proyectoService: ProyectoService,
    private validacionService: ValidacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
      });
    }
    this.validacionService.ids = this.ids;
    this.initialize();
  }

  initialize() {
    this.validacionService.all().subscribe((resp) => {
      this.etapas_validacion = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  setStyle() {

  }

  goTo() {

  }
}
