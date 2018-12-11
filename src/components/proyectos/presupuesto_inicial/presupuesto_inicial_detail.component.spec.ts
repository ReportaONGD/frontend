// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { ActividadModel } from '../../../models/actividad.model';
import { EtapaModel } from '../../../models/etapa.model';
import { FinanciadorModel } from '../../../models/financiador.model';
import { MonedaModel } from '../../../models/moneda.model';
import { PaisModel } from '../../../models/pais.model';
import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { PresupuestoModel } from '../../../models/presupuesto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { SharedModule } from '../../shared/shared.module';
import { PresupuestoInicialDetailComponent } from './presupuesto_inicial_detail.component';
import { Observable } from 'rxjs/Observable';
import { PresupuestoService } from '../../../providers/proyecto/presupuesto/presupuesto.service';
import { ProyectoModel } from '../../../models/proyecto.model';

describe('Component: Presupuesto Inicial Detail', () => {
  const proyecto = new ProyectoModel({
    '_id': 'sdsadasdasdasds',
    'aportacion_ong': 100,
    'coste_total': 200,
    'socio_local': '120',
    // 'duracion': 1,
    'provincia_municipio': 'Provincia',
    'ong_agrupacion': 'Ong_agrupacion',
    'gestor': 'gestor',
    'titulo': 'Proyecto 1',
    'nombre': 'Proyecto 1',
    'codigo': 'Proyecto_1',
    'pais': [{
      _id: '5af414eba34974135c044d2c',
      valor: 'Afghanistan'
    }]
  });
const presupuesto = new PresupuestoModel({
    _id: '5b04082dbd3cbf001109cd30',
    importe: 2000,
    etapa: new EtapaModel(),
    pais: new PaisModel(),
    actividad: new ActividadModel(),
    financiador: new FinanciadorModel(),
    moneda: new MonedaModel(),
    partida: new PartidaModel()
    });
  let component: PresupuestoInicialDetailComponent;
  let fixture: ComponentFixture<PresupuestoInicialDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc',
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PresupuestoInicialDetailComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        ApiService,
        BaseService,
        PresupuestoService,
        NgbActiveModal,
        Common
        // {
        //   provide: ActivatedRoute,
        //     useValue: {
        //       parent: {
        //         params: Observable.of({proyecto_id: '5af41848a34974135c044edc'})
        //       }
        //     }
        // }
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PresupuestoInicialDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.proyecto = proyecto;
    component.ids = new ParamsModel({proyecto_id: '5af41848a34974135c044edc'});
    NgbTooltip.prototype.ngOnDestroy = jasmine.createSpy('ngOnDestroy');
    (NgbTooltip.prototype.ngOnDestroy as jasmine.Spy).and.stub();
    NgbPopover.prototype.ngOnDestroy = jasmine.createSpy('ngOnDestroy');
    (NgbPopover.prototype.ngOnDestroy as jasmine.Spy).and.stub();
    spyOn(console, 'log').and.callThrough();
  });
 /*
  *   COMPONENT BEFORE INIT
  */
  it(`should be initialized`, () => {
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it(`should be on create`, () => {
    component.presupuesto = new PresupuestoModel();
    component.ids = ids;
    component.ngOnInit();
    component.frmPresupuesto.patchValue(presupuesto);
    const service = fixture.debugElement.injector.get(PresupuestoService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(presupuesto));
    spyOn(component, 'close');
    component.create();
    expect(component.close).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.presupuesto = presupuesto;
    component.ids = ids;
    component.ngOnInit();
    component.frmPresupuesto.patchValue(presupuesto);
    const service = fixture.debugElement.injector.get(PresupuestoService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(presupuesto));
    spyOn(component, 'close');
    component.edit();
    expect(component.close).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
 });
});
