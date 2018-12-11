import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { EstadoProyectoModel } from '../../models/estado_proyecto.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { EstadosProyectoProvider } from './estados_proyecto.service';

describe('Service: Estados Proyecto', () => {
  let service: EstadosProyectoProvider;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const estados = new Array<EstadoProyectoModel>(new EstadoProyectoModel({
      _id: '1',
      nombre: 'nombre'
  }));
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
      EstadosProyectoProvider,
      ApiService
    ]
    });
    service = TestBed.get(EstadosProyectoProvider);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<EstadoProyectoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(estados));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(estados);
    });
  });
  it('post EstadoProyectoModel item and return EstadoProyectoModel object', () => {
    const item = {
      nombre: 'nombre 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put EstadoProyectoModel item and return EstadoProyectoModel object', () => {
    estados[0].nombre = 'nombre 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(estados[0]));
    service.put(estados[0]._id, estados[0]).subscribe((data) => {
        expect(data).toEqual(estados[0]);
    });
  });
  it('get EstadoProyectoModel item and return EstadoProyectoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(estados[0]));
    service.get(estados[0]._id).subscribe((data) => {
        expect(data).toEqual(estados[0]);
    });
  });
  it('delete EstadoProyectoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Estado Proyecto Deleted Correctly'));
    service.delete(estados[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
