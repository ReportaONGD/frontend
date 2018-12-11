// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { DataProvider } from '../../../providers/data/data.provider';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { SharedModule } from '../../shared/shared.module';
import { ActividadGlobalService } from '../../../providers/proyecto/actividad_global/actividad_global.service';
import { CronogramaComponent } from './cronograma.component';
import { CronogramaDetailComponent } from './cronograma_detail.component';

describe('Component: Cronograma', () => {
  const fecha_inicio = {year: 2018, month: 3, day: 1};
  const fecha_fin = {year: 2018, month: 4, day: 1};
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
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let ds: NgbCumstonDateParserFormatter;
  let component: CronogramaComponent;
  let fixture: ComponentFixture<CronogramaComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  const value = 'OE1.R1.A1';
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CronogramaComponent, CronogramaDetailComponent],
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
        DataProvider,
        ProyectoService,
        ActividadGlobalService,
        NgbCumstonDateParserFormatter,
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
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [CronogramaDetailComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(CronogramaComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
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
  it(`should on init`, async(() => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    expect(component.initialize).toHaveBeenCalled();
  }));
  it(`should be on initialize`, (done: DoneFn) => {
    const service = fixture.debugElement.injector.get(ProyectoService);
    service.ids = ids;
    spyOn(service, 'get').and.callFake(() => Observable.of(proyecto));
    component.initialize();
    fixture.whenStable().then(() => {
      component.project.subscribe((p) => {
        expect(p).toEqual(proyecto);
      });
      done();
    });
  });
  it(`should be on createProjectGantt`, (done: DoneFn) => {
    const fecha_ini = new Date(fecha_inicio.year, fecha_inicio.month - 1, fecha_inicio.day);
    const fecha_f = new Date(fecha_fin.year, fecha_fin.month - 1, fecha_fin.day);
    ds = TestBed.get(NgbCumstonDateParserFormatter);
    component.project = new BehaviorSubject<ProyectoModel>(proyecto);
    component.startDateProject = fecha_inicio;
    component.endDateProject = fecha_fin;
    fixture.detectChanges();
    spyOn(component, 'createTask');
    component.projectGantt = {};
    component.createProjectGantt();
    fixture.whenStable().then(() => {
      expect(component.projectGantt.name).toEqual(`Proyecto: ${proyecto.codigo} -  ${proyecto.nombre}`);
      expect(component.projectGantt.startDate).toEqual(fecha_ini);
      expect(component.projectGantt.endDate).toEqual(fecha_f);
      done();
    });
    expect(component.createTask).toHaveBeenCalled();
  });
  it(`should on edit`, async(() => {
    component.project = new BehaviorSubject<ProyectoModel>(proyecto);
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CronogramaDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.edit(value);
    expect(modalRef.componentInstance.title).toEqual(undefined);
  }));
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
  });
});
