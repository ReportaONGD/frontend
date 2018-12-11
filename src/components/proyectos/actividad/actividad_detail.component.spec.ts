// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef, NgbPopover, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../providers/common/common';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../enums/project_endpoints';
import { SharedModule } from '../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../models/params.model';
import { ActivatedRoute } from '@angular/router';

import { ActividadDetailComponent } from './actividad_detail.component';
import { PlanificacionActividadModel } from '../../../models/planificacion_actividad.model';
import { EjecucionActividadModel } from '../../../models/ejecucion_actividad.model';
import { ActividadModel } from '../../../models/actividad.model';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { DataProvider } from '../../../providers/data/data.provider';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';

describe('Component: Actividad Detail', () => {
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
  let component: ActividadDetailComponent;
  let fixture: ComponentFixture<ActividadDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc',
      objetivo_especifico_id: '5af41848a34974135c044edc',
      resultado_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ActividadDetailComponent],
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
        DataProvider,
        ProyectoService,
        ResultadoActividadService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal
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
    fixture = TestBed.createComponent(ActividadDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel(
      {
        proyecto_id: '5af41848a34974135c044edc',
        objetivo_especifico_id: '5af41848a34974135c044edc',
        resultado_id: '5af41848a34974135c044edc'
      });
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
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it(`should on init`, () => {
    spyOn(component, 'initialize');
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
    component.ngOnInit();
    expect(component.ids).toEqual(ids);
    expect(component.initialize).toHaveBeenCalled();
  });
  it(`should be on submit`, () => {
    spyOn(component, 'create');
    component.actividad = new BehaviorSubject<ActividadModel>(new ActividadModel());
    fixture.detectChanges();
    component.onSubmit();
    expect(component.create).toHaveBeenCalled();
    spyOn(component, 'edit');
    component.actividad.next(actividad);
    fixture.detectChanges();
    component.onSubmit();
    expect(component.edit).toHaveBeenCalled();
  });
  it(`should be on create`, async(() => {
    component.actividad = new BehaviorSubject<ActividadModel>(new ActividadModel());
    component.ngOnInit();
    component.frmActividad.patchValue(actividad);
    component.frmActividad.get('planificacion_actividad').get('fecha_inicio').setValue({
      year: 2018,
      month: 5,
      day: 1
    });
    component.frmActividad.get('planificacion_actividad').get('fecha_fin').setValue({
      year: 2018,
      month: 6,
      day: 1
    });
    fixture.detectChanges();
    const service = fixture.debugElement.injector.get(ResultadoActividadService);
    service.ids = ids;
    spyOn(component, 'close');
    spyOn(service, 'post').and.callFake(() => Observable.of(actividad));
    component.create();
    expect(component.close).toHaveBeenCalled();
  }));
  it(`should be on edit`, async(() => {
    spyOn(component, 'close');
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
    component.ngOnInit();
    component.frmActividad.patchValue(actividad);
    component.frmActividad.get('planificacion_actividad').get('fecha_inicio').setValue({
      year: 2018,
      month: 5,
      day: 1
    });
    component.frmActividad.get('planificacion_actividad').get('fecha_fin').setValue({
      year: 2018,
      month: 6,
      day: 1
    });
    fixture.detectChanges();
    const service = fixture.debugElement.injector.get(ResultadoActividadService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad));
    component.edit();
    expect(component.close).toHaveBeenCalled();
  }));
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
 });
});
