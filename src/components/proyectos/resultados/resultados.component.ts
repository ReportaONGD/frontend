import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjetivoModel } from '../../../models/objetivo.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ResultadoModel } from '../../../models/resultado.model';
import { Common } from '../../../providers/common/common';
import { ResultadoComentariosService } from '../../../providers/proyecto/objetivo_especifico/resultado/comentarios/comentarios.service';
import { ResultadoHipotesisService } from '../../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { ResultadoIndicadorComentariosService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/comentarios/comentarios.service';
// tslint:disable-next-line:max-line-length
import { ResultadoFuenteVerificacionDocumentoService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { ResultadoFuenteVerificacionService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/resultado_fuente_verificacion.service';
import { ResultadoMedidaService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/medida/resultado_medida.service';
import { ResultadoIndicadorService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ResultadoService } from '../../../providers/proyecto/objetivo_especifico/resultado/resultado.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';


@Component({
  selector: 'app-resultados-component',
  templateUrl: './resultados.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ResultadoService, ResultadoHipotesisService,
    ProyectoService, ResultadoComentariosService, ResultadoIndicadorService, ResultadoActividadService,
    ResultadoMedidaService, ResultadoFuenteVerificacionDocumentoService,
    ResultadoIndicadorComentariosService, Common],
  entryComponents: [Confirm2Component, ComentariosComponent]
})
export class ResultadosComponent implements OnInit, OnDestroy {
  frmResultado: FormGroup;
  objetivo_especifico: ObjetivoModel;
  alertComponent = new AlertComponent();
  resultado: ResultadoModel;
  resultados: Array<ResultadoModel>;
  ids: ParamsModel = new ParamsModel();
  modalRef: any;
  titleResultado: string;
  isObjetivoSelected = false;
  isResultadoSelected = false;
  isNewHipotesis = false;
  showAlert= false;
  isEdit = false;
  isAdd = true;
  isLoading = true;
  isEjecucion = false;
  constructor(private formBuilder: FormBuilder,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private service: ResultadoService,
    private proyectoService: ProyectoService,
    private ogResIndicadorService: ResultadoIndicadorService,
    private ogResActividadService: ResultadoActividadService,
    private ogHipotesisService: ResultadoHipotesisService,
    private resultadoFuenteVerificacionService: ResultadoFuenteVerificacionService,
    private resultados_comentarios: ResultadoComentariosService,
    private medidasService: ResultadoMedidaService,
    private documentoService: ResultadoFuenteVerificacionDocumentoService,
    private resultadoIndComentarioService: ResultadoIndicadorComentariosService,
    private common: Common) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids.proyecto_id = params['id'];
      this.service.ids = this.ids;
    });
    this.frmResultado = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.getProyecto();
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    // if (this.resultado) {
    //   this.resultado.unsubscribe();
    // }
  }

  selectObjetivo(value) {
    this.isAdd = true;
    this.isObjetivoSelected = true;
    this.isResultadoSelected = false;
    this.objetivo_especifico = value;
    this.titleResultado = `Resultados para el Objetivo Especifico: ${this.objetivo_especifico.codigo}`;
    this.ids.objetivo_especifico_id = value._id;
    this.all();
  }

  addResultado(value) {
    this.isAdd = false;
    this.isEdit = false;
    this.objetivo_especifico = value;
    this.isObjetivoSelected = true;
    this.titleResultado = `Inclusión de un Resultado para el Objetivo Especifico: ${this.objetivo_especifico.codigo}`;
    this.ids.objetivo_especifico_id = value._id;
    this.all();
  }

  addNewResultado() {
    this.isAdd = false;
    this.isEdit = false;
    this.resultado = new ResultadoModel();
    this.frmResultado.controls.codigo.setValue(null);
    this.frmResultado.controls.descripcion.setValue(null);
  }

  cancelSaveResultado() {
    this.isAdd = true;
  }

  selectResultado(value) {
    this.isEdit = true;
    this.ids.resultado_id = value._id;
    this.get();
  }

  editResultado(item) {
    this.isAdd = false;
    this.selectResultado(item);
  }

  onSubmit() {
    if (!this.resultado._id) {
      this.create();
    } else {
      this.edit();
    }
    this.resultado = new ResultadoModel();
    this.isAdd = true;
  }

  openModalRemove(item) {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Resultado';
    modalRef.componentInstance.message = `¿Desea eliminar el Resultado ${item.codigo}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.ogHipotesisService.ids = this.ids;
        this.ogResIndicadorService.ids = this.ids;
        this.ogResActividadService.ids = this.ids;
        if (this.resultado.actividades) {
          this.removeActividades(this.resultado.actividades);
        }
        if (this.resultado.hipotesis) {
          this.removeHipotesis(this.resultado.hipotesis);
        }
        if (this.resultado.indicadores) {
          this.removeResIndicadores(this.resultado.indicadores);
        }
        this.delete(item);
      }
    });
  }


  removeResIndicadores(indicadores) {
    if (indicadores && indicadores.length > 0) {
      indicadores.forEach(indicador => {
        this.ogResIndicadorService.delete(indicador._id).subscribe();
      });
    }
  }
  removeHipotesis(hipotesis) {
    if (hipotesis && hipotesis.length > 0) {
      hipotesis.forEach(hipotesi => {
        this.ogHipotesisService.delete(hipotesi._id).subscribe();
      });
    }
  }
  removeActividades(actividades) {
    if (actividades && actividades.length > 0) {
      actividades.forEach(actividad => {
        this.ogResActividadService.delete(actividad._id).subscribe();
      });
    }
  }

  all() {
    this.service.all().subscribe((resp) => {
      this.resultados = resp;
      if (this.resultados.length === 0) {
        this.showAlert = true;
      } else {
        this.showAlert = false;
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => { this.isLoading = false; });
  }

  get() {
    this.service.get(this.ids.resultado_id).subscribe((resp) => {
      this.ids.resultado_id = resp._id;
      this.resultado = resp;
      this.frmResultado.patchValue(resp);
      this.isResultadoSelected = true;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  create() {
    this.service.post(this.frmResultado.value).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const resultado = Object.assign(this.resultado, this.frmResultado.value);
    this.service.put(resultado._id, resultado).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(item: ResultadoModel) {
    this.service.delete(item._id).subscribe((resp) => {
      this.all();
      this.resultado = new ResultadoModel();
      this.isResultadoSelected = false;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addNewComentario(item: ResultadoModel) {
    this.ids.resultado_id = item._id;
    const modalRef = this.modal.open(ComentariosComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Añadir Nuevo Comentario';
    modalRef.componentInstance.ids = this.ids;
    modalRef.componentInstance.service = this.resultados_comentarios;
  }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  isSelected(item: ResultadoModel): boolean {
    return this.resultado && item ? this.resultado._id === item._id : this.resultado === item;
  }
}
