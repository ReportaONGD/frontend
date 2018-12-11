import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CofinanciadorModel } from '../../../models/cofinanciador.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { CofinanciadorService } from '../../../providers/catalogos/cofinanciador.service';
import { Common } from '../../../providers/common/common';
import { CofinanciadorFormComponent } from './cofinanciador_form.component';


describe('Component: CofinanciadorForm', () => {
  const cofinanciador = new CofinanciadorModel({ _id: '1', valor: 'valor 1' });

  let component: CofinanciadorFormComponent;
  let fixture: ComponentFixture<CofinanciadorFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [CofinanciadorFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [CofinanciadorService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CofinanciadorFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Cofinanciador', async(() => {
    const cofinanciadorVacio = new CofinanciadorModel({valor: ''});
    const categoriaService = fixture.debugElement.injector.get(CofinanciadorService);

    component.cofinanciador = cofinanciadorVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmCofinanciador.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.cofinanciador).toBe(cofinanciadorVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmCofinanciador.valid).toBeFalsy();
      valor.setValue(cofinanciador.valor);
      expect(component.frmCofinanciador.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(cofinanciador));
    });
  }));

  it('edit Cofinanciador', async(() => {
    const categoriaService = fixture.debugElement.injector.get(CofinanciadorService);

    component.cofinanciador = cofinanciador;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmCofinanciador.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.cofinanciador).toBe(cofinanciador);
      expect(component.isNew).toBe(false);
      expect(component.frmCofinanciador.valid).toBeTruthy();
      expect(valor.value).toBe(cofinanciador.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(cofinanciador));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
