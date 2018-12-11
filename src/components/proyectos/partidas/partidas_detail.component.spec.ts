// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { ParamsModel } from '../../../models/params.model';
import { PartidaModel } from '../../../models/partida.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { SharedModule } from '../../shared/shared.module';
import { CostesService } from '../../../providers/catalogos/costes.service';
import { PartidaService } from '../../../providers/proyecto/partida/partida.service';
import { PartidasDetailComponent } from './partidas_detail.component';

describe('Component: Partida Detail', () => {
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
  let component: PartidasDetailComponent;
  let fixture: ComponentFixture<PartidasDetailComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [PartidasDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        PartidaService,
        CostesService,
        ApiService,
        BaseService,
        Common,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: new ParamsModel({ proyecto_id: '5af41848a34974135c044edc' })
            }
          }
        }
      ]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(PartidasDetailComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel(
      {
        proyecto_id: '5af41848a34974135c044edc'
      });
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
  it(`should be on submit`, () => {
    spyOn(component, 'update');
    component.isNew = false;
    component.onSubmit();
    expect(component.update).toHaveBeenCalled();
  });
  it(`should be on create`, () => {
    component.partida = partida;
    component.ids = ids;
    component.isNew = true;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(PartidaService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(partida));
    spyOn(component, 'onClose');
    component.create();
    expect(component.onClose).toHaveBeenCalled();
  });
  it(`should on update`, async(() => {
    component.partida = partida;
    component.ids = ids;
    component.isNew = false;
    component.ngOnInit();
    component.frmPartida.patchValue(partida);
    const service = fixture.debugElement.injector.get(PartidaService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(partida));
    spyOn(component, 'onClose');
    component.update();
    expect(component.onClose).toHaveBeenCalled();
  }));
  afterEach(() => {
    fixture.destroy();
    // ids.unsubscribe();
    // component.ngOnDestroy();
  });
});
