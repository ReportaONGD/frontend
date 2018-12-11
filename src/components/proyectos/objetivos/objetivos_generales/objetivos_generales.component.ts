import { IndicadorModel } from './../../../../models/indicador.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/observable/of';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { ParamsModel } from '../../../../models/params.model';
import { ProyectoModel } from '../../../../models/proyecto.model';
import { Common } from '../../../../providers/common/common';
import { ObjetivoGeneralComentariosService } from '../../../../providers/proyecto/objetivo/indicador/comentarios/comentarios.service';
// tslint:disable-next-line:max-line-length
import { ObjetivoFuenteVerificacionDocumentosService } from '../../../../providers/proyecto/objetivo/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { OGFuenteVerificacionService } from '../../../../providers/proyecto/objetivo/indicador/fuente_verificacion/fuente_verificacion.service';
import { IndicadorService } from '../../../../providers/proyecto/objetivo/indicador/indicador.service';
import { ObjetivoEspecificoHipotesisService } from '../../../../providers/proyecto/objetivo_especifico/hipotesis/objetivo_especifico_hipotesis.service';
import { ResultadoIndicadorService } from '../../../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { ResultadoActividadService } from '../../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ResultadoHipotesisService } from '../../../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { ResultadoService } from '../../../../providers/proyecto/objetivo_especifico/resultado/resultado.service';
import { OGMedidaService } from '../../../../providers/proyecto/objetivo/indicador/medida/medida.service';
import { ObjetivoService } from '../../../../providers/proyecto/objetivo/objetivo.service';
import { ProyectoService } from '../../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../../shared/confirm2/confirm.component';
@Component({
  selector: 'app-objetivos-generales-component',
  templateUrl: './objetivos_generales.component.html',
  styleUrls: ['../../proyectos.component.css'],
  providers: [ObjetivoService, ProyectoService, IndicadorService, ObjetivoEspecificoHipotesisService, ResultadoIndicadorService,
    ResultadoActividadService, ResultadoHipotesisService, ResultadoService, OGMedidaService, ObjetivoGeneralComentariosService, Common],
  entryComponents: [Confirm2Component]
})
export class ObjetivosGeneralesComponent implements OnInit {
  proyecto: ProyectoModel = new ProyectoModel();
  objetivo: ObjetivoModel;
  frmObjetivo: FormGroup;
  ids: ParamsModel;
  showForm = false;
  isEjecucion = false;
  constructor(private common: Common,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private proyectoProvider: ProyectoService,
    private objetivoService: ObjetivoService,
    private ogIndicadorService: IndicadorService,
    private ogResHipotesisService: ObjetivoEspecificoHipotesisService,
    private ogResIndicadorService: ResultadoIndicadorService,
    private ogResActividadService: ResultadoActividadService,
    private ogHipotesisService: ResultadoHipotesisService,
    private ogResultadoService: ResultadoService,
    private route: ActivatedRoute,
    private fuenteVerificacionService: OGFuenteVerificacionService,
    private medidasService: OGMedidaService,
    private documentos_service: ObjetivoFuenteVerificacionDocumentosService,
    private comentarios_service: ObjetivoGeneralComentariosService) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.initialize();
      });
    }
  }

  initialize() {
    this.showForm = false;

    this.frmObjetivo = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.proyectoProvider.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.isEjecucion = this.proyecto.validateProjectState();
      this.objetivo = this.proyecto.objetivo;
      this.ids = new ParamsModel({
        proyecto_id: this.proyecto._id,
        objetivo_id: this.proyecto.objetivo ? this.proyecto.objetivo._id : null,
        objetivo_especifico_id: this.proyecto.objetivo ? this.proyecto.objetivo._id : null
      });
      this.objetivoService.ids = this.ids;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onSubmit() {
    if (this.isNew()) {
      this.create();
    } else {
      this.edit();
    }
  }

  editObjetivo(item: ObjetivoModel) {
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      objetivo_id: item._id,
      objetivo_especifico_id: item._id
    });
    this.getObjetivo();
    this.showForm = !this.showForm;
  }

  addNewObjetivo() {
    this.objetivo = new ObjetivoModel();
    this.showForm = !this.showForm;
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Modificación';
    modalRef.componentInstance.message = `¿Desea eliminar el Objetivo General ${item.codigo}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.ogHipotesisService.ids = this.ids;
        this.ogIndicadorService.ids = this.ids;
        this.ogResIndicadorService.ids = this.ids;
        this.ogResActividadService.ids = this.ids;
        this.ogResultadoService.ids = this.ids;
        if (item.indicadores) {
          this.removeIndicadores(item.indicadores);
        }
        if (item.hipotesis) {
          this.removeHipotesis(item.hipotesis);
        }
        if (item.resultados) {
          this.removeResultados(item.resultados);
        }
        this.delete(item);
      }
    });
  }

  removeIndicadores(indicadores) {
    if (indicadores && indicadores.length > 0) {
      indicadores.forEach(indicador => {
        this.ogIndicadorService.delete(indicador._id).subscribe();
      });
    }
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
  removeResultados(resultados) {
      if (resultados && resultados.length > 0) {
        resultados.forEach(resultado => {
          if (resultado.actividades) {
            this.removeActividades(resultado.actividades);
          }
          if (resultado.hipotesis) {
            this.removeHipotesis(resultado.hipotesis);
          }
          if (resultado.indicadores) {
            this.removeResIndicadores(resultado.indicadores);
          }
          this.ogResultadoService.delete(resultado._id).subscribe();
        });
      }
  }

  cancelSave() {
    this.showForm = false;
  }

  create() {
    const objetivo = Object.assign(this.objetivo, this.frmObjetivo.value);
    objetivo.general = true;
    this.objetivoService.post(this.frmObjetivo.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const objetivo = Object.assign(this.objetivo, this.frmObjetivo.value);
    this.ids = new ParamsModel({
      proyecto_id: this.proyecto._id,
      objetivo_id: objetivo._id,
      objetivo_especifico_id: objetivo._id
    });

    this.objetivoService.put(objetivo._id, objetivo).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(item) {
    this.objetivoService.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  isNew() {
    return this.emptyList();
  }

  emptyList() {
    return !this.objetivo || this.objetivo._id === null;
  }

  private getObjetivo() {
    this.objetivoService.get(this.ids.objetivo_id).subscribe((resp) => {
      this.objetivo = resp;
      this.frmObjetivo.patchValue(this.objetivo);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
