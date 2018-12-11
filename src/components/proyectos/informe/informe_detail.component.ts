import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformeModel } from '../../../models/informe.model';
import { ParamsModel } from '../../../models/params.model';
import { PeriodoModel } from '../../../models/periodo.model';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { InformeService } from '../../../providers/proyecto/informe/informe.service';
import { PeriodoService } from '../../../providers/proyecto/periodo/periodo.service';


@Component({
  selector: 'app-informe-detail-component',
  templateUrl: './informe_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [InformeService, PeriodoService, NgbCumstonDateParserFormatter, Common]
})
export class InformeDetailComponent implements OnInit {
  frmInforme: FormGroup;
  informe: InformeModel;
  title: string;
  isNew: boolean;
  ids: ParamsModel = new ParamsModel();
  periodos: PeriodoModel[];
  modificaciones_sustanciales: string[];
  mod_sus: string;
  modificaciones_accidentales: string[];
  mod_acc: string;
  actividades_previstas: string[];
  act_pre: string;
  nuevas_actividades_npi: string[];
  nue_act: string;
  valoracion_general: string;
  grado_de_alineamiento: string;
  puntos_fuertes_debiles: string;
  observaciones: string;
  modificacion_proyecto_inicial: string;
  pertinencia: string;
  coherencia: string;
  eficacia_impacto: string;
  eficiencia: string;
  viabilidad_sostenibilidad: string;
  amortizacion: string;
  cobertura: string;
  otros_criterios: string;
  finalizacion_transferencia: string;
  receptividad_sociolocal: string;
  visibilidad_complementariedad: string;
  final = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: InformeService,
    private periodoService: PeriodoService,
    private route: ActivatedRoute,
    private router: Router,
    private ds: NgbCumstonDateParserFormatter,
    private common: Common) {
  }

  ngOnInit(): void {
    // Como no funciona el children hay que cogerlo asi
    this.route.params.subscribe((params: any) => {
      this.ids.informe_id = params['informe_id'];
    });

    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids.proyecto_id = params['id'];
        this.service.ids = this.ids;
        this.periodoService.ids = this.ids;
      });
    }
    this.frmInforme = this.formBuilder.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      periodo: [null, Validators.required],
      final: [false],
      modificaciones_sustanciales: [null],
      modificaciones_accidentales: [null],
      actividades_previstas: [null],
      nuevas_actividades_npi: [null],
      valoracion_general: [''],
      grado_de_alineamiento: [''],
      puntos_fuertes_debiles: [''],
      observaciones: [''],
      modificacion_proyecto_inicial: [''],
      pertinencia: [''],
      coherencia: [''],
      eficacia_impacto: [''],
      eficiencia: [''],
      viabilidad_sostenibilidad: [''],
      amortizacion: [''],
      cobertura: [''],
      otros_criterios: [''],
      finalizacion_transferencia: [''],
      receptividad_sociolocal: [''],
      visibilidad_complementariedad: ['']
    });
    this.frmInforme.controls.final.valueChanges.subscribe((value) => {
      this.final = value;
    });
    this.initialize();
    this.loadPeriodos();
  }

  initialize() {
    if (this.ids.informe_id) {
      this.service.get(this.ids.informe_id).subscribe((resp) => {
        this.informe = resp;
        this.frmInforme.patchValue(this.informe);
        this.isNew = false;
        this.title = 'Editar Informe';
      });
    } else {
      this.frmInforme.patchValue(new InformeModel());
      this.isNew = true;
      this.title = 'Nuevo Informe';
    }

  }

  addModificacionesSus() {
    let arr = this.frmInforme.controls.modificaciones_sustanciales.value;
    if (!arr) {
      arr = [];
    }
    arr.push(this.mod_sus);
    this.frmInforme.controls.modificaciones_sustanciales.setValue(arr);
    this.mod_sus = '';
  }
  removeModificacionSus(index) {
    const arr = this.frmInforme.controls.modificaciones_sustanciales.value;
    arr.splice(index, 1);
    this.frmInforme.controls.modificaciones_sustanciales.setValue(arr);
  }


  addModificacionesAcc() {
    let arr = this.frmInforme.controls.modificaciones_accidentales.value;
    if (!arr) {
      arr = [];
    }
    arr.push(this.mod_acc);
    this.frmInforme.controls.modificaciones_accidentales.setValue(arr);
    this.mod_acc = '';
  }
  removeModificacionAcc(index) {
    const arr = this.frmInforme.controls.modificaciones_accidentales.value;
    arr.splice(index, 1);
    this.frmInforme.controls.modificaciones_accidentales.setValue(arr);
  }


  addActividadesPrev() {
    let arr = this.frmInforme.controls.actividades_previstas.value;
    if (!arr) {
      arr = [];
    }
    arr.push(this.act_pre);
    this.frmInforme.controls.actividades_previstas.setValue(arr);
    this.act_pre = '';
  }
  removeActividadesPrev(index) {
    const arr = this.frmInforme.controls.actividades_previstas.value;
    arr.splice(index, 1);
    this.frmInforme.controls.actividades_previstas.setValue(arr);
  }


  addNueActividades() {
    let arr = this.frmInforme.controls.nuevas_actividades_npi.value;
    if (!arr) {
      arr = [];
    }
    arr.push(this.nue_act);
    this.frmInforme.controls.nuevas_actividades_npi.setValue(arr);
    this.nue_act = '';
  }
  removeNueActividades(index) {
    const arr = this.frmInforme.controls.nuevas_actividades_npi.value;
    arr.splice(index, 1);
    this.frmInforme.controls.nuevas_actividades_npi.setValue(arr);
  }



  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.update();
    }
  }

  backToList() {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'informe']);
  }

  create() {
    const informe = new InformeModel(this.frmInforme.value);
    this.service.post(informe).subscribe((resp) => {
      this.backToList();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  update() {
    const informe = Object.assign(this.informe, this.frmInforme.value);
    this.service.put(informe._id, informe).subscribe((resp) => {
      this.backToList();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  compareFn(c1: PeriodoModel, c2: PeriodoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
  private loadPeriodos() {
    this.periodoService.all().subscribe((resp) => {
      this.periodos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
