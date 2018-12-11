import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PartidaModel } from '../../../models/partida.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { AlertComponent, IAlert } from '../../shared/alert/alert.component';
import { ParamsModel } from '../../../models/params.model';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { PartidasDetailComponent } from './partidas_detail.component';


@Component({
  selector: 'app-partidas-component',
  templateUrl: './partidas.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [PartidaService, Common],
  entryComponents: [Confirm2Component, PartidasDetailComponent]
})
export class PartidaComponent implements OnInit {
  partidas: PartidaModel[];
  partida: PartidaModel;
  showForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading = true;
  isEjecucion = false;
  ids: ParamsModel;
  alert: IAlert;
  alertComponent = new AlertComponent();

  constructor(private common: Common,
    private modal: NgbModal,
    private service: PartidaService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = new ParamsModel({ proyecto_id: params['id'] });
      this.service.ids = this.ids;
      this.initialize();
      this.getProyecto();
    });
  }

  initialize() {
    this.service.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showForm.next(true);
        this.partidas = resp.filter(partidas => partidas.es_padre === false);
      } else {
        this.alert = this.alertComponent.getAlert(2);
        this.showForm.next(false);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => this.isLoading = false);
  }

  add() {
    const modalRef = this.modal.open(PartidasDetailComponent);
    modalRef.componentInstance.title = `Nueva Partida`;
    modalRef.componentInstance.partida = this.partida;
    modalRef.componentInstance.isNew = true;
    modalRef.componentInstance.ids = this.ids;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  edit(item: PartidaModel) {
    this.partida = new PartidaModel(item);
    const modalRef = this.modal.open(PartidasDetailComponent);
    modalRef.componentInstance.title = `Partida: ${item.codigo}`;
    modalRef.componentInstance.partida = this.partida;
    modalRef.componentInstance.isNew = false;
    modalRef.componentInstance.ids = this.ids;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  openModalRemove(item: PartidaModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Partida';
    modalRef.componentInstance.message = `¿Desea eliminar la Partida ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item: PartidaModel) {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}

