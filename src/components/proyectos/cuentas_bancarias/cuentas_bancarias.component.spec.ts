// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CuentaBancariaModel } from '../../../models/cuenta_bancaria.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { CuentaBancariaService } from '../../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { CuentasBancariasComponent } from './cuentas_bancarias.component';



describe('Component: CuentasBancarias', () => {
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
    }
  });
  let component: CuentasBancariasComponent;
  let fixture: ComponentFixture<CuentasBancariasComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CuentasBancariasComponent],
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
        CuentaBancariaService,
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
    fixture = TestBed.createComponent(CuentasBancariasComponent);
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
    component.ngOnInit();
    fixture.whenStable().then(() => {
      // expect(component.ids).toEqual(ids);
    });
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(cuenta_bancaria);
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
