// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import { ChangePasswordComponent } from './change_password.component';
import { UsuarioDetailComponent } from './usuario_detail.component';

describe('Component: Change Password', () => {
  const usuario = new UsuarioModel({
    _id: '1',
    username: 'Juan',
    email: 'email@email.com',
    admin: true,
    });
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        UsuarioService,
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
        },
        NgbActiveModal
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(ChangePasswordComponent);
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
  it(`should be when edit is called`, async(() => {
    const store = {};
    // refine the test module by declaring the test component
    spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
        return store[key];
    });
    component.ngOnInit();
    component.usuario = usuario;
    const service = fixture.debugElement.injector.get(UsuarioService);
    spyOn(service, 'put').and.callFake(() => Observable.of(usuario));
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.edit();
    expect(component.usuario).toEqual(usuario);
  }));
  afterEach(() => {
    fixture.destroy();
    // component.ngOnDestroy();
 });
});
