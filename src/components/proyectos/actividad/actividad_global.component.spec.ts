// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

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

import { ActividadModel } from '../../../models/actividad.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { DataProvider } from '../../../providers/data/data.provider';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { SharedModule } from '../../shared/shared.module';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';
import { ActividadGlobalComponent } from './actividad_global.component';

describe('Component: Actividad Global', () => {
  const proyecto = new ProyectoModel();
  const actividad = new ActividadModel({
    _id: '5b03f6d8bd3cbf001109ddce',
    descripcion: 'desc AG',
    codigo: 'AG',
    global: true
  });
  proyecto.actividad_global = actividad;
  let component: ActividadGlobalComponent;
  let fixture: ComponentFixture<ActividadGlobalComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ActividadGlobalComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        DataProvider,
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
              params: Observable.of({ proyecto_id: '5af41848a34974135c044edc' })
            }
          }
        }
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(ActividadGlobalComponent);
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
    // spyOn(console, 'log').and.callThrough();
  });
  /*
   *   COMPONENT BEFORE INIT
   */
  it(`should be initialized`, () => {
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it(`should on init`, () => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    expect(component.ids.proyecto_id).toEqual(undefined);
    expect(component.initialize).toHaveBeenCalled();
  });
  it(`should on initialize`, (done: DoneFn) => {
    spyOn(component, 'generateForm');
    const service = fixture.debugElement.injector.get(ProyectoService);
    service.ids = ids;
    spyOn(service, 'get').and.callFake(() => Observable.of(proyecto));
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.actividad.getValue()).toEqual(proyecto.actividad_global);
      done();
      expect(component.generateForm).toHaveBeenCalled();
    });
  });
  it(`should be on create`, () => {
    component.actividad = new BehaviorSubject<ActividadModel>(new ActividadModel());
    component.generateForm();
    component.frmActividad.patchValue(actividad);
    fixture.detectChanges();
    const service = fixture.debugElement.injector.get(ActividadGlobalService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(actividad));
    spyOn(component, 'initialize');
    component.create();
    expect(component.initialize).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
    component.generateForm();
    component.frmActividad.patchValue(actividad);
    fixture.detectChanges();
    const service = fixture.debugElement.injector.get(ActividadGlobalService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad));
    spyOn(component, 'initialize');
    component.edit();
    expect(component.initialize).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
  });
});
