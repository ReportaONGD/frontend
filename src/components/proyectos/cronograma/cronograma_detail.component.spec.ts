// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EjecucionActividadModel } from '../../../models/ejecucion_actividad.model';
import { ParamsModel } from '../../../models/params.model';
import { PlanificacionActividadModel } from '../../../models/planificacion_actividad.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { SharedModule } from '../../shared/shared.module';
import { ActividadModel } from '../../../models/actividad.model';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { CronogramaDetailComponent } from './cronograma_detail.component';

describe('Component: Cronograma Detail', () => {
  const actividad = new ActividadModel({
    _id: '5b03f6d8bd3cbf001109ddce',
    descripcion: 'desc AG',
    codigo: 'AG',
    global: false,
    planificacion_actividad: new PlanificacionActividadModel({
      _id: '0000000000',
      fecha_inicio: '01/05/2018',
      fecha_fin: '01/06/2018'
    }),
    ejecucion_actividad: new EjecucionActividadModel({
      _id: '0000000000',
      fecha_inicio: '09/05/2018',
      fecha_fin: '01/07/2018'
    })
  });
  let component: CronogramaDetailComponent;
  let fixture: ComponentFixture<CronogramaDetailComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CronogramaDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
        ResultadoActividadService,
        ProyectoService,
        ActividadGlobalService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' })
            }
          }
        }
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(CronogramaDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel(
      {
        proyecto_id: '5af41848a34974135c044edc'
      });
    fixture.detectChanges();
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
  it(`should on init`, (done: DoneFn) => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(ids.proyecto_id).toEqual(component.ids.proyecto_id);
      expect(component.initialize).toHaveBeenCalled();
      done();
    });
  });
  it(`should be on initialize`, (done: DoneFn) => {
    const service = fixture.debugElement.injector.get(ResultadoActividadService);
    service.ids = ids;
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad));
    component.initialize();
    fixture.whenStable().then(() => {
      component.actividad.subscribe((a) => {
        expect(a).toEqual(a);
      });
      done();
    });
  });
  it(`should be on submit`, () => {
    spyOn(component, 'edit');
    component.onSubmit();
    expect(component.edit).toHaveBeenCalled();
  });
  it(`should on edit`, () => {
    component.frmActividad.patchValue(actividad);
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
    const service = fixture.debugElement.injector.get(ResultadoActividadService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad));
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
