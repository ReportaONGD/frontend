// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule, NgbPopover, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { OperacionBancariaModel } from '../../../models/operacion_bancaria.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { OperacionBancariaComponent } from './operaciones_bancarias.component';
import { OperacionBancariaService } from '../../../providers/proyecto/cuenta_bancaria/operacion_bancaria/operacion_bancaria.service';
import { ParamsModel } from '../../../models/params.model';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';


describe('Component: Operaciones Bancarias', () => {
const cuenta_bancaria = new CuentaBancariaModel({
    entidad: 'BBVA',
    ncuenta: '22222222222222222222',
    pais: { _id: '5af414eba34974135c044d2f', valor: 'Spain' },
    moneda: { _id: '5af414eba34974135c044e20', codigo: 'EUR', descripcion: 'Euro' },
    localizacion: {
        _id: '5af414eba34974135c044ec0',
        valor: 'Nacional',
        empresa: {
        _id: '1',
        nombre: 'empresa 1',
        cif: '1234455097L',
        direccion_fiscal: '3333333',
        tfno: '33333333333333'
        }
    },
    _id: '1'
    });
  const operacion_bancaria = new OperacionBancariaModel({
    _id: '1',
    fecha: new Date(),
    importe: 1,
    tasa_cambio_local: 0,
    tasa_cambio_euro: 0,
    financiador: null,
    tipo_movimiento: null
  });
  let component: OperacionBancariaComponent;
  let fixture: ComponentFixture<OperacionBancariaComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc',
    cuenta_bancaria_id: '1'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [OperacionBancariaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        // RouterTestingModule.withRoutes([{ path: 'proyecto-detalle/:id/datos-generales', component: AportacionesComponent }]),
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        OperacionBancariaService,
        FinanciadorService,
        TipoMovimientoService,
        Common,
        NgbCumstonDateParserFormatter,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: Observable.of({ id: '5af41848a34974135c044edc' })
            }
          }
        }
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [Confirm2Component]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(OperacionBancariaComponent);
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
  it(`should retrieve param id from parent route params`, async(() => {
    component.cuenta = cuenta_bancaria;
    component.ids = ids;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids).toEqual(ids);
    });
  }));
  it('should open create modal window', (done: DoneFn) => {
    component.ids = ids;
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(operacion_bancaria);
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
