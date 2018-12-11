import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ResumenObjetivoEspecificoModel, ResumenResultadoModel, ResumenActividadModel } from '../../../models/resumen/resumen_matriz.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-resumen-matriz-component',
  templateUrl: './resumen_matriz.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, Common],
  entryComponents: [Confirm2Component]
})
export class ResumenMatrizComponent implements OnInit {
  proyecto: ProyectoModel;
  resumen_oe: BehaviorSubject<ResumenObjetivoEspecificoModel[]>;
  resumen_resultado: BehaviorSubject<ResumenResultadoModel[]>;
  resumen_actividad: BehaviorSubject<ResumenActividadModel[]>;
  resumen_actividad_global: BehaviorSubject<ResumenActividadModel[]>;
  _id: string;
  isLoading = true;
  constructor(
    private proyectoProvider: ProyectoService,
    private route: ActivatedRoute,
    private common: Common
  ) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this._id = params['id'];
      this.initialize();
    });
  }

  initialize(): void {
    this.proyectoProvider.get(this._id).subscribe((resp) => {
      this.proyecto = resp;
      this.loadResumenOE();
      this.loadResumenResultados();
      this.loadResumenActividades();
      this.loadResumenActividadGlobal();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.proyecto;
  }

  private loadResumenOE() {
    const resumen = [];
    this.proyecto.objetivos_especificos.forEach((oe) => {
      const item = new ResumenObjetivoEspecificoModel();
      item.objetivo_especifico = oe.codigo + ': ' + oe.descripcion;
      oe.indicadores.forEach((ind) => {
        item.indicador.push(ind.codigo + ': ' + ind.descripcion);
        ind.fuente_verificacion.forEach((fv) => {
          item.fuente_verificacion.push(fv.codigo + ': ' + fv.descripcion);
        });
      });
      oe.hipotesis.forEach((hip) => {
        item.indicador.push(hip.descripcion);
      });
      resumen.push(item);
    });
    if (resumen.length > 0) { this.resumen_oe = new BehaviorSubject<ResumenObjetivoEspecificoModel[]>(resumen); }
  }

  private loadResumenResultados() {
    const resumen = [];
    this.proyecto.objetivos_especificos.forEach((oe) => {
      oe.resultados.forEach((r) => {
        const item = new ResumenResultadoModel();
        item.resultado = r.codigo + ': ' + r.descripcion;
        r.indicadores.forEach((ind) => {
          item.indicador.push(ind.codigo + ': ' + ind.descripcion);
          ind.fuente_verificacion.forEach((fv) => {
            item.fuente_verificacion.push(fv.codigo + ': ' + fv.descripcion);
          });
        });
        oe.hipotesis.forEach((hip) => {
          item.indicador.push(hip.descripcion);
        });
        resumen.push(item);
      });
    });
    if (resumen.length > 0) { this.resumen_resultado = new BehaviorSubject<ResumenResultadoModel[]>(resumen); }
  }

  private loadResumenActividades() {
    const resumen = [];
    this.proyecto.objetivos_especificos.forEach((oe) => {
      oe.resultados.forEach((r) => {
        r.actividades.forEach((act) => {
          const item = new ResumenActividadModel();
          item.actividad = act.codigo + ': ' + act.descripcion;
          const presupuestos = this.proyecto.presupuestos.filter(p => p.actividad._id === act._id);
          if (presupuestos && presupuestos.length > 0) {
            presupuestos.forEach((presupuesto) => {
              item.recurso.push(presupuesto.partida.nombre);
              item.coste.push(presupuesto.importe);
            });
          }
          resumen.push(item);
        });
      });
    });
    if (resumen.length > 0) { this.resumen_actividad = new BehaviorSubject<ResumenActividadModel[]>(resumen); }
  }
  private loadResumenActividadGlobal() {
    const resumen = [];
    const item = new ResumenActividadModel();
    item.actividad =  this.proyecto.actividad_global.codigo + ': ' + this.proyecto.actividad_global.descripcion;
    resumen.push(item);
    // this.proyecto.actividad_global.recurso.forEach((rec) => {
    //   item.recurso.push(rec.descripcion);
    //   item.coste.push(rec.coste);
    //   resumen.push(item);
    // });
    if (resumen.length > 0) { this.resumen_actividad_global = new BehaviorSubject<ResumenActividadModel[]>(resumen); }
  }
}
