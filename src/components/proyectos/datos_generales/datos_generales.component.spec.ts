// /* tslint:disable:no-unused-variable */
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { ProyectoModel } from '../../../models/proyecto.model';
import { SumPipe } from '../../../pipes/keys_sum.pipe';
import { ApiService } from '../../../providers/base/api.service';
import { BaseService } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { SharedModule } from '../../shared/shared.module';
import { DataProvider } from '../../../providers/data/data.provider';
import { DatosGeneralesComponent } from './datos_generales.component';
import { EstadosProyectoService } from '../../../providers/catalogos/estados_proyecto.service';

describe('Component: Datos Generales', () => {
  const proyecto = new ProyectoModel({
    '_id': 'sdsadasdasdasds',
    'aportacion_ong': 100,
    'coste_total': 200,
    'socio_local': '120',
    // 'duracion': 1,
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

  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [DatosGeneralesComponent, SumPipe],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        SharedModule
      ],
      providers: [
        ProyectoService,
        DataProvider,
        ApiService,
        BaseService,
        EstadosProyectoService,
        Common,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: (Observable.of({ id: '5af41848a34974135c044edc' }))
            }
          }
        }
      ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(console, 'log').and.callThrough();
  });

  /*
  *   COMPONENT BEFORE INIT
  */
  it(`should be initialized`, () => {
    // expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it(`should retrieve param id from parent route params`, (done: DoneFn) => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      done();
    });
  });

  it(`should be on on inititialize`, (done: DoneFn) => {
    const proyectoService = fixture.debugElement.injector.get(ProyectoService);
    spyOn(proyectoService, 'get').and.callFake(() => Observable.of(proyecto));
    component.initialize();
    fixture.whenStable().then(() => {
      expect(component.proyecto).toEqual(proyecto);
      done();
    });
  });

  it(`should be on create`, (done: DoneFn) => {
    const proyectoService = fixture.debugElement.injector.get(ProyectoService);
    spyOn(proyectoService, 'post').and.callFake(() => Observable.of(proyecto));
    component.create();
    fixture.whenStable().then(() => {
      expect(component.proyecto).toEqual(proyecto);
      done();
    });
  });

  it(`should be on edit`, (done: DoneFn) => {
    const proyectoService = fixture.debugElement.injector.get(ProyectoService);
    spyOn(proyectoService, 'put').and.callFake(() => Observable.of(proyecto));
    component.edit();
    fixture.whenStable().then(() => {
      expect(component.proyecto).toEqual(proyecto);
      done();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
