// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { HipotesisModel } from '../../../models/hipotesis.model';
import { ParamsModel } from '../../../models/params.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import {
  ResultadoHipotesisService,
} from '../../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import {
  ObjetivoEspecificoHipotesisService,
} from '../../../providers/proyecto/objetivo_especifico/hipotesis/objetivo_especifico_hipotesis.service';
import { HipotesisComponent } from './hipotesis.component';

describe('Component: Hipotesis para objetivos especificos', () => {
  const hipotesis = new HipotesisModel({
    descripcion: 'DESC OE1.H1'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: HipotesisComponent;
  let fixture: ComponentFixture<HipotesisComponent>;
  const ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc', objetivo_especifico_id: '1' });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [HipotesisComponent],
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
        ResultadoHipotesisService,
        ObjetivoEspecificoHipotesisService,
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
    fixture = TestBed.createComponent(HipotesisComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // component.isResultado = false;
    // component.isEspecifico = true;
    // component.isNewHipotesis = false;
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
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc', objetivo_especifico_id: '1' });
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoHipotesisService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids).toEqual(ids);
      spyOn(component, 'initialize');
      component.initialize();
      expect(component.initialize).toHaveBeenCalled();
    });
  }));
  it(`should be when create is called`, async(() => {
    spyOn(component, 'initialize');
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc', objetivo_especifico_id: '1' });
    component.frmHipotesis = new FormBuilder().group({
      descripcion: ['', Validators.required],
    });
    component.frmHipotesis.patchValue(hipotesis);
    component.hipotesis = new HipotesisModel();
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoHipotesisService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    component.create();
    expect(component.hipotesis).toEqual(new HipotesisModel());
    expect(component.initialize).toHaveBeenCalled();
  }));
  it(`should be when edit is called`, async(() => {
    component.ids = new ParamsModel({ proyecto_id: '5af41848a34974135c044edc', objetivo_especifico_id: '1' });
    component.frmHipotesis = new FormBuilder().group({
      descripcion: ['', Validators.required],
    });
    component.frmHipotesis.patchValue(hipotesis);
    component.hipotesis = hipotesis;
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoHipotesisService);
    service.ids = ids;
    component.service = service;
    fixture.detectChanges();
    expect(component.frmHipotesis.valid).toBeFalsy();
    spyOn(service, 'put').and.callFake(() => Observable.of(hipotesis));
    spyOn(component, 'initialize');
    component.edit();
    expect(component.hipotesis).toEqual(hipotesis);
    expect(component.initialize).toHaveBeenCalled();
  }));
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(hipotesis);
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
