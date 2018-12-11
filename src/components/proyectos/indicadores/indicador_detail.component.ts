import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorModel } from '../../../models/indicador.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { IndicadorService } from '../../../providers/proyecto/objetivo/indicador/indicador.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { Common } from '../../../providers/common/common';


// tslint:disable-next-line:max-line-length
@Component({
  selector: 'app-indicador-detail-component',
  templateUrl: './indicador_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [IndicadorService, Common]
})
export class IndicadoresDetailComponent implements OnInit {
  frmIndicador: FormGroup;
  title: string;
  indicador: IndicadorModel;
  isModal: boolean;
  ids: any;
  service: BaseServiceInterface;
  fuente_verificacion_service: BaseServiceInterface;
  documentos_service: BaseServiceInterface;
  isEjecucion = false;
  // Esta variable controla los componentes que queremos que esten activos
  controlesInactivos = [];

  constructor(private formBuilder: FormBuilder,
    private common: Common,
    public activeModal: NgbActiveModal,
    private proyectoService: ProyectoService,
  ) {
  }

  ngOnInit() {
    this.generateForm();
    this.getProyecto();
  }
  /**
   * submit del formulario para crear/editar un indicador
   */
  onSubmit() {
    if (this.isNew()) {
      this.create();
    } else {
      this.edit();
    }
  }
  /**
   * Crea un indicacor para un objetivo general, especifico o un resultado
   */
  create() {
    this.service.post(this.frmIndicador.value).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
      this.close();
    });
  }

  /**
   * Edita un indicacor para un objetivo general, especifico o un resultado
   */
  edit() {
    // const indicador = Object.assign(this.indicador, this.frmIndicador.value);
    this.service.put(this.indicador._id, this.frmIndicador.value).subscribe((resp) => {
      this.close();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
      this.close();
    });
  }

  /**
   * Cierra el NgbModal activo
   */
  close() {
    this.activeModal.close(true);
  }

  private generateForm() {
    const _new = this.isNew();
    this.frmIndicador = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      linea_base: ['', Validators.compose([Validators.required])],
      meta: ['', Validators.compose([Validators.required])],
      comentario: [''],
      comentarios_ong: [''],
      comentarios_aecid: ['']
    });
    this.frmIndicador.patchValue(this.indicador);
  }

  isNew() {
    return this.indicador._id === null;
  }

  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.isEjecucion = proyecto.validateProjectState();
      this.accionElementosXEstado();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmIndicador, this.controlesInactivos, this.isEjecucion);
  }
}
