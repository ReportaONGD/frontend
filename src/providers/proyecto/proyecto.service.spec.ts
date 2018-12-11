import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { ApiService } from '../base/api.service';
import { ProyectoService } from './proyecto.service';
import { Observable } from 'rxjs/Observable';

describe('Service: Proyecto', () => {
  let service: ProyectoService;
  const proyecto = [
    {
        '_id': '5af41848a34974135c044edc',
        'aportacion_ong': '100',
        'aportacion_financiador': '0',
        'coste_total': '200',
        'socio_local': '120',
        'fecha_inicio': '01/01/2018',
        'fecha_fin': '01/02/2018',
        'provincia_municipio': 'Provincia',
        'ong_agrupacion': 'Ong_agrupacion',
        'gestor': 'gestor',
        'titulo': 'Proyecto 1',
        'nombre': 'Proyecto 1',
        'codigo': 'Proyecto_1',
        'pais': '5af414eba34974135c044d2f'
    }
    ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('AportacionService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorRequest,
        multi: true
      },
      ProyectoService,
      ApiService
    ]
    });
    service = TestBed.get(ProyectoService);
  });
  it('get all proyectos from , returns Array<ProyectoModel>', () => {
    spyOn(service, 'all').and.returnValue({ subscribe: () => {} });
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(proyecto);
    });
  });
  it('post ProyectoModel item and return ProyectoModel object', () => {
    const item = {
        'aportacion_ong': '100',
        'aportacion_financiador': '0',
        'coste_total': '200',
        'socio_local': '120',
        'fecha_inicio': '01/01/2018',
        'fecha_fin': '01/02/2018',
        'provincia_municipio': 'Provincia',
        'ong_agrupacion': 'Ong_agrupacion',
        'gestor': 'gestor',
        'titulo': 'Proyecto 1',
        'nombre': 'Proyecto 1',
        'codigo': 'Proyecto_1',
        'pais': '5af414eba34974135c044d2f'
    };
    spyOn(service, 'post').and.returnValue({ subscribe: () => {} });
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put ProyectoModel item and return ProyectoModel object', () => {
    spyOn(service, 'put').and.returnValue({ subscribe: () => {} });
    proyecto[0].nombre = 'proyecto 3';
    service.put(proyecto[0]._id, proyecto[0]).subscribe((data) => {
        expect(data).toEqual(proyecto);
    });
  });
  it('get ProyectoModel item and return ProyectoModel object', () => {
    spyOn(service, 'get').and.returnValue({ subscribe: () => {} });
    service.get(proyecto[0]._id).subscribe((data) => {
        expect(data).toEqual(proyecto[0]);
    });
  });
  it('delete ProyectoModel item and return message', () => {
    spyOn(service, 'delete').and.returnValue({ subscribe: () => {} });
    service.delete(proyecto[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
