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
import { TipoPersonalModel } from '../../../models/tipo_personal.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoPersonalService } from '../../../providers/catalogos/tipo_personal.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoPersonalComponent } from './tipo_personal.component';
import { TipoPersonalFormComponent } from './tipo_personal_form.component';

describe('Component: Tipo Personal', () => {
  const tipoPersonal = new TipoPersonalModel({ _id: '1', valor: 'valor 1' });
  const tiposPersonal = [
    new TipoPersonalModel({ _id: '1', valor: 'valor 1' }),
    new TipoPersonalModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: TipoPersonalComponent;
  let fixture: ComponentFixture<TipoPersonalComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'tipos-personal',
      component: TipoPersonalComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'TipoPersonales',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoPersonalComponent, TipoPersonalFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoPersonalService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TipoPersonalFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoPersonalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoPersonalComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo TipoPersonal');
      expect(modalRef.componentInstance.tipoPersonal._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoPersonalComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(tipoPersonal);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición TipoPersonal');
      expect(modalRef.componentInstance.tipoPersonal).toBe(tipoPersonal);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const tipoPersonalService = fixture.debugElement.injector.get(TipoPersonalService);
    spyOn(tipoPersonalService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(tipoPersonal);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns tiposPersonal', async(() => {
    const tipoPersonalService = fixture.debugElement.injector.get(TipoPersonalService);
    spyOn(tipoPersonalService, 'all').and.callFake(() => Observable.of(tiposPersonal));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.tiposPersonal).toBe(tiposPersonal);
    });
  }));
});
