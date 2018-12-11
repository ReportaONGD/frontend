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

import { EtapaModel } from '../../../models/etapa.model';
import { ParamsModel } from '../../../models/params.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { EtapaService } from '../../../providers/proyecto/etapas/etapa.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { EtapaComponent } from './etapa.component';
import { EtapaDetailComponent } from './etapa_detail.component';

describe('Component: Etapa', () => {
  const etapa = new EtapaModel({
    _id: '1',
    nombre: 'string',
    descripcion: 'string',
    fecha_inicio: '01/01/2018',
    fecha_fin: '01/02/2018',
    empresa: null
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: EtapaComponent;
  let fixture: ComponentFixture<EtapaComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EtapaComponent, EtapaDetailComponent],
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
        EtapaService,
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
        entryComponents: [Confirm2Component, EtapaDetailComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(EtapaComponent);
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
  it(`should on addInforme`, async(() => {
    spyOn(component, 'openModal');
    component.addEtapa();
    expect(component.openModal).toHaveBeenCalled();
  }));
  it(`should on edit`, async(() => {
    spyOn(component, 'openModal');
    component.editEtapa(etapa);
    expect(component.openModal).toHaveBeenCalled();
  }));
  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(EtapaDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModal(etapa);
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
    component.openModalConfirm(etapa);
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
