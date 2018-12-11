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
import { LocalizacionModel } from '../../../models/localizacion.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { LocalizacionService } from '../../../providers/catalogos/localizacion.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { LocalizacionComponent } from './localizacion.component';
import { LocalizacionFormComponent } from './localizacion_form.component';

describe('Component: Localización', () => {
  const localizacion = new LocalizacionModel({ _id: '1', valor: 'valor 1' });
  const localizaciones = [
    new LocalizacionModel({ _id: '1', valor: 'valor 1' }),
    new LocalizacionModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: LocalizacionComponent;
  let fixture: ComponentFixture<LocalizacionComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'localizaciones',
      component: LocalizacionComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'Localizaciones',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LocalizacionComponent, LocalizacionFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [LocalizacionService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LocalizacionFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LocalizacionComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(LocalizacionFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo Localización');
      expect(modalRef.componentInstance.localizacion._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(LocalizacionFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(localizacion);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición Localización');
      expect(modalRef.componentInstance.localizacion).toBe(localizacion);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const localizacionService = fixture.debugElement.injector.get(LocalizacionService);
    spyOn(localizacionService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(localizacion);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns localizaciones', async(() => {
    const localizacionService = fixture.debugElement.injector.get(LocalizacionService);
    spyOn(localizacionService, 'all').and.callFake(() => Observable.of(localizaciones));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.localizaciones).toBe(localizaciones);
    });
  }));
});
