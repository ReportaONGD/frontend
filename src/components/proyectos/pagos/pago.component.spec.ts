// /* tslint:disable:no-unused-variable */
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
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { PagoModel } from '../../../models/pago.model';
import { ParamsModel } from '../../../models/params.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { PagoService } from '../../../providers/proyecto/pagos/pago.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { PagoComponent } from './pago.component';
import { PagoDetailComponent } from './pago_detail.component';



describe('Component: Pago', () => {
  const pago = new PagoModel({
    _id: '0',
    concepto: 'concepto',
    num_cheque: '00001111',
    fecha: '01/01/18',
    importe: 100,
    tipo_movimiento: null,
    cuenta_origen: null,
    cuenta_destino: null
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PagoComponent, PagoDetailComponent],
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
        PagoService,
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
        entryComponents: [Confirm2Component, PagoDetailComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PagoComponent);
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
  it(`should on addPago`, async(() => {
    spyOn(component, 'openModal');
    component.addPago();
    expect(component.openModal).toHaveBeenCalled();
  }));
  it(`should on edit`, async(() => {
    spyOn(component, 'openModal');
    component.editPago(pago);
    expect(component.openModal).toHaveBeenCalled();
  }));
  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(PagoDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModal(pago);
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
    component.openModalConfirm(pago);
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
