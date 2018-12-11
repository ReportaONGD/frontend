import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TipoMovimientoModel } from '../../../models/tipo_movimiento.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoMovimientoService } from '../../../providers/catalogos/tipo_movimiento.service';
import { Common } from '../../../providers/common/common';
import { TipoMovimientoFormComponent } from './tipo_movimiento_form.component';


describe('Component: TipoMovimientoForm', () => {
  const tipo_movimiento = new TipoMovimientoModel({ _id: '1', valor: 'valor 1' });

  let component: TipoMovimientoFormComponent;
  let fixture: ComponentFixture<TipoMovimientoFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoMovimientoFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoMovimientoService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoMovimientoFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Tipo Movimiento', async(() => {
    const tipoMovimientoVacio = new TipoMovimientoModel({ valor: '' });
    const categoriaService = fixture.debugElement.injector.get(TipoMovimientoService);

    component.tipoMovimiento = tipoMovimientoVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoMovimiento.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.tipoMovimiento).toBe(tipoMovimientoVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmTipoMovimiento.valid).toBeFalsy();
      valor.setValue(tipo_movimiento.valor);
      expect(component.frmTipoMovimiento.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(tipo_movimiento));
    });
  }));

  it('edit Tipo Movimiento', async(() => {
    const categoriaService = fixture.debugElement.injector.get(TipoMovimientoService);

    component.tipoMovimiento = tipo_movimiento;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoMovimiento.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.tipoMovimiento).toBe(tipo_movimiento);
      expect(component.isNew).toBe(false);
      expect(component.frmTipoMovimiento.valid).toBeTruthy();
      expect(valor.value).toBe(tipo_movimiento.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(tipo_movimiento));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
