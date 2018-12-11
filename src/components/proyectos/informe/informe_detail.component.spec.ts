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

import { InformeModel } from '../../../models/informe.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { InformeService } from '../../../providers/proyecto/informe/informe.service';
import { SharedModule } from '../../shared/shared.module';
import { InformeDetailComponent } from './informe_detail.component';

describe('Component: Informe Detail', () => {
const informe = new InformeModel({
    _id: '5b04082dbd3cbf001109cd30',
    nombre: 'string',
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    autor: 'ya',
    proyecto: new ProyectoModel()
    });
  let component: InformeDetailComponent;
  let fixture: ComponentFixture<InformeDetailComponent>;
  const ids = new ParamsModel({
    proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [InformeDetailComponent],
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
        InformeService,
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
    fixture = TestBed.createComponent(InformeDetailComponent);
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
    component.informe = informe;
    component.ids = ids;
    component.isNew = true;
    component.ngOnInit();
    const service = fixture.debugElement.injector.get(InformeService);
    service.ids = ids;
    spyOn(service, 'post').and.callFake(() => Observable.of(informe));
    spyOn(component, 'onClose');
    component.create();
    expect(component.onClose).toHaveBeenCalled();
  });
  it(`should on update`, async(() => {
    component.informe = informe;
    component.ids = ids;
    component.isNew = false;
    component.ngOnInit();
    component.frmInforme.patchValue(informe);
    const service = fixture.debugElement.injector.get(InformeService);
    service.ids = ids;
    spyOn(service, 'put').and.callFake(() => Observable.of(informe));
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
