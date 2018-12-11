// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../../providers/common/common';
import { ObjetivosEspecificosListComponent } from './objetivos_especificos_list.component';
import { Confirm2Component } from '../../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../../providers/base/api.service';
import { BaseService } from '../../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { EndPoints } from '../../../../enums/project_endpoints';
import { ActivatedRoute } from '@angular/router';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ObjetivoService } from '../../../../providers/proyecto/objetivo/objetivo.service';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsModel } from '../../../../models/params.model';
describe('Component: Objetivos Especificos List', () => {
  const objetivo = new ObjetivoModel({
      codigo: 'OG1',
      descripcion: 'DESC OG1'
    });
  let component: ObjetivosEspecificosListComponent;
  let fixture: ComponentFixture<ObjetivosEspecificosListComponent>;
  const ids = new ParamsModel({
      proyecto_id: undefined
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ObjetivosEspecificosListComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
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
        ObjetivoService,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: new ParamsModel({proyecto_id: '5af41848a34974135c044edc'})
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
    fixture = TestBed.createComponent(ObjetivosEspecificosListComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    component.ids = new ParamsModel({proyecto_id: undefined});
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
  it(`should retrieve param id from parent route params`, async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids.proyecto_id).toEqual(undefined);
    });
  }));
  afterEach(() => {
    fixture.destroy();
    // component.ngOnDestroy();
 });
});
