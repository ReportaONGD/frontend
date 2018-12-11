import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TipoPersonalModel } from '../../../models/tipo_personal.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoPersonalService } from '../../../providers/catalogos/tipo_personal.service';
import { Common } from '../../../providers/common/common';
import { TipoPersonalFormComponent } from './tipo_personal_form.component';


describe('Component: TipoPersonalForm', () => {
  const tipoPersonal = new TipoPersonalModel({ _id: '1', valor: 'valor 1', codigo: 'v' });

  let component: TipoPersonalFormComponent;
  let fixture: ComponentFixture<TipoPersonalFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoPersonalFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoPersonalService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoPersonalFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Tipo Personal', async(() => {
    const tipoPersonalVacio = new TipoPersonalModel({ valor: '' });
    const categoriaService = fixture.debugElement.injector.get(TipoPersonalService);

    component.tipoPersonal = tipoPersonalVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoPersonal.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.tipoPersonal).toBe(tipoPersonalVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmTipoPersonal.valid).toBeFalsy();
      valor.setValue(tipoPersonal.valor);
      expect(component.frmTipoPersonal.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(categoriaService, 'post').and.callFake(() => Observable.of(tipoPersonal));
    });
  }));

  it('edit Tipo Personal', async(() => {
    const categoriaService = fixture.debugElement.injector.get(TipoPersonalService);

    component.tipoPersonal = tipoPersonal;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmTipoPersonal.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.tipoPersonal).toBe(tipoPersonal);
      expect(component.isNew).toBe(false);
      expect(component.frmTipoPersonal.valid).toBeTruthy();
      expect(valor.value).toBe(tipoPersonal.valor);

      spyOn(component, 'update');
      spyOn(categoriaService, 'put').and.callFake(() => Observable.of(tipoPersonal));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
