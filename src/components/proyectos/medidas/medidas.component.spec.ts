// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { MedidaModel } from '../../../models/medida.model';
import { ParamsModel } from '../../../models/params.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import {
    OEMedidaService,
} from '../../../providers/proyecto/objetivo_especifico/indicador/medida/objetivo_especifico_medida.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { MedidasComponent } from './medidas.component';



describe('Component: Medidas', () => {
  const medida = new MedidaModel({
    _id: 'string',
    valor: 'string',
    comentario: 'string',
    fecha: '01/01/2018'
  });
  let component: MedidasComponent;
  let fixture: ComponentFixture<MedidasComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc',
    objetivo_id: '1'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [MedidasComponent],
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
        ApiService,
        BaseService,
        OEMedidaService,
        NgbCumstonDateParserFormatter,
        NgbActiveModal,
        Common
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [Confirm2Component]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(MedidasComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = ids;
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
    component.ids = ids;
    const service = fixture.debugElement.injector.get(OEMedidaService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids).toEqual(ids);
    });
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(medida);
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
