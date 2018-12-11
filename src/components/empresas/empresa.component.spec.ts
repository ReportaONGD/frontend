// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { EmpresaModel } from '../../models/empresa.model';
import { ApiService } from '../../providers/base/api.service';
import { BaseService } from '../../providers/base/base.service';
import { Common } from '../../providers/common/common';
import { EmpresaService } from '../../providers/empresa/empresa.service';
import { Confirm2Component } from '../shared/confirm2/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { EmpresasComponent } from './empresa.component';

describe('Component: Empresas', () => {
  const empresa = new EmpresaModel({
      _id: '1',
      nombre: 'Juan',
      cif: '12334444',
      direccion_fiscal: 'micasa',
      tfno: '32323232323'
    });
  const empresaId = '1';
  let component: EmpresasComponent;
  let fixture: ComponentFixture<EmpresasComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EmpresasComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
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
        EmpresaService,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: Observable.of({id: '5af41848a34974135c044edc'})
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
    fixture = TestBed.createComponent(EmpresasComponent);
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
  it(`should be on init`, async(() => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    expect(component.initialize).toHaveBeenCalled();
  }));
  // it(`should be on addNewCompany`, (done: DoneFn) => {
  //   component.ngOnInit();
  //   component.addNewCompany();
  //   fixture.whenStable().then(() => {
  //     expect(component.isNewCompany).toBeTruthy();
  //     expect(component.showAlert).toBeFalsy();
  //     done();
  //   });
  // });
  it(`should be on submit`, async(() => {
    // spyOn(component, 'create');
    spyOn(component, 'edit');
    // component.empresa = new EmpresaModel();
    // fixture.detectChanges();
    // component.onSubmit();
    // expect(component.create).toHaveBeenCalled();
    component.empresa = new EmpresaModel(empresa);
    // fixture.detectChanges();
    component.onSubmit();
    expect(component.edit).toHaveBeenCalled();
  }));
  // it(`should be when create is called`, async(() => {
  //   component.ngOnInit();
  //   component.frmCompany.patchValue(empresa);
  //   component.empresa = empresa;
  //   expect(component.frmCompany.valid).toBeTruthy();
  //   const service = fixture.debugElement.injector.get(EmpresaService);
  //   spyOn(service, 'post').and.callFake(() => Observable.of(empresa));
  //   spyOn(component, 'initialize');
  //   component.create();
  //   expect(component.empresa).toEqual(empresa);
  //   expect(component.initialize).toHaveBeenCalled();
  // }));
  it(`should be when edit is called`, async(() => {
    component.empresa = empresa;
    const service = fixture.debugElement.injector.get(EmpresaService);
    spyOn(service, 'put').and.callFake(() => Observable.of(empresa));
    spyOn(component, 'initialize');
    expect(component.empresa).toEqual(empresa);
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(empresa);
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
