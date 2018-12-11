// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../../providers/common/common';
import { ObjetivosEspecificosComponent } from './objetivos_especificos.component';
import { Confirm2Component } from '../../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../../providers/base/api.service';
import { BaseService } from '../../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../../models/params.model';
import { ProyectoModel } from '../../../../models/proyecto.model';
import { ObjetivoEspecificoService } from '../../../../providers/proyecto/objetivo_especifico/objetivo_especifico.service';
import { ProyectoService } from '../../../../providers/proyecto/proyecto.service';
import { IndicadoresDetailComponent } from '../../indicadores/indicador_detail.component';
import { ComentariosComponent } from '../../comentarios/comentarios.component';
import { EstadoProyectoModel } from '../../../../models/estado_proyecto.model';
describe('Component: Objetivo Especifico', () => {
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
    }],
    'estado_proyecto': new EstadoProyectoModel({
      _id: '2',
      nombre: 'e1',
      final: false,
    })
  });
  const objetivos_especificos = new Array<ObjetivoModel>();
  objetivos_especificos.push({
        _id: '5b02a91abd3cbf001109caac',
        codigo: 'OE1',
        descripcion: 'DESC OE1',
        general: false
  });
  const _id = '5af41848a34974135c044edc';
  proyecto.objetivos_especificos = objetivos_especificos;
  let component: ObjetivosEspecificosComponent;
  let fixture: ComponentFixture<ObjetivosEspecificosComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const ids = new ParamsModel({
    proyecto_id: undefined
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ObjetivosEspecificosComponent, IndicadoresDetailComponent, ComentariosComponent],
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
        ObjetivoEspecificoService,
        ProyectoService,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: Observable.of({proyecto_id: '5af41848a34974135c044edc'})
              }
            }
        }
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component, IndicadoresDetailComponent, ComentariosComponent ]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(ObjetivosEspecificosComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = {
      proyecto_id: undefined,
      objetivo_especifico_id: objetivos_especificos[0]._id
    };
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
  it(`should retrieve param id from parent route params`, (done: DoneFn) => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids.proyecto_id).toEqual(undefined);
      expect(component.ids.objetivo_id).toEqual(undefined);
      done();
    });
  });
  it(`should be on on inititialize`, (done: DoneFn) => {
    component.proyecto = proyecto;
    const proyectoService = fixture.debugElement.injector.get(ProyectoService);
    spyOn(proyectoService, 'get').and.callFake(() => Observable.of(proyecto));
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.proyecto).toEqual(proyecto);
      expect(component.showAlert.getValue()).toBe(false);
      done();
    });
  });
  it(`should be selectObjetivo`, () => {
    component.selectObjetivo(objetivos_especificos[0]);
    fixture.whenStable().then(() => {
      ids.objetivo_especifico_id = objetivos_especificos[0]._id;
      expect(component.ids.objetivo_especifico_id).toEqual(objetivos_especificos[0]._id);
    });
  });
  it(`should be editObjetivo`, () => {
    component.editObjetivo(objetivos_especificos[0]);
    fixture.whenStable().then(() => {
      expect(component.selectObjetivo(objetivos_especificos[0])).toHaveBeenCalled();
    });
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(objetivos_especificos[0]);
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
