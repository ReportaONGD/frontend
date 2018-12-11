import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorModel } from '../../../models/indicador.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { MedidasComponent } from '../medidas/medidas.component';
import { IndicadoresDetailComponent } from './indicador_detail.component';


@Component({
  selector: 'app-indicadores-component',
  templateUrl: './indicadores.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common, ProyectoService],
  entryComponents: [IndicadoresDetailComponent, MedidasComponent, ComentariosComponent, Confirm2Component]
})
export class IndicadoresComponent implements OnInit, OnChanges {
  indicador: IndicadorModel;
  @Input() indicadores: IndicadorModel[];
  modalRef: any;
  title: string;
  isEdit = false;
  isloading = true;
  isEjecucion = false;
  @Input() ids: ParamsModel;
  @Input() isModal: boolean;
  @Input() service: BaseServiceInterface;
  @Input() fuente_verificacion_service: BaseServiceInterface;
  @Input() documentos_service: BaseServiceInterface;
  @Input() medidas_service: BaseServiceInterface;
  @Input() comentarios_service: BaseServiceInterface;
  constructor(private modal: NgbModal,
    private common: Common,
    private proyectoService: ProyectoService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ids && !changes.ids.isFirstChange()) {
      this.ids = changes.ids.currentValue;
      this.ngOnInit();
    } else if (changes.service && !changes.service.isFirstChange()) {
      this.service = changes.service.currentValue;
      this.ngOnInit();
    } else if (changes.indicadores && !changes.indicadores.isFirstChange()) {
      this.indicadores = changes.indicadores.currentValue;
      this.ngOnInit();
    }
  }

  public ngOnInit() {
    this.service.ids = this.ids;
    this.fuente_verificacion_service.ids = this.ids;
    this.documentos_service.ids = this.ids;
    this.getProyecto();
    this.initialize();
  }

  /**
   * Carga inicial de todos los indicadores de un objetivo general, uno especifico o un resultado
   */
  initialize() {
    this.service.all().subscribe((resp) => {
      this.indicadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Abre el formulario de alta de un indicador
   */
  addNewIndicador() {
    const modalRef = this.modal.open(IndicadoresDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Nuevo Indicador';
    modalRef.componentInstance.indicador = new IndicadorModel();
    modalRef.componentInstance.isModal = true;
    modalRef.componentInstance.service = this.service;
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.documentos_service = this.documentos_service;
    modalRef.componentInstance.fuente_verificacion_service = this.fuente_verificacion_service;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  /**
   * Abre el formulario de edicion de un indicador
   */
  editIndicador(item) {
    // this.isEdit = !this.isEdit;
    const modalRef = this.modal.open(IndicadoresDetailComponent, { size: 'lg' });
    // this.indicador = new IndicadorModel(item) ;
    // modalRef = this.modal.open(IndicadoresDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = `Indicador: ${item.codigo}`;
    modalRef.componentInstance.indicador = item;
    modalRef.componentInstance.isModal = true;
    modalRef.componentInstance.service = this.service;
    modalRef.componentInstance.ids = this.ids;
    this.ids.indicador_id = item._id;
    modalRef.componentInstance.fuente_verificacion_service = this.fuente_verificacion_service;
    modalRef.componentInstance.documentos_service = this.documentos_service;
    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
      }
    });
  }

  /**
   * Abre el panel de confirmacion para eliminar un indicador
   */
  openModalRemove(item): void {
    this.modalRef = this.modal.open(Confirm2Component);
    this.modalRef.componentInstance.title = 'Eliminar Indicador';
    this.modalRef.componentInstance.message = `¿Desea eliminar el Indicador ${item.codigo}?`;
    this.modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  addNewMedida(item: IndicadorModel) {
    this.ids.indicador_id = item._id;
    const modalRef = this.modal.open(MedidasComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Añadir Nueva Medida';
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.medidas_service;
  }

  addNewComentario(item: IndicadorModel) {
    this.ids.indicador_id = item._id;
    const modalRef = this.modal.open(ComentariosComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Añadir Nuevo Comentario';
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.comentarios_service;
  }
  /**
   * Elimina un indicador de un objetivo general o especifico
   * @param indicador objeto de tipo IndicadorModel
   */
  delete(indicador) {
    this.service.delete(indicador._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.indicadores && this.indicadores.length === 0;
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

