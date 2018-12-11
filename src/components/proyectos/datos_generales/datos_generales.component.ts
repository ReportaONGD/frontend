import { AgenteModel } from './../../../models/agente.model';
import 'rxjs/add/observable/concat';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EstadoProyectoModel } from '../../../models/estado_proyecto.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ConvocatoriaService } from '../../../providers/catalogos/convocatoria.service';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { ConvocatoriaModel } from '../../../models/convocatoria.model';
import { FinanciadorModel } from '../../../models/financiador.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SocioLocalService } from '../../../providers/catalogos/socio_local.service';


@Component({
  selector: 'app-datos-generales-component',
  templateUrl: './datos_generales.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, ConvocatoriaService, FinanciadorService, SocioLocalService, Common]
})
export class DatosGeneralesComponent implements OnInit, OnDestroy {
  frmProyecto: FormGroup;
  proyecto: ProyectoModel = new ProyectoModel();
  estados_proyecto: [EstadoProyectoModel];
  convocatorias: ConvocatoriaModel[];
  ids: ParamsModel;
  isAecid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  financiadores = {};
  combo_financiadores: AgenteModel[];
  socios_locales: AgenteModel[];
  isNew = true;
  isCollapsedFormulario = false;
  iscollapseEntidades = true;
  iscollapseAportaciones = true;
  iscollapseModificaciones = true;
  iscollapseEtapas = true;
  iscollapsePeriodos = true;
  navigationSubscription: Subscription;
  // Esta variable controla los componentes que queremos que esten activos
  controlesInactivos = [];

  get keys(): Array<string> { return Object.keys(this.financiadores) as Array<string>; }
  constructor(private proyectoService: ProyectoService,
    private estadosProyectoService: EstadosProyectoService,
    private financiadorService: FinanciadorService,
    private socioLocalService: SocioLocalService,
    private convocatoriaService: ConvocatoriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private common: Common) {
  }


  /**
   * @description: Metodo de inicialiacion del componente
   */
  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.ids = new ParamsModel({ proyecto_id: params['id'] });
      this.proyectoService.ids = this.ids;
      this.estadosProyectoService.ids = this.ids;
    });
    this.frmProyecto = this.formBuilder.group({
      nombre: ['', Validators.required],
      titulo: ['', Validators.required],
      codigo: ['', Validators.required],
      descripcion: [''],
      estado_proyecto: [null],
      financiador: [null, Validators.required],
      implementador: [null, Validators.required],
      // _fecha_inicio: new FormControl(this.proyecto._fecha_inicio, [Validators.required], []),
      // _fecha_fin: new FormControl(this.proyecto._fecha_fin, [Validators.required], []),
      // duracion: new FormControl({ value: this.proyecto.duracion, disabled: true }, Validators.required),
      gestor: [null, Validators.required],
      pais: [null, Validators.required],
      // ong_agrupacion: ['', Validators.required],
      provincia_municipio: ['', Validators.required],
      // socio_local: ['', Validators.required],
      coste_total: new FormControl({ value: null, disabled: true }),
      convocatoria: [null, Validators.required]
      // aportacion_financiador: [this.proyecto.aportacion_financiador, Validators.required],
      // aportacion_ong: ['', Validators.required],
    });
    this.frmProyecto.controls.convocatoria.valueChanges.subscribe((value: ConvocatoriaModel) => {
      if (value) {
        let control;
        if (this.isNew) {
          this.frmProyecto.controls.financiador.setValue([value.financiador]);
        } else {
          if (value.nombre.toLocaleLowerCase() === 'aecid') {
            control = this.frmProyecto.controls.financiador.value;
            if (control) {
              const result = control.filter(f => f._id === value.financiador._id);
              if (result && result.length === 0) {
                control.push(new AgenteModel(value.financiador));
                this.frmProyecto.controls.financiador.setValue(control);
              }
            }
            this.isAecid.next(true);
          } else {
            this.isAecid.next(false);
          }
        }
      }
    });
    this.initialize();
    this.loadFinanciadores();
    this.getEstadosProyecto();
    this.loadConvocatorias();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialize();
        this.loadFinanciadores();
        this.getEstadosProyecto();
        this.loadConvocatorias();
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  /**
   * Carga del proyecto seleccionado
   */
  initialize() {
    if (this.ids.proyecto_id) {
      this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
        if (resp) {
          this.isNew = false;
          this.proyecto = resp;
          this.accionElementosXEstado();
          if (this.proyecto.presupuestos) {
            this.setFinanciadores();
          }
          this.frmProyecto.patchValue(this.proyecto);
        }
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.proyecto = new ProyectoModel();
    }
  }

  /**
   * @description:Envio del formulario de detalle del proyecto a la bbdd
   */
  onSubmit() {
    // this.proyecto = Object.assign(this.proyecto, this.frmProyecto.value);
    if (this.isNew) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * @description:Creacion del detalle del proyecto
   */
  create() {
    // const proyecto = Object.assign(this.proyecto, this.frmProyecto.value);
    const proyecto = Object.assign({ _id: this.proyecto._id }, this.frmProyecto.value);

    this.proyectoService.post(proyecto).subscribe((resp) => {
      this.proyecto = resp;
      this.ids.proyecto_id = resp._id;
      this.router.navigate(['/proyectos/', resp._id, 'edit', 'datos-generales']);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * @description:Edicion del detalle del proyecto
   */
  edit() {
    // const proyecto = Object.assign(this.proyecto, this.frmProyecto.value);
    const proyecto = Object.assign({ _id: this.proyecto._id }, this.frmProyecto.value);
    this.proyectoService.put(proyecto._id, proyecto).subscribe((resp) => {
      this.proyecto = resp;
      this.ngOnInit();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  refresh() {
    this.router.navigate(['proyectos', this.proyecto._id, 'edit', 'datos-generales']);
  }

  changeEstado(estado: EstadoProyectoModel) {
    this.proyecto.estado_proyecto = estado;
  }
  // updateDuracion() {
  //   if (this.frmProyecto.controls._fecha_inicio.valid && this.frmProyecto.controls._fecha_fin.valid) {
  //     this.proyecto._fecha_inicio = this.frmProyecto.controls._fecha_inicio.value;
  //     this.proyecto._fecha_fin = this.frmProyecto.controls._fecha_fin.value;

  //     this.frmProyecto.controls.duracion.patchValue(this.proyecto.duracion);
  //   }
  // }

  private setFinanciadores() {
    const financiadores = {};
    let total = 0;
    this.proyecto.presupuestos.forEach(function (a) {
      financiadores[`${a.financiador.nombre}-${a.moneda.codigo}`] = financiadores[`${a.financiador.nombre}-${a.moneda.codigo}`] || [];
      financiadores[`${a.financiador.nombre}-${a.moneda.codigo}`].push({ importe: a.importe, moneda: a.moneda.codigo });
      total += a.importe;
    });
    this.financiadores = financiadores;
    this.frmProyecto.controls['coste_total'].setValue(total);
  }

  private getEstadosProyecto() {
    this.estadosProyectoService.all().subscribe(resp => {
      this.estados_proyecto = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: EstadoProyectoModel, c2: EstadoProyectoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  accionElementosXEstado() {
    Utils.accionControles(this.frmProyecto, this.controlesInactivos, this.estaEjecucion());
  }

  estaEjecucion() {
    const isEjecucion = this.proyecto.validateProjectState();
    if (isEjecucion && !this.proyecto.readonly) {
      this.controlesInactivos.push('estado_proyecto');
    }
    return isEjecucion;
  }
  compareConvocatoriaFn(c1: ConvocatoriaModel, c2: ConvocatoriaModel) {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
  private loadConvocatorias() {
    this.convocatoriaService.all().subscribe(resp => {
      this.convocatorias = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private loadFinanciadores() {
    this.financiadorService.all().subscribe((resp) => {
      this.combo_financiadores = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}



