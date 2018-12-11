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
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { EtapaService } from '../../../providers/proyecto/etapas/etapa.service';
import { SharedModule } from '../../shared/shared.module';
import { EtapaDetailComponent } from './etapa_detail.component';
import { EtapaModel } from '../../../models/etapa.model';

describe('Component: Etapa Detail', () => {
    const etapa = new EtapaModel({
        _id: '1',
        nombre: 'string',
        descripcion: 'string',
        fecha_inicio: '01/01/2018',
        fecha_fin: '01/02/2018',
        empresa: null
      });
  let component: EtapaDetailComponent;
  let fixture: ComponentFixture<EtapaDetailComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EtapaDetailComponent],
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
        EtapaService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(EtapaDetailComponent);
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
    component.etapa = etapa;
    component.ids = ids;
    expect(component).toBeDefined();
  });
  it(`should be on create`, () => {
    component.etapa = etapa;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(EtapaService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(etapa));
    spyOn(component, 'onClose');
    component.create();
    expect(component.onClose).toHaveBeenCalled();
  });
  it(`should be on edit`, () => {
    component.etapa = etapa;
    component.ids = ids;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(EtapaService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(etapa));
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
