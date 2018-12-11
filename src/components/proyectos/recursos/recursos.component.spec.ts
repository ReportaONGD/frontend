// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../providers/common/common';
import { RecursoComponent } from './recursos.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { RecursoModel } from '../../../models/recurso.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    ActividadRecursoService
} from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/recursos/actividad_recurso.service';
import {
    ResultadoActividadService
} from '../../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';
import { ActividadGlobalRecursoService } from '../../../providers/proyecto/actividad_global/recursos/actividad_global_recurso.service';
import { SharedModule } from '../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../models/params.model';
import { ActividadModel } from '../../../models/actividad.model';
describe('Component: Recurso para Actividad', () => {
  const recurso = new RecursoModel({
      coste: 100,
      descripcion: 'DESC R1'
  });
  const actividad = new ActividadModel({
    _id: '5b03f6d8bd3cbf001109ccce',
    descripcion: 'desc OE1.I1',
    codigo: 'OE1.I1'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: RecursoComponent;
  let fixture: ComponentFixture<RecursoComponent>;
  const ids = new ParamsModel({
      proyecto_id: undefined,
      objetivo_especifico_id: undefined,
      indicador_id: undefined
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [RecursoComponent],
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
        ActividadRecursoService,
        ResultadoActividadService,
        ResultadoActividadService,
        ActividadGlobalService,
        ActividadGlobalRecursoService,
        ApiService,
        BaseService,
        Common,
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
          entryComponents: [Confirm2Component]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(RecursoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: undefined});
    component.isResultado = true;
    component.actividad = new BehaviorSubject<ActividadModel>(actividad);
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
  it(`should retrieve param id from parent route params`, async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.isResultado).toEqual(true);
      expect(component.ids.proyecto_id).toEqual(undefined);
      expect(component.ids.objetivo_especifico_id).toEqual(undefined);
      expect(component.ids.actividad_id).toEqual(undefined);
    });
  }));
  it(`should be on submit`, async(() => {
    expect(component.isResultado).toBeDefined(false);
    component.recurso = recurso;
    fixture.detectChanges();
    spyOn(component, 'saveRA');
    component.onSubmit();
    expect(component.saveRA).toHaveBeenCalled();
  }));
  it(`should be when createRA is called`, async(() => {
    component.ngOnInit();
    component.frmRecurso.patchValue(recurso);
    component.recurso = recurso;
    fixture.detectChanges();
    expect(component.frmRecurso.valid).toBeTruthy();
    const service = fixture.debugElement.injector.get(ActividadRecursoService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(recurso));
    spyOn(component, 'loadRA');
    component.createRA();
    expect(component.recurso).toEqual(recurso);
    expect(component.loadRA).toHaveBeenCalled();
  }));
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(recurso);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  afterEach(() => {
    fixture.destroy();
    // component.ngOnDestroy();
 });
});
