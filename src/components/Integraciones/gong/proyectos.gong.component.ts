import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { ImplementadorService } from '../../../providers/catalogos/implementador.service';
import { Common } from '../../../providers/common/common';
import { ANIMATION_TYPES } from 'ngx-loading';
import { ProyectoGongService } from '../../../providers/integraciones/gong/proyecto.gong.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';


@Component({
  selector: 'app-gong-project-component',
  templateUrl: './proyectos.gong.component.html',
  styleUrls: ['./proyectos.gong.component.css'],
  providers: [ProyectoService, ImplementadorService, FinanciadorService, Common],
  entryComponents: [Confirm2Component]
})
export class ProyectosGongComponent implements OnInit {
  proyectos = [];
  filter = { codigo: '', nombre: '', fecha_inicio: null, fecha_fin: null, coste: null };
  isLoading = false;
  config: any;

  constructor(
    private gongProvider: ProyectoGongService,
    private router: Router,
    private common: Common
  ) {
    this.config = {
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'red',
      secondaryColour: 'blue',
      tertiaryColour: 'green'
    };
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.gongProvider.all().subscribe((resp) => {
      this.proyectos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  importar(proyecto) {
    this.isLoading = true;
    this.gongProvider.importar(proyecto).subscribe((resp) => {
      this.proyectos = resp;
      console.log('OK!!!!!');
      this.isLoading = false;
      this.common.toastr.success('Archivo exportado!', 'Success!', { timeOut: 3000 });
      this.router.navigate(['/proyectos']);
    }, (err) => {
      this.isLoading = false;
      if (err.value.error.error) {
        this.common.toastr.info(err.value.error.error, 'Info!', { timeOut: 3000 });
      } else {
        this.common.handlerResponse(err.value || err);
      }
    });
  }

}
