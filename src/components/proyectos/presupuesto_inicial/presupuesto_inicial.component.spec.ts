// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { ActividadModel } from '../../../models/actividad.model';
import { EtapaModel } from '../../../models/etapa.model';
import { FinanciadorModel } from '../../../models/financiador.model';
import { MonedaModel } from '../../../models/moneda.model';
import { PaisModel } from '../../../models/pais.model';
import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { PresupuestoModel } from '../../../models/presupuesto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { PresupuestoService } from '../../../providers/proyecto/presupuesto/presupuesto.service';
import { PresupuestoInicialComponent } from './presupuesto_inicial.component';
import { PresupuestoInicialDetailComponent } from './presupuesto_inicial_detail.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { Observable } from 'rxjs/Observable';

describe('Component: Presupuesto Inicial', () => {
  const presupuesto = new PresupuestoModel({
    _id: '5b04082dbd3cbf001109cd30',
    importe: 2000,
    etapa: new EtapaModel(),
    pais: new PaisModel(),
    actividad: new ActividadModel(),
    financiador: new FinanciadorModel(),
    moneda: new MonedaModel(),
    partida: new PartidaModel()
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: PresupuestoInicialComponent;
  let fixture: ComponentFixture<PresupuestoInicialComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PresupuestoInicialComponent, PresupuestoInicialDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
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
        PresupuestoService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: Observable.of({proyecto_id: '5af41848a34974135c044edc'})
              }
            }
        }
      ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component, PresupuestoInicialDetailComponent ]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(PresupuestoInicialComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: '5af41848a34974135c044edc'});
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
  it(`should on add`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(PresupuestoInicialDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.add();
    expect(modalRef.componentInstance.presupuesto).toEqual(new PresupuestoModel());
    expect(modalRef.componentInstance.title).toEqual('Nuevo Presupuesto/Actividad');
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it(`should on edit`, (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(PresupuestoInicialDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.edit(presupuesto);
    expect(modalRef.componentInstance.presupuesto).toEqual(presupuesto);
    expect(modalRef.componentInstance.title).toEqual(`Presupuesto/Actividad: ${presupuesto.partida.nombre} - ${presupuesto.actividad.codigo}`);
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it('should open remove modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(presupuesto);
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
