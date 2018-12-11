import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TipoValoracionModel } from '../../../models/tipo_valoracion.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoValoracionService } from '../../../providers/catalogos/tipo_valoracion.service';
import { Common } from '../../../providers/common/common';
import { TipoValoracionFormComponent } from './tipo_valoracion_form.component';


describe('Component: TipoValoracionForm', () => {
  const tipo_valoracion = new TipoValoracionModel({ _id: '1', valor: 'valor 1' });

  let component: TipoValoracionFormComponent;
  let fixture: ComponentFixture<TipoValoracionFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoValoracionFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoValoracionService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoValoracionFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Categoría', async(() => {
    const tipo_valoracionVacio = new TipoValoracionModel({ valor: '' });
    const categoriaService = fixture.debugElement.injector.get(TipoValoracionService);

    component.tipo_valoracion = tipo_valoracionVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoValoracion.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.tipo_valoracion).toBe(tipo_valoracionVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmTipoValoracion.valid).toBeFalsy();
      valor.setValue(tipo_valoracion.valor);
      expect(component.frmTipoValoracion.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(tipo_valoracion));
    });
  }));

  it('edit Categoría', async(() => {
    const categoriaService = fixture.debugElement.injector.get(TipoValoracionService);

    component.tipo_valoracion = tipo_valoracion;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoValoracion.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.tipo_valoracion).toBe(tipo_valoracion);
      expect(component.isNew).toBe(false);
      expect(component.frmTipoValoracion.valid).toBeTruthy();
      expect(valor.value).toBe(tipo_valoracion.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(tipo_valoracion));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
