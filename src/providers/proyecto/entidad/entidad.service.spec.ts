import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../base/api.service';
import { EntidadService } from './entidad.service';
import { Observable } from 'rxjs/Observable';

describe('Service: Entidad', () => {
  let service: EntidadService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const entidad = [{
      nombre: 'entidad 1',
      _id: '5af94fdd70367c0160162efb',
      empresa: '5af414eba34974135c044d2a',
      updatedAt: '2018-05-14 10:59:09.580',
      createdAt: '2018-05-14 10:59:09.580'
    }];
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
      EntidadService,
      ApiService
    ]
    });
    service = TestBed.get(EntidadService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all entidades from project, returns Array<EntidadModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(entidad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(entidad);
    });
  });
  it('post EntidadModel item and return EntidadModel object', () => {
    const item = {
      nombre: 'entidad 2',
      cuantia: 1000,
      privada: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put EntidadModel item and return EntidadModel object', () => {
    entidad[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(entidad[0]));
    service.put(entidad[0]._id, entidad[0]).subscribe((data) => {
        expect(data).toEqual(entidad[0]);
    });
  });
  it('get EntidadModel item and return EntidadModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(entidad[0]));
    service.get(entidad[0]._id).subscribe((data) => {
        expect(data).toEqual(entidad[0]);
    });
  });
  it('delete EntidadModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Entidad Deleted Correctly'));
    service.delete(entidad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
