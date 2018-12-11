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

import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { PartidaComponent } from './partidas.component';
import { PartidasDetailComponent } from './partidas_detail.component';

describe('Component: Partida', () => {
  const partida = new PartidaModel({
    _id: '5b04082dbd3cbf001109cd30',
    nombre: 'string',
    codigo: 'string',
    costes: null,
    importe: 1,
    aecid: false,
    partida_padre: null,
    es_padre: false,
    es_inversion: false
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: PartidaComponent;
  let fixture: ComponentFixture<PartidaComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PartidaComponent, PartidasDetailComponent],
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
        PartidaService,
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
        entryComponents: [Confirm2Component, PartidasDetailComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PartidaComponent);
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
  it(`should on add`, async (done: DoneFn) => {
    component.ids = ids;
    component.partida = new PartidaModel();
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(PartidasDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.add();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
    expect(modalRef.componentInstance.title).toEqual(`Nueva Partida`);
    expect(modalRef.componentInstance.partida).toEqual(new PartidaModel());
    expect(modalRef.componentInstance.isNew).toEqual(true);
    expect(modalRef.componentInstance.ids).toEqual(ids);
      modalRef.close();
      done();
    });
  });
  it('should open edit modal window', (done: DoneFn) => {
    component.ids = ids;
    component.partida = partida;
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(PartidasDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.edit(partida);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toEqual(`Partida: ${partida.codigo}`);
      expect(modalRef.componentInstance.partida).toEqual(partida);
      expect(modalRef.componentInstance.isNew).toEqual(false);
      expect(modalRef.componentInstance.ids).toEqual(ids);
      modalRef.close();
      done();
    });
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(partida);
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
