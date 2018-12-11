// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { UsuarioModel } from '../../models/usuario.model';
import { ApiService } from '../../providers/base/api.service';
import { BaseService } from '../../providers/base/base.service';
import { Common } from '../../providers/common/common';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Confirm2Component } from '../shared/confirm2/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios.component';
import { RolService } from '../../providers/catalogos/rol.service';
describe('Component: Usuarios', () => {
  const usuario = new UsuarioModel({
    _id: '1',
    username: 'Juan',
    email: 'email@email.com',
    admin: true,
    });
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [UsuariosComponent],
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
        UsuarioService,
        RolService,
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
    fixture = TestBed.createComponent(UsuariosComponent);
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
  it(`should be on addNewUser`, async(() => {
    component.ngOnInit();
    component.addNewUser();
    expect(component.isNewUsuario).toBeTruthy();
    expect(component.showAlert).toBeFalsy();
  }));
  it(`should be on submit`, async(() => {
    component.usuario = new UsuarioModel();
    fixture.detectChanges();
    spyOn(component, 'create');
    component.onSubmit();
    expect(component.create).toHaveBeenCalled();
    component.usuario = new UsuarioModel(usuario);
    fixture.detectChanges();
    spyOn(component, 'edit');
    component.onSubmit();
    expect(component.edit).toHaveBeenCalled();
  }));
  it(`should be when create is called`, (done: DoneFn) => {
    component.ngOnInit();
    component.frmUsuario.patchValue(usuario);
    component.usuario = usuario;
    expect(component.frmUsuario.valid).toBeTruthy();
    spyOn(component, 'save');
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.create();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it(`should be when edit is called`, async(() => {
    component.ngOnInit();
    component.frmUsuario.patchValue(usuario);
    component.usuario = usuario;
    expect(component.frmUsuario.valid).toBeTruthy();
    const service = fixture.debugElement.injector.get(UsuarioService);
    spyOn(service, 'put').and.callFake(() => Observable.of(usuario));
    spyOn(component, 'initialize');
    component.edit();
    expect(component.usuario).toEqual(usuario);
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(usuario);
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
