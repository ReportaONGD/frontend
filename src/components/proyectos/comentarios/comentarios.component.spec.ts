// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

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
import { Observable } from 'rxjs/Observable';

import { ComentarioModel } from '../../../models/comentario.model';
import { ParamsModel } from '../../../models/params.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import {
    ObjetivoEspecificoComentariosService,
} from '../../../providers/proyecto/objetivo_especifico/comentarios/comentarios.service';
import { ComentariosComponent } from './comentarios.component';

describe('Component: Comentarios', () => {
  const comentario = new ComentarioModel({
    _id: '1',
    texto: 'string',
    fecha: '01/01/2018'
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: ComentariosComponent;
  let fixture: ComponentFixture<ComentariosComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ComentariosComponent],
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
        ObjetivoEspecificoComentariosService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        NgbCumstonDateParserFormatter,
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
    fixture = TestBed.createComponent(ComentariosComponent);
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
    expect(component).toBeDefined();
  });
  it(`should on submit`, async(() => {
    component.comentario = new ComentarioModel();
    component.ids = ids;
    spyOn(component, 'create');
    component.onSubmit();
    expect(component.create).toHaveBeenCalled();
  }));
  it(`should be on create`, async(() => {
    component.comentario = new ComentarioModel();
    component.ids = ids;
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoComentariosService);
    service.ids = ids;
    component.service = service;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(service, 'post').and.callFake(() => Observable.of(comentario));
    spyOn(component, 'all');
    component.create();
    expect(component.all).toHaveBeenCalled();
  }));
  it(`should be on edit`, () => {
    component.comentario = comentario;
    component.ids = ids;
    const service = fixture.debugElement.injector.get(ObjetivoEspecificoComentariosService);
    service.ids = ids;
    component.service = service;
    component.ngOnInit();
    spyOn(service, 'put').and.callFake(() => Observable.of(comentario));
    spyOn(component, 'all');
    component.edit();
    expect(component.all).toHaveBeenCalled();
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(comentario);
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
