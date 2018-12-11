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
import { PeriodoModel } from '../../../models/periodo.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { PeriodoService } from '../../../providers/proyecto/periodo/periodo.service';
import { TipoPeriodoService } from '../../../providers/proyecto/tipo_periodo/tipo_periodo.service';
import { SharedModule } from '../../shared/shared.module';
import { PeriodoDetailComponent } from './periodo_detail.component';

describe('Component: Periodo Detail', () => {
  const periodo = new PeriodoModel({
    _id: '5b04082dbd3cbf001109cd30',
    nombre: 'string',
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    tipo_periodo: null
  });
  let component: PeriodoDetailComponent;
  let fixture: ComponentFixture<PeriodoDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PeriodoDetailComponent],
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
        TipoPeriodoService,
        PeriodoService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PeriodoDetailComponent);
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
    component.periodo = periodo;
    component.ids = ids;
    expect(component).toBeDefined();
  });
  it(`should be on create`, () => {
    component.periodo = periodo;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(PeriodoService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(periodo));
    spyOn(component, 'onClose');
    component.create();
    expect(component.onClose).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.periodo = periodo;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(PeriodoService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(periodo));
    spyOn(component, 'onClose');
    component.update();
    expect(component.onClose).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
 });
});
