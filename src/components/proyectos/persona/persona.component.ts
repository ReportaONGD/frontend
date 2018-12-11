import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratoModel } from '../../../models/contrato.model';
import { ParamsModel } from '../../../models/params.model';
import { PersonaModel } from '../../../models/persona.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { TipoPersonalModel } from '../../../models/tipo_personal.model';
import { CategoriaService } from '../../../providers/catalogos/categoria.service';
import { ContratoService } from '../../../providers/catalogos/contrato.service';
import { TipoPersonalService } from '../../../providers/catalogos/tipo_personal.service';
import { Common } from '../../../providers/common/common';
import { PersonaService } from '../../../providers/proyecto/persona/persona.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Utils } from '../../../utils/utils';
import { CategoriaModel } from '../../../models/categoria.model';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
  selector: 'app-personas-component',
  templateUrl: './persona.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [PersonaService, CategoriaService, ContratoService, TipoPersonalService, Common],
  entryComponents: [Confirm2Component]
})
export class PersonaComponent implements OnInit {
  frmPersona: FormGroup;
  showForm = false;
  isNew = false;
  isEjecucion = false;
  salario_mensual_formateado: string[];
  salario_total_formateado: string[];
  personal_tipos: TipoPersonalModel[];
  categorias: CategoriaModel[];
  contratos: ContratoModel[];
  personas: PersonaModel[];
  persona: PersonaModel;
  ids: ParamsModel;
  showAlertCategoria: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // Esta variable controla los componentes que queremos que esten activos
  controlesInactivos = [];

  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private categoriaService: CategoriaService,
    private contratoService: ContratoService,
    private tipoPersonalService: TipoPersonalService,
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.personaService.ids = this.ids;
      });
    }
    this.frmPersona = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: [null, Validators.required],
      residencia: ['', Validators.required],
      contrato: [null, Validators.required],
      tipo_personal: [null, Validators.required],
      horas_imputadas: ['', Validators.required],
      salario_mensual: [null, Validators.required],
      salario_total: [null, Validators.required],
      meses: [null, Validators.required]
    });
    this.initialize();
    this.loadCategorias();
    this.loadContratos();
    this.loadTipoPersonal();
    this.getProyecto();
  }

  initialize() {
    this.isNew = false;
    this.showForm = false;
    this.salario_mensual_formateado = new Array<string>();
    this.salario_total_formateado = new Array<string>();
    this.personas = new Array<PersonaModel>();
    this.personaService.all().subscribe((resp) => {
      // this.personas = resp;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const salario_mensual = Utils.formatMoney(element.salario_mensual);
        const salario_total = Utils.formatMoney(element.salario_total);
        this.salario_mensual_formateado.push(salario_mensual);
        this.salario_total_formateado.push(salario_total);
        this.personas.push(element);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  add() {
    this.persona = new PersonaModel();
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = true;
  }

  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.edit();
    }
  }

  onEdit(item) {
    this.persona = item;
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = false;
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Personaa';
    modalRef.componentInstance.message = `¿Desea eliminar la Persona ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  create() {
    this.personaService.post(this.frmPersona.value).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const persona = Object.assign(this.persona, this.frmPersona.value);
    this.personaService.put(persona._id, persona).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(persona) {
    this.personaService.delete(persona._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.personas && this.personas.length === 0;
  }
  compareContratoFn(c1: ContratoModel, c2: ContratoModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
  compareTipoFn(c1: TipoPersonalModel, c2: TipoPersonalModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
  compareCategoriaFn(c1: CategoriaModel, c2: CategoriaModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
  private generateForm() {
    this.frmPersona.patchValue(this.persona);
  }
  private loadCategorias() {
    this.categoriaService.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertCategoria.next(false);
        this.categorias = resp;
      } else {
        this.showAlertCategoria.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  private loadTipoPersonal() {
    this.tipoPersonalService.all().subscribe((resp) => {
      this.personal_tipos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  private loadContratos() {
    this.contratoService.all().subscribe((resp) => {
      this.contratos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
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
    Utils.accionControles(this.frmPersona, this.controlesInactivos, this.isEjecucion);
  }
}
