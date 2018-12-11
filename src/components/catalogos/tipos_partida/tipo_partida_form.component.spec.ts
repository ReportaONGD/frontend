import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TipoPartidaModel } from '../../../models/tipo_partida.model';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { TipoPartidaService } from '../../../providers/catalogos/tipo_partida.service';
import { Common } from '../../../providers/common/common';
import { TipoPartidaFormComponent } from './tipo_partida_form.component';


describe('Component: TipoPartidaForm', () => {
  const tipoPartida = new TipoPartidaModel({ _id: '1', codigo: 'codigo 1', nombre: 'nombre 1' , costes: {_id: '1', valor: 'coste 1', empresa: null} });

  let component: TipoPartidaFormComponent;
  let fixture: ComponentFixture<TipoPartidaFormComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TipoPartidaFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()],
      providers: [TipoPartidaService, ApiService, BaseService, Common, NgbActiveModal]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TipoPartidaFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });


  it('new Tipo Partida', async(() => {
    const tipoPartidaVacio = new TipoPartidaModel({ codigo: '', nombre: '' });
    const tipoPartidaService = fixture.debugElement.injector.get(TipoPartidaService);

    component.tipoPartida = tipoPartidaVacio;
    component.isNew = true;
    fixture.detectChanges();

    component.ngOnInit();
    const codigo = component.frmTipoPartida.controls['codigo'];
    const nombre = component.frmTipoPartida.controls['nombre'];
    const costes = component.frmTipoPartida.controls['costes'];
    fixture.whenStable().then(() => {
      expect(component.isNew).toBe(true);
      expect(component.tipoPartida).toBe(tipoPartidaVacio);
      expect(component.frmTipoPartida.valid).toBeFalsy();
      codigo.setValue(tipoPartida.codigo);
      nombre.setValue(tipoPartida.nombre);
      costes.setValue(tipoPartida.costes);
      expect(component.frmTipoPartida.valid).toBeTruthy();
      spyOn(component, 'create');
      component.onSubmit();
      expect(component.create).toHaveBeenCalled();
      spyOn(tipoPartidaService, 'post').and.callFake(() => Observable.of(tipoPartida));
    });
  }));

  it('edit Tipo Partida', async(() => {
    const tipoPartidaService = fixture.debugElement.injector.get(TipoPartidaService);

    component.tipoPartida = tipoPartida;
    component.isNew = false;
    fixture.detectChanges();

    component.ngOnInit();
    const nombre = component.frmTipoPartida.controls['nombre'];
    const codigo = component.frmTipoPartida.controls['codigo'];


    fixture.whenStable().then(() => {
      expect(component.tipoPartida).toBe(tipoPartida);
      expect(component.isNew).toBe(false);
      expect(component.frmTipoPartida.valid).toBeTruthy();
      expect(nombre.value).toBe(tipoPartida.nombre);
      expect(codigo.value).toBe(tipoPartida.codigo);

      spyOn(component, 'update');
      spyOn(tipoPartidaService, 'put').and.callFake(() => Observable.of(tipoPartida));

      component.onSubmit();
      expect(component.update).toHaveBeenCalled();


    });
  }));
});
