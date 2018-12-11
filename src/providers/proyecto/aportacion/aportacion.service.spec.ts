import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../base/api.service';
import { AportacionService } from './aportacion.service';
import { Observable } from 'rxjs/Observable';

describe('Service: Aportacion', () => {
  let service: AportacionService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const aportacion = [
      {
        entidad: {
            nombre: 'entidad 1',
            _id: '5af94fdd70367c0160162efb',
            empresa: '5af414eba34974135c044d2a',
            updatedAt: '2018-05-14 10:59:09.580',
            createdAt: '2018-05-14 10:59:09.580'
        },
        cuantia: 122,
        privada: false,
        _id: '5af94fdd70367c0160162efa',
        updatedAt: '2018-05-14 10:59:09.580',
        createdAt: '2018-05-14 10:59:09.580'
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
      AportacionService,
      ApiService
    ]
    });
    service = TestBed.get(AportacionService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all aportaciones from project, returns Array<AportacionModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(aportacion));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(aportacion);
    });
  });
  it('post AportacionModel item and return aportacionmodel object', () => {
    const item = {
      entidad: {nombre: 'entidad 2'},
      cuantia: 1000,
      privada: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put AportacionModel item and return aportacionmodel object', () => {
    aportacion[0].entidad.nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(aportacion[0]));
    service.put(aportacion[0]._id, aportacion[0]).subscribe((data) => {
        expect(data).toEqual(aportacion[0]);
    });
  });
  it('get AportacionModel item and return aportacionmodel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(aportacion[0]));
    service.get(aportacion[0]._id).subscribe((data) => {
        expect(data).toEqual(aportacion[0]);
    });
  });
  it('delete AportacionModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Aportacion Deleted Correctly'));
    service.delete(aportacion[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
