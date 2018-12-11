import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GastoModel } from '../../../models/gasto.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { GastosDocumentosService } from '../../../providers/proyecto/gastos/documentos/gastos_documentos.service';
import { GastosService } from '../../../providers/proyecto/gastos/gastos.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { AlertComponent, IAlert } from '../../shared/alert/alert.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { DocumentosComponent } from '../../shared/documentos/documento.component';
import { GastosDetailComponent } from './gastos_detail.component';
import { Utils } from '../../../utils/utils';


@Component({
  selector: 'app-gastos-component',
  templateUrl: './gastos.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [GastosService, ProyectoService, GastosDocumentosService, Common, NgbCumstonDateParserFormatter],
  entryComponents: [Confirm2Component, GastosDetailComponent, DocumentosComponent]
})
export class GastosComponent implements OnInit {
  totalsPartidas: {};
  totalsActividades: {};
  gastos: GastoModel[];
  importeFormateado= new Array<string>();
  gasto: GastoModel;
  proyecto: ProyectoModel;
  showAlert = true;
  showActividad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showPartida: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ids: ParamsModel;
  alert: IAlert;
  modalRef: any;
  alertComponent = new AlertComponent();
  totalSum = '';
  isLoading = true;
  isEjecucion = false;

  get keysPartidas(): Array<string> { return Object.keys(this.totalsPartidas) as Array<string>; }
  get keysActividad(): Array<string> { return Object.keys(this.totalsActividades) as Array<string>; }
  constructor(private common: Common,
    private modal: NgbModal,
    private service: GastosService,
    private proyectoService: ProyectoService,
    private documentosService: GastosDocumentosService,
    private route: ActivatedRoute,
    private router: Router,
    private ds: NgbCumstonDateParserFormatter) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = new ParamsModel({ proyecto_id: params['id'] });
      this.service.ids = this.ids;
      this.documentosService.ids = this.ids;
      this.initialize();
    });
  }

  initialize() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.getActividades(resp.objetivos_especificos);
      this.getPartidas(resp.partida);
      this.isEjecucion = this.proyecto.validateProjectState();
      if (resp.gastos) {
        if (resp.gastos.length === 0) {
          this.alert = this.alertComponent.getAlert(2);
          this.showAlert = true;
        } else {
          this.showAlert = false;
          this.gastos = this.object2Gasto(resp.gastos);
          this.setTotalsPartidas();
          this.setTotalsActividad();
        }
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => this.isLoading = false);
  }


  editGasto(item): void {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'gastos', item._id, 'edit']);
  }

  addGasto(): void {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'gastos', 'new']);
  }

  add() {
    this.modalRef = this.modal.open(GastosDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.title = 'Nuevo Gasto';
    this.modalRef.componentInstance.gasto = new GastoModel();
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.componentInstance.proyecto = this.proyecto;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  edit(item: GastoModel) {
    this.modalRef = this.modal.open(GastosDetailComponent, { size: 'lg', backdrop: 'static' });
    // this.modalRef.componentInstance.gasto = new GastoModel(item);
    this.modalRef.componentInstance.gasto = item;
    this.modalRef.componentInstance.title = `Gasto: ${item.numero_orden}`;
    this.ids.actividad_id = item._id;
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.componentInstance.proyecto = this.proyecto;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  openModalRemove(item: GastoModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Gasto';
    modalRef.componentInstance.message = `¿Desea eliminar el Gasto ${item.numero_orden}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  openModalDocuments(item: GastoModel): void {
    const modalRef = this.modal.open(DocumentosComponent, { size: 'lg', backdrop: 'static' });
    this.documentosService.ids.gasto_id = item._id;
    modalRef.componentInstance.service = this.documentosService;
    modalRef.componentInstance.title = 'Agregar Documento';
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }
  delete(item: GastoModel) {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private setTotalsPartidas() {
    const totals = {};
    let totalSum = 0;
    this.gastos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[`${a.partida.nombre}-${a.moneda.codigo}`] = totals[`${a.partida.nombre}-${a.moneda.codigo}`] || [];
      totals[`${a.partida.nombre}-${a.moneda.codigo}`].push({ importe: a.importe_local, moneda: a.moneda.codigo });
      totalSum += a.importe_local;
    });
    this.totalSum = Utils.formatMoney(totalSum);
    this.totalsPartidas = totals;
  }

  private setTotalsActividad() {
    const totals = {};
    let totalSum = 0;
    this.gastos.forEach(function (a) {
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`] = totals[`${a.partida.nombre}-${a.actividad.codigo}`] || [];
      // totals[`${a.partida.nombre}-${a.actividad.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      totals[`${a.actividad.codigo}-${a.moneda.codigo}`] = totals[`${a.actividad.codigo}-${a.moneda.codigo}`] || [];
      totals[`${a.actividad.codigo}-${a.moneda.codigo}`].push({ importe: a.importe_local, moneda: a.moneda.codigo });
      totalSum += a.importe_local;
    });
    this.totalSum = Utils.formatMoney(totalSum);
    this.totalsActividades = totals;
  }

  private object2Gasto(lista) {
    const result = [];
    lista.forEach(element => {
      const importe = Utils.formatMoney(element.importe_local);
      this.importeFormateado.push(importe);
      result.push(new GastoModel(element));
    });
    return result;
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

  private goTo(route: string) {
    if (route === 'p') {
      this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'partidas']);
    } else {
      this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'objetivos-especificos']);
    }
  }
}
