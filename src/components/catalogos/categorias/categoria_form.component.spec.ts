import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CategoriaModel } from '../../../models/categoria.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { CategoriaService } from '../../../providers/catalogos/categoria.service';
import { Common } from '../../../providers/common/common';
import { CategoriaFormComponent } from './categoria_form.component';


describe('Component: CategoriaForm', () => {
  const categoria = new CategoriaModel({ _id: '1', valor: 'valor 1' });

  let component: CategoriaFormComponent;
  let fixture: ComponentFixture<CategoriaFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CategoriaFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [CategoriaService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CategoriaFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Categoría', async(() => {
    const categoriaVacia = new CategoriaModel({ valor: '' });
    const categoriaService = fixture.debugElement.injector.get(CategoriaService);

    component.categoria = categoriaVacia;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmCategoria.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.categoria).toBe(categoriaVacia);
      expect(component.isNew).toBe(true);
      expect(component.frmCategoria.valid).toBeFalsy();
      valor.setValue(categoria.valor);
      expect(component.frmCategoria.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(categoria));
    });
  }));

  it('edit Categoría', async(() => {
    const categoriaService = fixture.debugElement.injector.get(CategoriaService);

    component.categoria = categoria;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmCategoria.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.categoria).toBe(categoria);
      expect(component.isNew).toBe(false);
      expect(component.frmCategoria.valid).toBeTruthy();
      expect(valor.value).toBe(categoria.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(categoria));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
