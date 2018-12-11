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

import { InformeModel } from '../../../models/informe.model';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { InformeService } from '../../../providers/proyecto/informe/informe.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { InformeComponent } from './informe.component';
import { InformeDetailComponent } from './informe_detail.component';

describe('Component: Informe', () => {
  const informe = new InformeModel({
    _id: '5b04082dbd3cbf001109cd30',
    nombre: 'string',
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    autor: 'ya',
    proyecto: new ProyectoModel()
  });
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let component: InformeComponent;
  let fixture: ComponentFixture<InformeComponent>;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [InformeComponent, InformeDetailComponent ],
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
        InformeService,
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
          entryComponents: [Confirm2Component, InformeDetailComponent ]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(InformeComponent);
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
  it(`should on addInforme`, async(() => {
    spyOn(component, 'openModal');
    component.addInforme();
    expect(component.openModal).toHaveBeenCalled();
  }));
  it(`should on edit`, async(() => {
    spyOn(component, 'openModal');
    component.editInforme(informe);
    expect(component.openModal).toHaveBeenCalled();
  }));
  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(InformeDetailComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModal(informe);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  it('should open confirm modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModal(informe, false);
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
