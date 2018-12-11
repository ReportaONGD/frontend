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
import { TipoValoracionModel } from '../../../models/tipo_valoracion.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoValoracionService } from '../../../providers/catalogos/tipo_valoracion.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoValoracionComponent } from './tipo_valoracion.component';
import { TipoValoracionFormComponent } from './tipo_valoracion_form.component';

describe('Component: Tipo Valoración', () => {
  const tipo_valoracion = new TipoValoracionModel({ _id: '1', valor: 'valor 1' });
  const tipos_valoracion = [
    new TipoValoracionModel({ _id: '1', valor: 'valor 1' }),
    new TipoValoracionModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: TipoValoracionComponent;
  let fixture: ComponentFixture<TipoValoracionComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'tipos-valoracion',
      component: TipoValoracionComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'TipoValoraciones',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoValoracionComponent, TipoValoracionFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoValoracionService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TipoValoracionFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoValoracionComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoValoracionFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo TipoValoracion');
      expect(modalRef.componentInstance.tipo_valoracion._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoValoracionFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(tipo_valoracion);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición TipoValoracion');
      expect(modalRef.componentInstance.tipo_valoracion).toBe(tipo_valoracion);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const tipo_valoracionService = fixture.debugElement.injector.get(TipoValoracionService);
    spyOn(tipo_valoracionService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(tipo_valoracion);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns tipo_valoraciones', async(() => {
    const tipo_valoracionService = fixture.debugElement.injector.get(TipoValoracionService);
    spyOn(tipo_valoracionService, 'all').and.callFake(() => Observable.of(tipos_valoracion));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.tipos_valoracion).toBe(tipos_valoracion);
    });
  }));
});
