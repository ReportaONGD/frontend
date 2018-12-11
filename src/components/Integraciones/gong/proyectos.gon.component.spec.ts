// /* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { ProyectoModel } from '../../../models/proyecto.model';
import { PipesModule } from '../../../pipes/pipes.module';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { FinanciadorService } from '../../../providers/catalogos/financiador.service';
import { ImplementadorService } from '../../../providers/catalogos/implementador.service';
import { Common } from '../../../providers/common/common';
import { DataProvider } from '../../../providers/data/data.provider';
import { ProyectoGongService } from '../../../providers/integraciones/gong/proyecto.gong.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { ProyectosGongComponent } from './proyectos.gong.component';

describe('Component: Proyectos', () => {
  const proyecto = new ProyectoModel({
    'aportacion_ong': 100,
    'coste_total': 200,
    'socio_local': '120',
    'provincia_municipio': 'Provincia',
    'ong_agrupacion': 'Ong_agrupacion',
    'gestor': 'gestor',
    'titulo': 'Proyecto 1',
    'nombre': 'Proyecto 1',
    'codigo': 'Proyecto_1',
    'pais': [{
      _id: '5af414eba34974135c044d2c',
      valor: 'Afghanistan'
    }]
  });

  const proyectos: ProyectoModel[] = [proyecto];
  let component: ProyectosGongComponent;
  let fixture: ComponentFixture<ProyectosGongComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosGongComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule,
        PipesModule
      ],
      providers: [ProyectoService, FinanciadorService, ImplementadorService, ApiService, BaseService,
        Common, DataProvider],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [Confirm2Component]
      }
    });
    // create component and test fixture
    fixture = TestBed.createComponent(ProyectosGongComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
  });

  /*
   *   COMPONENT BEFORE INIT
   */
  it(`should be initialized`, () => {
    expect(component).toBeDefined();
  });

  it(`should be on oninit`, (done: DoneFn) => {
    const proyectoService = fixture.debugElement.injector.get(ProyectoGongService);
    spyOn(proyectoService, 'all').and.callFake(() => Observable.of(proyectos));
    component.initialize();
    fixture.whenStable().then(() => {
      // expect(component.proyectos).toEqual(proyectos);
      expect(component.proyectos.length).toBe(1);
      done();
    });
  });
});
