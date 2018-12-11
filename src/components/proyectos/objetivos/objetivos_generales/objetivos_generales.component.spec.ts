// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { ObjetivoModel } from '../../../../models/objetivo.model';
import { ApiService } from '../../../../providers/base/api.service';
import { BaseService } from '../../../../providers/base/base.service';
import { Common } from '../../../../providers/common/common';
import { ObjetivoService } from '../../../../providers/proyecto/objetivo/objetivo.service';
import { Confirm2Component } from '../../../shared/confirm2/confirm.component';
import { SharedModule } from '../../../shared/shared.module';
import { ObjetivosGeneralesComponent } from './objetivos_generales.component';
import { ComentariosComponent } from '../../comentarios/comentarios.component';
import { OGFuenteVerificacionService } from '../../../../providers/proyecto/objetivo/indicador/fuente_verificacion/fuente_verificacion.service';
// tslint:disable-next-line:max-line-length
import { ObjetivoFuenteVerificacionDocumentosService } from '../../../../providers/proyecto/objetivo/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { Observable } from 'rxjs/Observable';
describe('Component: Objetivo', () => {
  const objetivo = new ObjetivoModel({
    codigo: 'OG1',
    descripcion: 'DESC OG1'
  });
  let component: ObjetivosGeneralesComponent;
  let fixture: ComponentFixture<ObjetivosGeneralesComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const ids = {
    proyecto_id: undefined,
    objetivo_id: undefined
  };
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ObjetivosGeneralesComponent, ComentariosComponent],
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
        ObjetivoService,
        OGFuenteVerificacionService,
        ObjetivoFuenteVerificacionDocumentosService,
        ApiService,
        BaseService,
        Common,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: Observable.of({ proyecto_id: '5af41848a34974135c044edc' })
            }
          }
        }
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [Confirm2Component, ComentariosComponent]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(ObjetivosGeneralesComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
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
    expect(component).toBeDefined();
  });
  it(`should retrieve param id from parent route params`, async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ids.proyecto_id).toEqual(undefined);
      expect(component.ids.objetivo_id).toEqual(undefined);
    });
  }));
  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    component.openModalRemove(objetivo);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      modalRef.close();
      done();
    });
  });
  afterEach(() => {
    fixture.destroy();
    // component.ngOnDestroy();
  });
});
