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
import { CofinanciadorModel } from '../../../models/cofinanciador.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { CofinanciadorService } from '../../../providers/catalogos/cofinanciador.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { CofinanciadorComponent } from './cofinanciador.component';
import { CofinanciadorFormComponent } from './cofinanciador_form.component';

describe('Component: Categoria', () => {
  const cofinanciador = new CofinanciadorModel({ _id: '1', valor: 'valor 1' });
  const cofinanciadores = [
    new CofinanciadorModel({ _id: '1', valor: 'valor 1' }),
    new CofinanciadorModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: CofinanciadorComponent;
  let fixture: ComponentFixture<CofinanciadorComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'cofinanciadores',
      component: CofinanciadorComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'Cofinaciadores',
      },
    }
  ];


  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CofinanciadorComponent, CofinanciadorFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [CofinanciadorService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [CofinanciadorFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CofinanciadorComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CofinanciadorFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo Cofinanciador');
      expect(modalRef.componentInstance.cofinanciador._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(CofinanciadorFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(cofinanciador);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición Cofinanciador');
      expect(modalRef.componentInstance.cofinanciador).toBe(cofinanciador);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const cofinaciadorService = fixture.debugElement.injector.get(CofinanciadorService);
    spyOn(cofinaciadorService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(cofinanciador);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns cofinanciadores', async(() => {
    const cofinaciadorService = fixture.debugElement.injector.get(CofinanciadorService);
    spyOn(cofinaciadorService, 'all').and.callFake(() => Observable.of(cofinanciadores));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.cofinanciadores).toBe(cofinanciadores);
    });
  }));
});
