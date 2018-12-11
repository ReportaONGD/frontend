import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { EstadoProyectoModel } from '../../../models/estado_proyecto.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';
import { Common } from '../../../providers/common/common';
import { EstadosProyectoFormComponent } from './estados_proyecto_form.component';


describe('Component: EstadosProyectoForm', () => {
  const estadoProyecto = new EstadoProyectoModel({ _id: '1', nombre: 'estado 1', estado_anterior: null, final: false });

  let component: EstadosProyectoFormComponent;
  let fixture: ComponentFixture<EstadosProyectoFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [EstadosProyectoFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [EstadosProyectoService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(EstadosProyectoFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Estado Proyecto', async(() => {
    const estadoProyectoVacio = new EstadoProyectoModel({ _id: '', nombre: '', estado_anterior: null, final: false });
    const estadosProyectoService = fixture.debugElement.injector.get(EstadosProyectoService);

    component.estadoProyecto = estadoProyectoVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const nombre = component.frmEstadoProyecto.controls['nombre'];
    const estadoSiguiente = component.frmEstadoProyecto.controls['estado_anterior'];
    const final = component.frmEstadoProyecto.controls['final'];

    fixture.whenStable().then(() => {
      expect(component.estadoProyecto).toBe(estadoProyectoVacio);
      expect(component.isNew).toBe(true);
      expect(component.frmEstadoProyecto.valid).toBeFalsy();

      nombre.setValue(estadoProyecto.nombre);
      estadoSiguiente.setValue(estadoProyecto.estado_anterior);
      final.setValue(estadoProyecto.final);

      expect(component.frmEstadoProyecto.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(estadosProyectoService, 'post').and.callFake(() => Observable.of(estadoProyecto));
    });
  }));

  it('edit Estado Proyecto', async(() => {
    const estadosProyectoService = fixture.debugElement.injector.get(EstadosProyectoService);

    component.estadoProyecto = estadoProyecto;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const nombre = component.frmEstadoProyecto.controls['nombre'];
    const estadoSiguiente = component.frmEstadoProyecto.controls['estado_anterior'];
    const final = component.frmEstadoProyecto.controls['final'];



    fixture.whenStable().then(() => {
      expect(component.estadoProyecto).toBe(estadoProyecto);
      expect(component.isNew).toBe(false);
      expect(component.frmEstadoProyecto.valid).toBeTruthy();
      expect(nombre.value).toBe(estadoProyecto.nombre);
      expect(estadoSiguiente.value).toBe(estadoProyecto.estado_anterior);
      expect(final.value).toBe(estadoProyecto.final);

      spyOn(component, 'update');
      spyOn(estadosProyectoService, 'put').and.callFake(() => Observable.of(estadoProyecto));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();
    });
  }));
});
