import { ProyectoModel } from './../../../models/proyecto.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActividadModel } from '../../../models/actividad.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { ResultadoActividadComentariosService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/comentarios/comentarios.service';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { CronogramaDetailComponent } from '../cronograma/cronograma_detail.component';
import { ActividadDetailComponent } from './actividad_detail.component';



@Component({
  selector: 'app-actividad-component',
  templateUrl: './actividad.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ResultadoActividadService, ResultadoActividadComentariosService, Common],
  entryComponents: [ActividadDetailComponent, CronogramaDetailComponent,
    ComentariosComponent, Confirm2Component]
})
export class ActividadComponent implements OnInit, OnChanges {
  @Input() ids: ParamsModel;
  // actividades: Observable<ActividadModel[]>;
  @Input() actividades: ActividadModel[];
  modalRef: any;
  showEtapa: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  title: string;
  proyecto: ProyectoModel;
  isEdit = false;
  isEjecucion = false;
  isLoading = true;

  constructor(private modal: NgbModal,
    private common: Common,
    private service: ResultadoActividadService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService,
    private comentarioService: ResultadoActividadComentariosService) {
  }

  ngOnChanges(change: SimpleChanges) {
    if (!change.actividades.isFirstChange()) {
      this.ngOnInit();
    }
  }

  public ngOnInit() {
    this.service.ids = this.ids;
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = new ProyectoModel(resp);
      this.isEjecucion = this.proyecto.validateProjectState();
      this.loadEtapas();
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  initialize() {
    this.service.all().subscribe((resp) => {
      // this.actividades = new BehaviorSubject<ActividadModel[]>(resp);
      this.actividades = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => { this.isLoading = false; });
  }

  addNewActividad() {
    this.modalRef = this.modal.open(ActividadDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.title = 'Nueva Actividad';
    this.modalRef.componentInstance.actividad = new BehaviorSubject<ActividadModel>(new ActividadModel());
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  editActividad(item: ActividadModel) {
    this.isEdit = !this.isEdit;
    this.modalRef = this.modal.open(ActividadDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.actividad = new BehaviorSubject<ActividadModel>(item);
    this.modalRef.componentInstance.title = `Actividad: ${item.codigo}`;
    this.ids.actividad_id = item._id;
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  addNewComentario(item: ActividadModel) {
    this.ids.actividad_id = item._id;
    const modalRef = this.modal.open(ComentariosComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Añadir Nuevo Comentario';
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.comentarioService;
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Objetivo Especifico';
    modalRef.componentInstance.message = `¿Desea eliminar el Objetivo Especifico ${item.codigo}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item: ActividadModel) {
    this.service.delete(item._id).subscribe(() => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addCronograma(item) {
    this.modalRef = this.modal.open(CronogramaDetailComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.title = `Cronograma para la actividad: ${item.codigo}`;
    this.ids.actividad_id = item._id;
    this.modalRef.componentInstance.ids = this.ids;
    this.modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  showAlert() {
    return this.actividades && this.actividades.length === 0;
  }
  private loadEtapas() {
    if (this.proyecto.etapas && this.proyecto.etapas.length > 0) {
        this.showEtapa.next(false);
      } else {
        this.showEtapa.next(true);
      }
  }
  private goTo() {
    this.router.navigate(['proyectos', this.ids.proyecto_id, 'edit', 'datos-generales']);
  }

}
