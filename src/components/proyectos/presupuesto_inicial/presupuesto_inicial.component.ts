import { Utils } from './../../../utils/utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { PresupuestoModel } from '../../../models/presupuesto.model';
import { PresupuestoService } from '../../../providers/proyecto/presupuesto/presupuesto.service';
import { PresupuestoInicialDetailComponent } from './presupuesto_inicial_detail.component';
import { IAlert, AlertComponent } from '../../shared/alert/alert.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-presupuesto-inicial.component',
  templateUrl: './presupuesto_inicial.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common, PartidaService, ProyectoService, PresupuestoService],
  entryComponents: [Confirm2Component, PresupuestoInicialDetailComponent]
})
export class PresupuestoInicialComponent implements OnInit {
  presupuestos: PresupuestoModel[];
  proyecto: ProyectoModel;
  ids: ParamsModel = new ParamsModel();
  importeFormateado = new Array<string>();
  alert: IAlert;
  alertComponent = new AlertComponent();
  modalRef: any;
  totalSum: string;
  isLoading = true;
  isEjecucion = false;
  totalsPartidas: {};
  totalsActividades: {};
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showActividad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showPartida: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showEtapa: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get keysPartidas(): Array<string> { return Object.keys(this.totalsPartidas) as Array<string>; }
  get keysActividad(): Array<string> { return Object.keys(this.totalsActividades) as Array<string>; }
  constructor(private route: ActivatedRoute,
    private common: Common,
    private modal: NgbModal,
    private proyectoService: ProyectoService,
    private presupuestoService: PresupuestoService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids.proyecto_id = params['id'];
        this.presupuestoService.ids = this.ids;
        this.proyectoService.ids = this.ids;
      });
    }
    this.initialize();
  }

  initialize() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.getActividades(resp.objetivos_especificos);
      this.getPartidas(resp.partida);
      this.getEtapa(resp.etapas);
      this.isEjecucion = this.proyecto.validateProjectState();
      if (resp.presupuestos.length === 0) {
        this.showAlert.next(true);
        this.alert = this.alertComponent.getAlert(2);
      } else {
        this.showAlert.next(false);
        this.presupuestos = this.object2Presupuesto(resp.presupuestos);
        this.setTotalsPartidas();
        this.setTotalsActividad();
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => this.isLoading = false);
  }

  add() {
    this.modalRef = this.modal.open(PresupuestoInicialDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.title = 'Nuevo Presupuesto/Actividad';
    this.modalRef.componentInstance.presupuesto = new PresupuestoModel();
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.componentInstance.proyecto = this.proyecto;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }
  edit(item: PresupuestoModel) {
    this.modalRef = this.modal.open(PresupuestoInicialDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.presupuesto = new PresupuestoModel(item);
    this.modalRef.componentInstance.title = `Presupuesto/Actividad: ${item.partida.nombre} - ${item.actividad.codigo}`;
    this.ids.actividad_id = item._id;
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.componentInstance.proyecto = this.proyecto;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }
  openModalRemove(item: PresupuestoModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Presupuesto';
    modalRef.componentInstance.message = `¿Desea eliminar el Presupuesto para la partida ${item.partida.codigo} con importe ${item.importe}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  delete(item: PresupuestoModel) {
    this.presupuestoService.delete(item._id).subscribe(() => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private object2Presupuesto(lista) {
    const result = [];
    lista.forEach(element => {
      const importe = Utils.formatMoney(element.importe);
      this.importeFormateado.push(importe);
      result.push(new PresupuestoModel(element));
    });
    return result;
  }

  private setTotalsPartidas() {
    const totals = {};
    let totalSum = 0;
    this.presupuestos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[a.partida.nombre] = totals[a.partida.nombre] || [];
      totals[a.partida.nombre].push({ importe: a.importe, moneda: a.moneda.codigo });
      totalSum += a.importe;
    });
    this.totalSum = Utils.formatMoney(totalSum);
    this.totalsPartidas = totals;
  }
  private setTotalsActividad() {
    const totals = {};
    let totalSum = 0;
    this.presupuestos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[a.actividad.codigo] = totals[a.actividad.codigo] || [];
      totals[a.actividad.codigo].push({ importe: a.importe, moneda: a.moneda.codigo });
      totalSum += a.importe;
    });

    this.totalSum = Utils.formatMoney(totalSum);
    this.totalsActividades = totals;
  }

  private getActividades(objetivos_especificos) {
    if (!objetivos_especificos || objetivos_especificos.length === 0) {
      this.showActividad.next(true);
    } else {
      const oe = objetivos_especificos.filter(item => item.resultados && item.resultados.length > 0);
      if (!oe || oe.length === 0) {
        this.showActividad.next(true);
      } else {
        const r = oe[0].resultados.filter(item => item.actividades && item.actividades.length > 0);
        if (!r || r.length === 0) {
          this.showActividad.next(true);
        } else {
          this.showActividad.next(false);
        }
      }
    }
  }

  private getPartidas(partidas) {
    if (!partidas || partidas.length === 0) {
      this.showPartida.next(true);
    } else {
      this.showPartida.next(false);
    }
  }

  private getEtapa(etapas) {
    if (!etapas || etapas.length === 0) {
      this.showEtapa.next(true);
    } else {
      this.showEtapa.next(false);
    }
  }

  private goTo(route: string) {
    if (route === 'p') {
      this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'partidas']);
    } else if (route === 'a') {
      this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'objetivos-especificos']);
    } else {
      this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'datos-generales']);
    }
  }
}
