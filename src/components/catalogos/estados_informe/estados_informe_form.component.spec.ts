import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EstadoInformeModel } from '../../../models/estado_informe.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { EstadosInformeService } from '../../../providers/catalogos/estados_informe.service';
import { Common } from '../../../providers/common/common';
import { EstadosInformeFormComponent } from './estados_informe_form.component';


describe('Component: EstadosInformeForm', () => {
  const estadoInforme = new EstadoInformeModel({ _id: '1', nombre: 'estado 1', estado_siguiente: null, final: false });

  let component: EstadosInformeFormComponent;
  let fixture: ComponentFixture<EstadosInformeFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EstadosInformeFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [EstadosInformeService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(EstadosInformeFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Estado Informe', async(() => {
    const estadoInformeVacio = new EstadoInformeModel({ _id: '', nombre: '', estado_siguiente: null, final: false });
    const estadosInformeProvider = fixture.debugElement.injector.get(EstadosInformeService);

    component.estadoInforme = estadoInformeVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const nombre = component.frmEstadoInforme.controls['nombre'];
    const estadoSiguiente = component.frmEstadoInforme.controls['estado_siguiente'];
    const final = component.frmEstadoInforme.controls['final'];

    fixture.whenStable().then(() => {
      expect(component.estadoInforme).toBe(estadoInformeVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmEstadoInforme.valid).toBeFalsy();

      nombre.setValue(estadoInforme.nombre);
      estadoSiguiente.setValue(estadoInforme.estado_siguiente);
      final.setValue(estadoInforme.final);

      expect(component.frmEstadoInforme.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(estadosInformeProvider, 'post').and.callFake(() => Observable.of(estadoInforme));
    });
  }));

  it('edit Estado Informe', async(() => {
    const estadosInformeService = fixture.debugElement.injector.get(EstadosInformeService);

    component.estadoInforme = estadoInforme;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const nombre = component.frmEstadoInforme.controls['nombre'];
    const estadoSiguiente = component.frmEstadoInforme.controls['estado_siguiente'];
    const final = component.frmEstadoInforme.controls['final'];



    fixture.whenStable().then(() => {
      expect(component.estadoInforme).toBe(estadoInforme);
      expect(component.isNew).toBe(false);
      expect(component.frmEstadoInforme.valid).toBeTruthy();
      expect(nombre.value).toBe(estadoInforme.nombre);
      expect(estadoSiguiente.value).toBe(estadoInforme.estado_siguiente);
      expect(final.value).toBe(estadoInforme.final);

      spyOn(component, 'update');
      spyOn(estadosInformeService, 'put').and.callFake(() => Observable.of(estadoInforme));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();
    });
  }));
});
