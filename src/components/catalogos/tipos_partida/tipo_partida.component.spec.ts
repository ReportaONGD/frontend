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
import { TipoPartidaModel } from '../../../models/tipo_partida.model';
import { AppFilterPipe } from '../../../pipes/app_filter.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoPartidaService } from '../../../providers/catalogos/tipo_partida.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { TipoPartidaComponent } from './tipo_partida.component';
import { TipoPartidaFormComponent } from './tipo_partida_form.component';

describe('Component: Tipo Partida', () => {
  const tipoPartida = new TipoPartidaModel({ _id: '1', codigo: 'codigo 1', nombre: 'nombre 1' });
  const tiposPartida = [
    new TipoPartidaModel({ _id: '1', codigo: 'codigo 1', nombre: 'nombre 1' }),
    new TipoPartidaModel({ _id: '2', codigo: 'codigo 2', nombre: 'nombre 2' })
  ];

  let component: TipoPartidaComponent;
  let fixture: ComponentFixture<TipoPartidaComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  // let service: CategoriaProvider;

  const routes: Routes = [
    {
      path: 'tipos-partida',
      component: TipoPartidaComponent,
      runGuardsAndResolvers: 'always',
      data: {
        title: 'TipoPartidas',
      },
    }
  ];

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoPartidaComponent, TipoPartidaFormComponent, Confirm2Component, AppFilterPipe],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoPartidaService, BaseService, ApiService, Common]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TipoPartidaFormComponent, Confirm2Component]
      }
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoPartidaComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should open create modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoPartidaComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onNew();
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Nuevo TipoPartida');
      expect(modalRef.componentInstance.tipoPartida._id).toBe(null);
      expect(modalRef.componentInstance.isNew).toBe(true);

      modalRef.close();
      done();
    });
  });

  it('should open edit modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(TipoPartidaComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    fixture.detectChanges();

    component.onEdit(tipoPartida);
    expect(modalService.open).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(modalRef.componentInstance.title).toBe('Edición TipoPartida');
      expect(modalRef.componentInstance.tipoPartida).toBe(tipoPartida);
      expect(modalRef.componentInstance.isNew).toBe(false);

      modalRef.close();
      done();
    });
  });

  it('should open delete modal window', (done: DoneFn) => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(Confirm2Component);
    spyOn(modalService, 'open').and.returnValue(modalRef);

    const tipoPartidaService = fixture.debugElement.injector.get(TipoPartidaService);
    spyOn(tipoPartidaService, 'delete').and.callFake(() => Observable.of('OK'));

    fixture.detectChanges();

    component.onDelete(tipoPartida);
    expect(modalService.open).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      modalRef.close(true);
      done();
    });
  });

  it('can All returns tipos_partida', async(() => {
    const tipoPartidaService = fixture.debugElement.injector.get(TipoPartidaService);
    spyOn(tipoPartidaService, 'all').and.callFake(() => Observable.of(tiposPartida));

    fixture.detectChanges();
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.tiposPartida).toBe(tiposPartida);
    });
  }));
});
