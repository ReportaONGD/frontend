import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LocalizacionModel } from '../../../models/localizacion.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { LocalizacionService } from '../../../providers/catalogos/localizacion.service';
import { Common } from '../../../providers/common/common';
import { LocalizacionFormComponent } from './localizacion_form.component';


describe('Component: LocalizacionForm', () => {
  const localizacion = new LocalizacionModel({ _id: '1', valor: 'valor 1' });

  let component: LocalizacionFormComponent;
  let fixture: ComponentFixture<LocalizacionFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LocalizacionFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [LocalizacionService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LocalizacionFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Localización', async(() => {
    const tipoMovimientoVacio = new LocalizacionModel({ valor: '' });
    const localizacionService = fixture.debugElement.injector.get(LocalizacionService);

    component.localizacion = tipoMovimientoVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmLocalizacion.controls['valor'];

    fixture.whenStable().then(() => {
      expect(component.localizacion).toBe(tipoMovimientoVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmLocalizacion.valid).toBeFalsy();
      valor.setValue(localizacion.valor);
      expect(component.frmLocalizacion.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(localizacionService, 'post').and.callFake(() => Observable.of(localizacion));
    });
  }));

  it('edit Localización', async(() => {
    const localizacionService = fixture.debugElement.injector.get(LocalizacionService);

    component.localizacion = localizacion;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const valor = component.frmLocalizacion.controls['valor'];


    fixture.whenStable().then(() => {
      expect(component.localizacion).toBe(localizacion);
      expect(component.isNew).toBe(false);
      expect(component.frmLocalizacion.valid).toBeTruthy();
      expect(valor.value).toBe(localizacion.valor);

      spyOn(component, 'update');
      spyOn(localizacionService, 'put').and.callFake(() => Observable.of(localizacion));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
