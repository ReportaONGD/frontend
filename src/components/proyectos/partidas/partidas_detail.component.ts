import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CostesModel } from '../../../models/costes.model';
import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { CostesService } from '../../../providers/catalogos/costes.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';



@Component({
  selector: 'app-partida-detail-component',
  templateUrl: './partidas_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [PartidaService, CostesService, Common]
})
export class PartidasDetailComponent implements OnInit {
  frmPartida: FormGroup;
  partida: PartidaModel;
  partidas: BehaviorSubject<PartidaModel[]>;
  isNew: boolean;
  ids: ParamsModel;
  costes: BehaviorSubject<CostesModel[]>;
  esPadre = false;
  isEjecucion: false;
  controlesInactivos = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: PartidaService,
    private costesService: CostesService,
    private proyectoService: ProyectoService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.service.ids = this.ids;
    this.getCostes();
    this.getPartidas();
    this.frmPartida = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      costes: [null, Validators.required],
      partida_padre: [true],
      es_padre: [false],
      es_inversion: [null]
      // etapa: [null, Validators.required]
    });
    this.frmPartida.controls.es_padre.valueChanges.subscribe((value) => {
      this.esPadre = value;
    });
    if (!this.isNew) {
      this.generateForm();
    }
    this.getProyecto();
  }

  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.update();
    }
  }

  onClose(result?: boolean) {
    if (result) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close();
    }
  }

  create() {
    this.service.post(this.frmPartida.value).subscribe((resp) => {
      if (resp.is_padre) {
        this.partidas.subscribe(array => array.push(resp));
      }
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const tipoPartida = Object.assign(this.partida, this.frmPartida.value);
    this.service.put(tipoPartida._id, tipoPartida).subscribe((resp) => {
      if (resp.is_padre) {
        this.partidas.subscribe(array => array.push(resp));
      }
      this.onClose(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: CostesModel, c2: CostesModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  private getCostes() {
    this.costesService.all().subscribe((resp) => {
      this.costes = new BehaviorSubject<CostesModel[]>(resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private getPartidas() {
    this.service.all().subscribe((resp) => {
      const partidas_padre = resp.filter(p => p.es_padre === true);
      this.partidas = new BehaviorSubject<PartidaModel[]>(partidas_padre);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private generateForm() {
    this.esPadre = this.partida.es_padre;
    this.frmPartida.patchValue(this.partida);
  }


  private getProyecto() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.isEjecucion = resp.validateProjectState();
      this.accionElementosXEstado();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmPartida, this.controlesInactivos, this.isEjecucion);
  }
}
