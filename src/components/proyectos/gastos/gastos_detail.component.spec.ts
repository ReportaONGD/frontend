// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { ParamsModel } from '../../../models/params.model';
import { GastoModel } from '../../../models/gasto.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { GastosService } from '../../../providers/proyecto/gastos/gastos.service';
import { SharedModule } from '../../shared/shared.module';
import { GastosDetailComponent } from './gastos_detail.component';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';

describe('Component: Gasto Detail', () => {
    const gasto = new GastoModel({
        _id: '1',
        fecha: new Date(),
        numero_orden: '12345',
        emisor: 'string',
        concepto: 'string',
        importe_local: 1,
        tipo_de_cambio_dm: 1,
        tipo_de_cambio_ld: 1,
        moneda: null,
        partida: null,
        financiador: null,
        actividad: null,
        documentos: null
      });
  let component: GastosDetailComponent;
  let fixture: ComponentFixture<GastosDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [GastosDetailComponent],
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
        PartidaService,
        FinanciadorService,
        GastosService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(GastosDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: '5af41848a34974135c044edc'});
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
    component.gasto = gasto;
    component.ids = ids;
    expect(component).toBeDefined();
  });
  it(`should be on create`, () => {
    component.gasto = gasto;
    component.ids = ids;
    component.generateForm();
    const service = fixture.debugElement.injector.get(GastosService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(gasto));
    spyOn(component, 'close');
    component.create();
    expect(component.close).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.gasto = gasto;
    component.ids = ids;
    component.generateForm();
    const service = fixture.debugElement.injector.get(GastosService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(gasto));
    spyOn(component, 'close');
    component.edit();
    expect(component.close).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
 });
});
