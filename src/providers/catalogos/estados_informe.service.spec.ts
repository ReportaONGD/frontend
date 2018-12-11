import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { EstadoInformeModel } from '../../models/estado_informe.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { EstadosInformeService } from './estados_informe.service';

describe('Service: Estados Informe', () => {
  let service: EstadosInformeService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const estados = new Array<EstadoInformeModel>(new EstadoInformeModel({
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
      EstadosInformeService,
      ApiService
    ]
    });
    service = TestBed.get(EstadosInformeService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<EstadoInformeModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(estados));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(estados);
    });
  });
  it('post EstadoInformeModel item and return EstadoInformeModel object', () => {
    const item = {
      nombre: 'nombre 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put EstadoInformeModel item and return EstadoInformeModel object', () => {
    estados[0].nombre = 'nombre 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(estados[0]));
    service.put(estados[0]._id, estados[0]).subscribe((data) => {
        expect(data).toEqual(estados[0]);
    });
  });
  it('get EstadoInformeModel item and return EstadoInformeModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(estados[0]));
    service.get(estados[0]._id).subscribe((data) => {
        expect(data).toEqual(estados[0]);
    });
  });
  it('delete EstadoInformeModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Contrato Deleted Correctly'));
    service.delete(estados[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
