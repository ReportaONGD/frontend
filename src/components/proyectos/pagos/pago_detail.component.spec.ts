// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
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
import { SharedModule } from '../../shared/shared.module';
import { PagoDetailComponent } from './pago_detail.component';



describe('Component: Pago Detail', () => {
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

  let component: PagoDetailComponent;
  let fixture: ComponentFixture<PagoDetailComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PagoDetailComponent],
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
        PagoService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PagoDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' });
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
    component.pago = pago;
    component.ids = ids;
    expect(component).toBeDefined();
  });
  it(`should be on create`, () => {
    component.pago = pago;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(PagoService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(pago));
    spyOn(component, 'onClose');
    component.create();
    expect(component.onClose).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.pago = pago;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(PagoService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(pago));
    spyOn(component, 'onClose');
    component.update();
    expect(component.onClose).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
  });
});
