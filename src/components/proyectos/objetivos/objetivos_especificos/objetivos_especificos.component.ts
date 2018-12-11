import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorModel } from '../../../../models/indicador.model';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { ParamsModel } from '../../../../models/params.model';
import { ProyectoModel } from '../../../../models/proyecto.model';
import { Common } from '../../../../providers/common/common';
// tslint:disable-next-line:max-line-length
import { OEFuenteVerificacionService } from '../../../../providers/proyecto/objetivo_especifico/indicador/fuente_verificacion/objetivo_especifico_fuente_verificacion.service';
import { ObjetivoEspecificoHipotesisService } from '../../../../providers/proyecto/objetivo_especifico/hipotesis/objetivo_especifico_hipotesis.service';
import { ObjetivoEspecificoIndicadorService } from '../../../../providers/proyecto/objetivo_especifico/indicador/objetivo_especifico_indicador.service';
import { ObjetivoEspecificoService } from '../../../../providers/proyecto/objetivo_especifico/objetivo_especifico.service';
import { ProyectoService } from '../../../../providers/proyecto/proyecto.service';
import { IndicadoresDetailComponent } from '../../indicadores/indicador_detail.component';
import { Confirm2Component } from '../../../shared/confirm2/confirm.component';
import {
  ObjetivoEspecificoFuenteVerificacionDocumentoService
} from '../../../../providers/proyecto/objetivo_especifico/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { ComentariosComponent } from '../../comentarios/comentarios.component';
import { ObjetivoEspecificoComentariosService } from '../../../../providers/proyecto/objetivo_especifico/comentarios/comentarios.service';
import { OEMedidaService } from '../../../../providers/proyecto/objetivo_especifico/indicador/medida/objetivo_especifico_medida.service';
import { IAlert, AlertComponent } from '../../../shared/alert/alert.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ObjetivoEspecificoIndicadorComentariosService } from '../../../../providers/proyecto/objetivo_especifico/indicador/comentarios/comentarios.service';


@Component({
  selector: 'app-objetivos-especificos-component',
  templateUrl: './objetivos_especificos.component.html',
  styleUrls: ['../../proyectos.component.css'],
  providers: [ObjetivoEspecificoService, OEFuenteVerificacionService,
    ProyectoService, ObjetivoEspecificoHipotesisService, ObjetivoEspecificoIndicadorService,
    ObjetivoEspecificoFuenteVerificacionDocumentoService, ObjetivoEspecificoComentariosService,
    OEMedidaService, ObjetivoEspecificoIndicadorComentariosService, Common],
  entryComponents: [Confirm2Component, IndicadoresDetailComponent, ComentariosComponent]
})
export class ObjetivosEspecificosComponent implements OnInit {
  proyecto: ProyectoModel = new ProyectoModel();
  objetivosEspecificos: ObjetivoModel[];
  objetivoEspecifico: ObjetivoModel;
  indicador: IndicadorModel;
  frmObjetivo: FormGroup;
  ids: ParamsModel;
  showForm = false;
  modalRef: any;
  isEjecucion = false;
  alert: IAlert;
  alertComponent = new AlertComponent();
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private formBuilder: FormBuilder,
    private modal: NgbModal,
    private objetivoEspecificoService: ObjetivoEspecificoService,
    public oeIndicadorService: ObjetivoEspecificoIndicadorService,
    public oeHipotesisService: ObjetivoEspecificoHipotesisService,
    private oeFVService: OEFuenteVerificacionService,
    private proyectoProvider: ProyectoService,
    private documentos_service: ObjetivoEspecificoFuenteVerificacionDocumentoService,
    private comentarios_service: ObjetivoEspecificoComentariosService,
    private medidasService: OEMedidaService,
    private indComentarioService: ObjetivoEspecificoIndicadorComentariosService,
    private common: Common,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = new ParamsModel({ proyecto_id: params['id'] });
      this.objetivoEspecificoService.ids = this.ids;
      this.initialize();
    });
  }

  initialize() {
    this.showForm = false;
    this.objetivoEspecifico = null;

    this.frmObjetivo = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.proyectoProvider.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.isEjecucion = this.proyecto.validateProjectState();
      if (resp.objetivos_especificos && resp.objetivos_especificos.length > 0) {
        this.showAlert.next(false);
        this.objetivosEspecificos = this.proyecto.objetivos_especificos;
      } else {
        this.alert = this.alertComponent.getAlert(2);
        this.showAlert.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addNewObjetivo() {
    this.objetivoEspecifico = new ObjetivoModel();
    this.showForm = true;
    this.showAlert.next(false);
  }

  cancelSave() {
    this.showForm = false;
  }

  editObjetivo(item: ObjetivoModel) {
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      objetivo_especifico_id: item._id
    });
    this.getObjetivo();
    this.showForm = true;
  }

  selectObjetivo(item: ObjetivoModel) {
    this.objetivoEspecifico = item;
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      objetivo_especifico_id: item._id
    });
  }

  onSubmit() {
    if (this.isNew()) {
      this.create();
    } else {
      this.edit();
    }
  }

  addNewComentario(item: ObjetivoModel) {
    this.ids.objetivo_especifico_id = item._id;
    const modalRef = this.modal.open(ComentariosComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.title = 'Añadir Nuevo Comentario';
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.comentarios_service;
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

  create() {
    this.frmObjetivo.value.general = false;
    this.objetivoEspecificoService.post(this.frmObjetivo.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const objetivo_especifico = Object.assign(this.objetivoEspecifico, this.frmObjetivo.value);
    this.objetivoEspecificoService.put(objetivo_especifico._id, objetivo_especifico).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(item) {
    this.objetivoEspecificoService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  isNew() {
    return this.objetivoEspecifico._id === null;
  }

  emptyList() {
    return !this.objetivosEspecificos || this.objetivosEspecificos.length === 0;
  }
  private getObjetivo() {
    this.objetivoEspecificoService.get(this.ids.objetivo_especifico_id).subscribe((resp) => {
      this.objetivoEspecifico = resp;
      this.frmObjetivo.patchValue(this.objetivoEspecifico);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
