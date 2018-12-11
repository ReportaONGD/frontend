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
import { ResultadosComponent } from './resultados.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {IndicadorModel} from '../../../models/indicador.model';
import { ResultadoService } from '../../../providers/proyecto/objetivo_especifico/resultado/resultado.service';
import { SharedModule } from '../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../models/params.model';
import { ActividadDetailComponent } from '../actividad/actividad_detail.component';
import { IndicadoresDetailComponent } from '../indicadores/indicador_detail.component';
import { ObjetivoModel } from '../../../models/objetivo.model';
import { ResultadoModel } from '../../../models/resultado.model';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import {
  ResultadoFuenteVerificacionService
} from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/resultado_fuente_verificacion.service';
import { ResultadoComentariosService } from '../../../providers/proyecto/objetivo_especifico/resultado/comentarios/comentarios.service';
import { ResultadoMedidaService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/medida/resultado_medida.service';
import {
  ResultadoFuenteVerificacionDocumentoService
 } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { ResultadoHipotesisService } from '../../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
describe('Component: Resultados', () => {
  const indicador = new IndicadorModel({
      _id: '5b03f6d8bd3cbf001109ccce',
      meta: 20,
      linea_base: 120,
      descripcion: 'desc OE1.I1',
      codigo: 'OE1.I1'
    });
  const objetivo_especifico = new ObjetivoModel({
      _id: '5b02a91abd3cbf001109caac',
      codigo: 'OE1',
      descripcion: 'DESC OE1',
      general: false
  });
  const resultado = new ResultadoModel({
    _id: '5b04082dbd3cbf001109cd30',
    codigo: 'OE1.R1',
    descripcion: 'DESC OE1.R1',
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;
  const ids = new ParamsModel({
      proyecto_id: undefined,
      objetivo_especifico_id: undefined
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ResultadosComponent, IndicadoresDetailComponent, ActividadDetailComponent, ComentariosComponent ],
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
        ResultadoService,
        ResultadoFuenteVerificacionService,
        ResultadoComentariosService,
        ResultadoMedidaService,
        ResultadoFuenteVerificacionDocumentoService,
        ResultadoHipotesisService,
        ProyectoService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: Observable.of({proyecto_id: '5af41848a34974135c044edc'})
              }
            }
        }
      ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component, IndicadoresDetailComponent, ActividadDetailComponent, ComentariosComponent ]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(ResultadosComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: undefined, objetivo_especifico_id: undefined});
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
  it(`should on selectObjetivo`, () => {
    spyOn(component, 'all');
    component.selectObjetivo(objetivo_especifico);
    expect(component.isAdd).toEqual(true);
    expect(component.isObjetivoSelected).toEqual(true);
    expect(component.objetivo_especifico).toEqual(objetivo_especifico);
    expect(component.titleResultado).toEqual(`Resultados para el Objetivo Especifico: ${ objetivo_especifico.codigo }`);
    expect(component.all).toHaveBeenCalled();
  });
  it(`should on addResultado`, () => {
    spyOn(component, 'all');
    component.addResultado(objetivo_especifico);
    expect(component.isAdd).toEqual(false);
    expect(component.isEdit).toEqual(false);
    expect(component.isObjetivoSelected).toEqual(true);
    expect(component.objetivo_especifico).toEqual(objetivo_especifico);
    expect(component.titleResultado).toEqual(`Inclusión de un Resultado para el Objetivo Especifico: ${ objetivo_especifico.codigo}`);
    expect(component.all).toHaveBeenCalled();
  });
  it(`should on addNewResultado`, () => {
    component.addNewResultado();
    expect(component.isAdd).toEqual(false);
    expect(component.isEdit).toEqual(false);
    expect(component.resultado).toEqual(new ResultadoModel());
  });
  it(`should on cancelSaveResultado`, () => {
    component.cancelSaveResultado();
    expect(component.isAdd).toEqual(true);
  });
  it(`should on selectResultado`, () => {
    component.resultado = resultado;
    component.selectResultado(resultado);
    expect(component.isEdit).toEqual(true);
  });
  it(`should on editResultado`, () => {
    spyOn(component, 'selectResultado');
    component.editResultado(resultado);
    expect(component.selectResultado).toHaveBeenCalled();
  });
  it(`should on submit`, () => {
    spyOn(component, 'create');
    component.resultado = new ResultadoModel();
    fixture.detectChanges();
    component.onSubmit();
    expect(component.create).toHaveBeenCalled();
    spyOn(component, 'edit');
    component.resultado = resultado;
    fixture.detectChanges();
    component.onSubmit();
    expect(component.edit).toHaveBeenCalled();
  });
  it(`should on create`, () => {
    spyOn(component, 'all');
    component.frmResultado.patchValue(resultado);
    component.resultado = resultado;
    fixture.detectChanges();
    expect(component.frmResultado.valid).toBeTruthy();
    const service = fixture.debugElement.injector.get(ResultadoService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(resultado));
    component.create();
    expect(component.resultado).toEqual(resultado);
    expect(component.all).toHaveBeenCalled();
  });
  it(`should on edit`, () => {
    spyOn(component, 'all');
    component.frmResultado.patchValue(resultado);
    component.resultado = resultado;
    fixture.detectChanges();
    expect(component.frmResultado.valid).toBeTruthy();
    const service = fixture.debugElement.injector.get(ResultadoService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(resultado));
    component.edit();
    expect(component.resultado).toEqual(resultado);
    expect(component.all).toHaveBeenCalled();
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(indicador);
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
