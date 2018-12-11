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

import { ActividadComponent } from './actividad.component';
import {ResultadoModel} from '../../../models/resultado.model';
import {ActividadModel} from '../../../models/actividad.model';
import {DataProvider} from '../../../providers/data/data.provider';
import { ActividadDetailComponent } from './actividad_detail.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ResultadoActividadService } from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { CronogramaDetailComponent } from '../cronograma/cronograma_detail.component';

describe('Component: Actividad', () => {
  const array = [new ActividadModel({
    _id: '5b03f6d8bd3cbf001109ccce',
    descripcion: 'desc OE1.R1.A1',
    codigo: 'OE1.R1.A1',
    global: false
  })];
  const actividades = new BehaviorSubject<Array<ActividadModel>>(array);
  const resultado = new ResultadoModel({
    _id: '5b04082dbd3cbf001109cd30',
    codigo: 'OE1.R1',
    descripcion: 'DESC OE1.R1',
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: ActividadComponent;
  let fixture: ComponentFixture<ActividadComponent>;
  const ids = new BehaviorSubject<ParamsModel>({
      proyecto_id: undefined,
      objetivo_especifico_id: undefined,
      resultado_id: undefined
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ActividadComponent, ActividadDetailComponent, CronogramaDetailComponent],
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
        ResultadoActividadService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: new ParamsModel({proyecto_id: '5af41848a34974135c044edc'})
              }
            }
        }
      ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component, CronogramaDetailComponent, ActividadDetailComponent]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(ActividadComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: undefined, objetivo_especifico_id: undefined, resultado_id: undefined});
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
  it(`should on init`, () => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    expect(component.initialize).toHaveBeenCalled();
  });
  it(`should on initialize`, (done: DoneFn) => {
    const service = fixture.debugElement.injector.get(ResultadoActividadService);
    service.ids = ids;
    spyOn(service, 'all').and.callFake(() => Observable.of(actividades));
    component.initialize();
    fixture.whenStable().then(() => {
      component.actividades = new BehaviorSubject<ActividadModel[]>(array);
      component.actividades.subscribe((acs) => {
        expect(acs).toEqual(array);
      });
      done();
    });
  });
  it(`should on addNewActividad`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(ActividadDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.addNewActividad();
    expect(modalRef.componentInstance.title).toEqual('Nueva Actividad');
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it(`should on editActividad`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(ActividadDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    let actividad;
    actividades.subscribe((a) => {
      actividad = a[0];
    });
    component.editActividad(actividad);
    expect(modalRef.componentInstance.actividad.getValue()).toEqual(actividad);
    expect(modalRef.componentInstance.title).toEqual(`Actividad: ${actividad.codigo}`);
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it(`should on addCronograma`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CronogramaDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    let actividad;
    actividades.subscribe(a => actividad = a);
    component.addCronograma(actividad);
    expect(modalRef.componentInstance.title).toEqual(`Cronograma para la actividad: ${actividad.codigo}`);
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    let actividad;
    actividades.subscribe(a => actividad = a);
    component.openModalRemove(actividad);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
 });
});
