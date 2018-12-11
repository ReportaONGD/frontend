import { PagoService } from './../../../providers/proyecto/pagos/pago.service';
import { AgenteModel } from './../../../models/agente.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadModel } from '../../../models/actividad.model';
import { FinanciadorModel } from '../../../models/financiador.model';
import { GastoModel } from '../../../models/gasto.model';
import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { Common } from '../../../providers/common/common';
import { GastosService } from '../../../providers/proyecto/gastos/gastos.service';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';


@Component({
  selector: 'app-gastos-inicial-detail-component',
  templateUrl: './gastos_detail.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, PartidaService, FinanciadorService, PagoService,
    Common]
})
export class GastosDetailComponent implements OnInit {
  ids: ParamsModel = new ParamsModel();
  frmGasto: FormGroup;
  gasto: GastoModel;
  title: string;
  partidas: PartidaModel[];
  financiadores: AgenteModel[];
  actividades: ActividadModel[] = new Array<ActividadModel>();
  proyecto: ProyectoModel = new ProyectoModel();
  constructor(private formBuilder: FormBuilder,
    private gastoService: GastosService,
    private route: ActivatedRoute,
    private router: Router,
    private financiadorService: FinanciadorService,
    private pagoService: PagoService,
    private proyectoService: ProyectoService,
    private common: Common) {
  }

  ngOnInit() {
    // Como no funciona el children hay que cogerlo asi
    this.route.params.subscribe((params: any) => {
      this.ids.gasto_id = params['gasto_id'];
    });

    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids.proyecto_id = params['id'];
        this.proyectoService.ids = this.ids;
        this.gastoService.ids = this.ids;
        this.pagoService.ids = this.ids;
      });
    }

    this.initialize();

    if (this.ids.gasto_id) {
      this.gastoService.get(this.ids.gasto_id).subscribe((resp) => {
        this.gasto = resp;
        this.title = `Gasto: ${resp.numero_orden}`;
        this.generateForm();
      });
    } else {
      this.gasto = new GastoModel();
    }
  }

  initialize() {
    this.frmGasto = this.formBuilder.group({
      _fecha: [null, Validators.required],
      numero_orden: [null, Validators.required],
      emisor: [null, Validators.required],
      concepto: [null, Validators.required],
      importe_local: [null, Validators.required],
      tipo_de_cambio_dm: [null],
      tipo_de_cambio_ld: [null],
      actividad: [null, Validators.required],
      financiador: [null, Validators.required],
      moneda: [null, Validators.required],
      partida: [null, Validators.required],
      documentos: [null]
    });

    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
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

  create() {
    const gasto = new GastoModel(this.frmGasto.value);
    this.pagoService.all().subscribe((r) => {
      gasto.pagos = r;
      this.gastoService.post(gasto).subscribe((resp) => {
        this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'gastos']);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    });
  }

  edit() {
    const gasto = new GastoModel(Object.assign(this.gasto, this.frmGasto.value));

    this.pagoService.all().subscribe((r) => {
      gasto.pagos = r;
      this.gastoService.put(gasto._id, gasto).subscribe((resp) => {
        this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'gastos']);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
        });
    });
  }

  close() {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'gastos']);
  }

  comparePartidaFn(c1: PartidaModel, c2: PartidaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  compareActividadFn(c1: ActividadModel, c2: ActividadModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  compareFinanciadorFn(c1: AgenteModel, c2: AgenteModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  generateForm() {
    this.frmGasto.patchValue(this.gasto);
    this.frmGasto.controls['_fecha'].patchValue(this.gasto._fecha);
  }

  private isNew(): boolean {
    if (!this.ids.gasto_id) {
      return true;
    }

    return false;
  }
}

