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
import { CategoriaModel } from '../../../models/categoria.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { CategoriaService } from '../../../providers/catalogos/categoria.service';
import { Common } from '../../../providers/common/common';
import { HomeComponent } from '../../home/home.component';
import { LoginComponent } from '../../login/login.component';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoria_form.component';

describe('Component: Categoria', () => {
  const categoria = new CategoriaModel({ _id: '1', valor: 'valor 1' });
  const categorias = [
    new CategoriaModel({ _id: '1', valor: 'valor 1' }),
    new CategoriaModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'categorias',
      component: CategoriaComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'Categorias',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CategoriaComponent, CategoriaFormComponent, Confirm2Component, AppFilterPipe, LoginComponent, HomeComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [CategoriaService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [CategoriaFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CategoriaComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CategoriaFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nueva Categoría');
      expect(modalRef.componentInstance.categoria._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CategoriaFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(categoria);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición Categoría');
      expect(modalRef.componentInstance.categoria).toBe(categoria);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const categoriaService = fixture.debugElement.injector.get(CategoriaService);
    spyOn(categoriaService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(categoria);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns categorias', async(() => {
    const categoriaService = fixture.debugElement.injector.get(CategoriaService);
    spyOn(categoriaService, 'all').and.callFake(() => Observable.of(categorias));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.categorias).toBe(categorias);
    });
  }));
});
