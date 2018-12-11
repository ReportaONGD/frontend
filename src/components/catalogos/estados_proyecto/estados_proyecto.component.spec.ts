import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { EstadoProyectoModel } from '../../../models/estado_proyecto.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { EmbededObjectFilterByNombrePipe } from '../../../pipes/embeded_object_filter_by_nombre.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { EstadosProyectoComponent } from './estados_proyecto.component';
import { EstadosProyectoFormComponent } from './estados_proyecto_form.component';

describe('Component: EstadoProyecto', () => {
  const estadoProyecto = new EstadoProyectoModel({ _id: '1', nombre: 'estado 1', estado_anterior: null, final: false });
  const estadosProyecto = [
    estadoProyecto,
    new EstadoProyectoModel({ _id: '1', nombre: 'estado 1', estado_anterior: estadoProyecto, final: false })
  ];

  let component: EstadosProyectoComponent;
  let fixture: ComponentFixture<EstadosProyectoComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'estados_proyecto',
      component: EstadosProyectoComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'EstadoProyectoes',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EstadosProyectoComponent, EstadosProyectoFormComponent, Confirm2Component, AppFilterPipe, EmbededObjectFilterByNombrePipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [EstadosProyectoService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [EstadosProyectoFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(EstadosProyectoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(EstadosProyectoFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo EstadosProyecto');
      expect(modalRef.componentInstance.estadoProyecto._id).toBe('');
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(EstadosProyectoFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(estadoProyecto);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición EstadosProyecto');
      expect(modalRef.componentInstance.estadoProyecto).toBe(estadoProyecto);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const estadosProyectoService = fixture.debugElement.injector.get(EstadosProyectoService);
    spyOn(estadosProyectoService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(estadoProyecto);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns Estados Proyecto', async(() => {
    const estadosProyectoService = fixture.debugElement.injector.get(EstadosProyectoService);
    spyOn(estadosProyectoService, 'all').and.callFake(() => Observable.of(estadosProyecto));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.estadosProyecto).toBe(estadosProyecto);
    });
  }));
});
