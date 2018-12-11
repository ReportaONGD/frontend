// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { IndicadorModel } from '../../../models/indicador.model';
import { ParamsModel } from '../../../models/params.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import {
  ObjetivoEspecificoIndicadorService,
} from '../../../providers/proyecto/objetivo_especifico/indicador/objetivo_especifico_indicador.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { MedidasComponent } from '../medidas/medidas.component';
import {
  ResultadoIndicadorService,
} from '../../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { IndicadoresDetailComponent } from './indicador_detail.component';
import { IndicadoresComponent } from './indicadores.component';
import { IndicadorService } from '../../../providers/proyecto/objetivo/indicador/indicador.service';
describe('Component: Indicadores para objetivos especificos', () => {
  const indicador = new IndicadorModel({
      _id: '5b03f6d8bd3cbf001109ccce',
      meta: 20,
      linea_base: 120,
      descripcion: 'desc OE1.I1',
      codigo: 'OE1.I1'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: IndicadoresComponent;
  let fixture: ComponentFixture<IndicadoresComponent>;
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [IndicadoresComponent, IndicadoresDetailComponent, MedidasComponent ],
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
        IndicadorService,
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
          entryComponents: [Confirm2Component, IndicadoresDetailComponent ]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(IndicadoresComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    NgbTooltip.prototype.ngOnDestroy = jasmine.createSpy('ngOnDestroy');
    (NgbTooltip.prototype.ngOnDestroy as jasmine.Spy).and.stub();
    NgbPopover.prototype.ngOnDestroy = jasmine.createSpy('ngOnDestroy');
    (NgbPopover.prototype.ngOnDestroy as jasmine.Spy).and.stub();
  });
 /*
  *   COMPONENT BEFORE INIT
  */
  it(`should be initialized`, () => {
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
    it(`should on addNewIndicador`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(IndicadoresDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.addNewIndicador();
    expect(modalRef.componentInstance.title).toEqual('Nuevo Indicador');
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
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
