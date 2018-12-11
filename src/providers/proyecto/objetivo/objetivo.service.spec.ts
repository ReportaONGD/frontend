import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../base/api.service';
import { ObjetivoService } from './objetivo.service';
import { Observable } from 'rxjs/Observable';

describe('Service: Objetivo', () => {
  let service: ObjetivoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const objetivo = {
        '_id': '5af414eba34974135c067676',
        'codigo': 'OG',
        'descripcion': 'DESC OG'
       };
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
      ObjetivoService,
      ApiService
    ]
    });
    service = TestBed.get(ObjetivoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('post ObjetivoModel item and return ObjetivoModel object', () => {
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
  it('put ObjetivoModel item and return ObjetivoModel object', () => {
    objetivo.descripcion = 'DESC OG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(objetivo));
    service.put(objetivo._id, objetivo).subscribe((data) => {
        expect(data).toEqual(objetivo);
    });
  });
  it('get ObjetivoModel item and return ObjetivoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(objetivo));
    service.get(objetivo._id).subscribe((data) => {
        expect(data).toEqual(objetivo);
    });
  });
  it('delete ObjetivoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Objetivo Deleted Correctly'));
    service.delete(objetivo._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
