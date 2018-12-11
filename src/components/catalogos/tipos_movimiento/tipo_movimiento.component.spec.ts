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
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoMovimientoComponent } from './tipo_movimiento.component';
import { TipoMovimientoFormComponent } from './tipo_movimiento_form.component';

describe('Component: Tipo Movimiento', () => {
  const tipoMovimiento = new TipoMovimientoModel({ _id: '1', valor: 'valor 1' });
  const tiposMovimiento = [
    new TipoMovimientoModel({ _id: '1', valor: 'valor 1' }),
    new TipoMovimientoModel({ _id: '2', valor: 'valor 2' })
  ];

  let component: TipoMovimientoComponent;
  let fixture: ComponentFixture<TipoMovimientoComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'tipos-movimiento',
      component: TipoMovimientoComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'Tipos Movimiento',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoMovimientoComponent, TipoMovimientoFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoMovimientoService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TipoMovimientoFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoMovimientoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoMovimientoFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo TipoMovimiento');
      expect(modalRef.componentInstance.tipoMovimiento._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoMovimientoFormComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(tipoMovimiento);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición TipoMovimiento');
      expect(modalRef.componentInstance.tipoMovimiento).toBe(tipoMovimiento);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const tipo_movimientoService = fixture.debugElement.injector.get(TipoMovimientoService);
    spyOn(tipo_movimientoService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(tipoMovimiento);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns tipos_movimiento', async(() => {
    const tipo_movimientoService = fixture.debugElement.injector.get(TipoMovimientoService);
    spyOn(tipo_movimientoService, 'all').and.callFake(() => Observable.of(tiposMovimiento));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.tiposMovimiento).toBe(tiposMovimiento);
    });
  }));
});
