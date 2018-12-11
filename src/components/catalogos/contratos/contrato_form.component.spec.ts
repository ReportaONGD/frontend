import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ContratoModel } from '../../../models/contrato.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { ContratoService } from '../../../providers/catalogos/contrato.service';
import { Common } from '../../../providers/common/common';
import { ContratoFormComponent } from './contrato_form.component';


describe('Component: CategoriaForm', () => {
  const contrato = new ContratoModel({ _id: '1', valor: 'valor 1' });

  let component: ContratoFormComponent;
  let fixture: ComponentFixture<ContratoFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ContratoFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [ContratoService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(ContratoFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Categoría', async(() => {
    const contratoVacio = new ContratoModel({ valor: '' });
    const categoriaService = fixture.debugElement.injector.get(ContratoService);

    component.contrato = contratoVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmContrato.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.contrato).toBe(contratoVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmContrato.valid).toBeFalsy();
      valor.setValue(contrato.valor);
      expect(component.frmContrato.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(contrato));
    });
  }));

  it('edit Categoría', async(() => {
    const categoriaService = fixture.debugElement.injector.get(ContratoService);

    component.contrato = contrato;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmContrato.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.contrato).toBe(contrato);
      expect(component.isNew).toBe(false);
      expect(component.frmContrato.valid).toBeTruthy();
      expect(valor.value).toBe(contrato.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(contrato));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
