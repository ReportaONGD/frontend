// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Common } from '../../../providers/common/common';
import { EntidadService } from '../../../providers/proyecto/entidad/entidad.service';
import { EntidadesComponent } from './entidades.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { ParamsModel } from '../../../models/params.model';
describe('Component: Entidad', () => {
  const entidad = {nombre: 'entidad 1'};
  let component: EntidadesComponent;
  let fixture: ComponentFixture<EntidadesComponent>;
  // let aportacionService: AportacionProvider;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const ids = new ParamsModel({
      proyecto_id: '5af41848a34974135c044edc'
  });
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EntidadesComponent, Confirm2Component],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        EntidadService,
        ProyectoService,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
            useValue: {
              parent: {
                params: Observable.of({id: '5af41848a34974135c044edc'})
              }
            }
        }],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [Confirm2Component]
        }
      });
    // create component and test fixture
    fixture = TestBed.createComponent(EntidadesComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    NgbTooltip.prototype.ngOnDestroy = jasmine.createSpy('ngOnDestroy');
    (NgbTooltip.prototype.ngOnDestroy as jasmine.Spy).and.stub();
    spyOn(console, 'log').and.callThrough();

  });
  afterEach(() => {
    fixture.destroy();
    // component.ngOnDestroy();
  });
 /*
  *   COMPONENT BEFORE INIT
  */
  it(`should be initialized`, () => {
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it(`should retrieve param id from ActivatedRoute`, async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids).toEqual(ids);
    });
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(entidad);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
        done();
    });
  });
});
