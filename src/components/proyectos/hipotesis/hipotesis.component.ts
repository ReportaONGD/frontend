import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HipotesisModel } from '../../../models/hipotesis.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ObjetivoEspecificoHipotesisService } from '../../../providers/proyecto/objetivo_especifico/hipotesis/objetivo_especifico_hipotesis.service';
import { ResultadoHipotesisService } from '../../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';


@Component({
  selector: 'app-hipotesis-component',
  templateUrl: './hipotesis.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ObjetivoEspecificoHipotesisService, ResultadoHipotesisService, Common],
  entryComponents: [Confirm2Component]
})
export class HipotesisComponent implements OnInit, OnChanges {
  frmHipotesis: FormGroup;
  @Input() hipotesisList: HipotesisModel[];
  hipotesis: HipotesisModel;
  showForm = false;
  isLoading = true;
  isEjecucion = false;
  @Input() ids: any;
  @Input() service: BaseServiceInterface;

  constructor(private common: Common,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ids && !changes.ids.isFirstChange()) {
      this.ids = changes.ids.currentValue;
    } else if (changes.service && !changes.service.isFirstChange()) {
      this.ids = changes.servive.currentValue;
    } else if (changes.hipotesisList && !changes.hipotesisList.isFirstChange()) {
      this.hipotesisList = changes.hipotesisList.currentValue;
    }
    this.ngOnInit();
  }

  ngOnInit() {
    this.service.ids = this.ids;
    this.getProyecto();
    this.initialize();
  }

  initialize() {
    this.showForm = false;

    this.frmHipotesis = this.formBuilder.group({
      descripcion: ['', Validators.required],
    });

    this.service.all().subscribe((resp) => {
      this.hipotesisList = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => this.isLoading = false);
  }

  addNewHipotesis() {
    this.initialize();
    this.showForm = true;
    this.hipotesis = new HipotesisModel();
  }

  editHipotesis(item) {
    this.showForm = true;
    this.hipotesis = item;
    this.frmHipotesis.patchValue(this.hipotesis);
  }

  onSubmit() {
    if (this.isNew()) {
      this.create();
    } else {
      this.edit();
    }
  }

  showAlert() {
    return this.hipotesisList && this.hipotesisList.length === 0;
  }
  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Hipótesis';
    modalRef.componentInstance.message = `¿Desea eliminar la Hipótesis ${item.descripcion}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  cancelHipotesis() {
    this.showForm = false;
  }

  create() {
    this.service.post(this.frmHipotesis.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const hipotesis = Object.assign(this.hipotesis, this.frmHipotesis.value);
    this.service.put(hipotesis._id, hipotesis).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(item: HipotesisModel) {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  isNew() {
    return this.hipotesis._id === null;
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

