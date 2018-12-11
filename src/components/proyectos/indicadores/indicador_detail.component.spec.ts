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
import { IndicadoresDetailComponent } from './indicador_detail.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {IndicadorModel} from '../../../models/indicador.model';
import { ObjetivoEspecificoIndicadorService } from '../../../providers/proyecto/objetivo_especifico/indicador/objetivo_especifico_indicador.service';
import { ResultadoIndicadorService } from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { IndicadorService } from '../../../providers/proyecto/objetivo/indicador/indicador.service';
import { SharedModule } from '../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../models/params.model';
describe('Component: Indicador Detail para objetivos especificos', () => {
    const indicador = new IndicadorModel({
        _id: '5b03f6d8bd3cbf001109ccce',
        meta: 20,
        linea_base: 120,
        descripcion: 'desc OE1.I1',
        codigo: 'OE1.I1'
      });
  let component: IndicadoresDetailComponent;
  let fixture: ComponentFixture<IndicadoresDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '1',
      objetivo_especifico_id: '1'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [IndicadoresDetailComponent],
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
        ResultadoIndicadorService,
        ObjetivoEspecificoIndicadorService,
        IndicadorService,
        ApiService,
        BaseService,
        NgbActiveModal,
        Common,
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
    // create component and test fixture
    fixture = TestBed.createComponent(IndicadoresDetailComponent);
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
  it(`should be on create`, () => {
    component.indicador = new IndicadorModel();
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoIndicadorService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    spyOn(service, 'post').and.callFake(() => Observable.of(indicador));
    spyOn(component, 'close');
    component.create();
    expect(component.close).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.indicador = indicador;
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoIndicadorService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    spyOn(service, 'put').and.callFake(() => Observable.of(indicador));
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
