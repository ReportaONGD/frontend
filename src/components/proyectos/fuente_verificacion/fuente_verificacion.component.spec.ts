// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../providers/common/common';
import { FuenteVerificacionComponent } from './fuente_verificacion.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { FuenteVerificacionModel } from '../../../models/fuente_verificacion.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { OEFuenteVerificacionService } from '../../../providers/proyecto/objetivo_especifico/indicador/fuente_verificacion/objetivo_especifico_fuente_verificacion.service';
import { ObjetivoEspecificoIndicadorService } from '../../../providers/proyecto/objetivo_especifico/indicador/objetivo_especifico_indicador.service';
// tslint:disable-next-line:max-line-length
import { ResultadoFuenteVerificacionService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/resultado_fuente_verificacion.service';
import { ResultadoIndicadorService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { SharedModule } from '../../shared/shared.module';
import { ParamsModel } from '../../../models/params.model';
import { OGFuenteVerificacionService } from '../../../providers/proyecto/objetivo/indicador/fuente_verificacion/fuente_verificacion.service';
import { IndicadorModel } from '../../../models/indicador.model';
describe('Component: Fuentes de Verificacion pra objetivos especificos', () => {
  const fuente_verificacion = new FuenteVerificacionModel({
    codigo: 'OE1.I1.FV1',
    descripcion: 'DESC OE1.I1.FV1'
  });
  const indicador = new IndicadorModel({
    _id: '5b03f6d8bd3cbf001109ccce',
    meta: 20,
    linea_base: 120,
    descripcion: 'desc OE1.I1',
    codigo: 'OE1.I1'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: FuenteVerificacionComponent;
  let fixture: ComponentFixture<FuenteVerificacionComponent>;
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [FuenteVerificacionComponent],
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
        OGFuenteVerificacionService,
        OEFuenteVerificacionService,
        ObjetivoEspecificoIndicadorService,
        ResultadoFuenteVerificacionService,
        ResultadoIndicadorService,
        ApiService,
        BaseService,
        Common,
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
        entryComponents: [Confirm2Component]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(FuenteVerificacionComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.indicador = indicador;
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' });
    // fixture.detectChanges();
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
  it(`should be on submit`, async(() => {
    const service = fixture.debugElement.injector.get(OEFuenteVerificacionService);
    component.service = service;
    component.fv = fuente_verificacion;
    fixture.detectChanges();
    spyOn(component, 'create');
    component.onSubmit();
    expect(component.create).toHaveBeenCalled();
  }));
  it(`should be on create`, async(() => {
    spyOn(component, 'initialize');
    component.fv = new FuenteVerificacionModel();
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' });
    const service = fixture.debugElement.injector.get(OEFuenteVerificacionService);
    component.service = service;
    service.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc', objetivo_especifico_id: '1', indicador_id: '1' });
    component.frmFV = new FormBuilder().group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    fixture.detectChanges();
    component.create();
    expect(component.initialize).toHaveBeenCalled();
  }));
  it(`should be on edit`, async(() => {
    spyOn(component, 'initialize');
    component.fv = fuente_verificacion;
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' });
    component.frmFV = new FormBuilder().group({
      codigo: [fuente_verificacion.codigo, Validators.required],
      descripcion: [fuente_verificacion.descripcion, Validators.required]
    });
    const service = fixture.debugElement.injector.get(OEFuenteVerificacionService);
    component.service = service;
    fixture.detectChanges();
    component.edit();
    expect(component.initialize).toHaveBeenCalled();
  }));
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(fuente_verificacion);
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
