import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EstadoInformeModel } from '../../../models/estado_informe.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { EmbededObjectFilterByNombrePipe } from '../../../pipes/embeded_object_filter_by_nombre.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { EstadosInformeService } from '../../../providers/catalogos/estados_informe.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { EstadosInformeComponent } from './estados_informe.component';
import { EstadosInformeFormComponent } from './estados_informe_form.component';

describe('Component: EstadoInforme', () => {
  const estadoInforme = new EstadoInformeModel({ _id: '1', nombre: 'estado 1', estado_siguiente: null, final: false });
  const estadosInforme = [
    estadoInforme,
    new EstadoInformeModel({ _id: '1', nombre: 'estado 1', estado_siguiente: estadoInforme, final: false })
  ];

  let component: EstadosInformeComponent;
  let fixture: ComponentFixture<EstadosInformeComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'estados_informees',
      component: EstadosInformeComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'EstadoInformees',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EstadosInformeComponent, EstadosInformeFormComponent, Confirm2Component, AppFilterPipe, EmbededObjectFilterByNombrePipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [EstadosInformeService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [EstadosInformeFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(EstadosInformeComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(EstadosInformeFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo EstadosInforme');
      expect(modalRef.componentInstance.estadoInforme._id).toBe('');
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(EstadosInformeFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(estadoInforme);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición EstadosInforme');
      expect(modalRef.componentInstance.estadoInforme).toBe(estadoInforme);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const estadosInformeService = fixture.debugElement.injector.get(EstadosInformeService);
    spyOn(estadosInformeService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(estadoInforme);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns Estados Informe', async(() => {
    const estadosInformeService = fixture.debugElement.injector.get(EstadosInformeService);
    spyOn(estadosInformeService, 'all').and.callFake(() => Observable.of(estadosInforme));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.estadosInforme).toBe(estadosInforme);
    });
  }));
});
