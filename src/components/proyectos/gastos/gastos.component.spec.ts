// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { GastoModel } from '../../../models/gasto.model';
import { ParamsModel } from '../../../models/params.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { GastosDocumentosService } from '../../../providers/proyecto/gastos/documentos/gastos_documentos.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { GastosService } from '../../../providers/proyecto/gastos/gastos.service';
import { GastosComponent } from './gastos.component';
import { GastosDetailComponent } from './gastos_detail.component';

describe('Component: Gastos', () => {
  const gasto = new GastoModel({
    _id: '1',
    fecha: new Date(),
    numero_orden: '12345',
    emisor: 'string',
    concepto: 'string',
    importe_local: 1,
    tipo_de_cambio_dm: 1,
    tipo_de_cambio_ld: 1,
    moneda: null,
    partida: null,
    financiador: null,
    actividad: null,
    documentos: null
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: GastosComponent;
  let fixture: ComponentFixture<GastosComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [GastosComponent, GastosDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        PipesModule.forRoot(),
        SharedModule
      ],
      providers: [
        ProyectoService,
        GastosDocumentosService,
        GastosService,
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
        entryComponents: [Confirm2Component, GastosDetailComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(GastosComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' });
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
  it(`should on add`, async (done: DoneFn) => {
    component.ids = ids;
    component.gasto = new GastoModel();
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(GastosDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.add();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
    expect(modalRef.componentInstance.title).toEqual(`Nuevo Gasto`);
    expect(modalRef.componentInstance.gasto).toEqual(new GastoModel());
    expect(modalRef.componentInstance.ids).toEqual(ids);
      modalRef.close();
      done();
    });
  });
  it('should open edit modal window', (done: DoneFn) => {
    component.ids = ids;
    component.gasto = gasto;
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(GastosDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.edit(gasto);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toEqual(`Gasto: ${gasto.numero_orden}`);
      expect(modalRef.componentInstance.gasto).toEqual(gasto);
      expect(modalRef.componentInstance.ids).toEqual(ids);
      modalRef.close();
      done();
    });
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(gasto);
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
