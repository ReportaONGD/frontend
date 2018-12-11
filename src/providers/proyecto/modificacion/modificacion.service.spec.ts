import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../base/api.service';
import { ModificacionService } from './modificacion.service';
import { Observable } from 'rxjs/Observable';

describe('Service: Modificacion', () => {
  let service: ModificacionService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const modificacion = [
      {
        fecha: '2018-05-17 00:00:00.000',
        descripcion: 'modificacion 1 mod',
        _id: '5af56bc7003c4d58b81a9765',
        updatedAt: '2018-05-11 12:13:54.992',
        createdAt: '2018-05-11 12:09:11.309'
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
      ModificacionService,
      ApiService
    ]
    });
    service = TestBed.get(ModificacionService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all modificaciones from project, returns Array<ModificacionModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(modificacion));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(modificacion);
    });
  });
  it('post ModificacionModel item and return ModificacionModel object', () => {
    const item = {
      fecha: '02/06/2019',
      descripcion: 'modificacion 2'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put ModificacionModel item and return ModificacionModel object', () => {
    modificacion[0].descripcion = 'modificacion 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(modificacion[0]));
    service.put(modificacion[0]._id, modificacion[0]).subscribe((data) => {
        expect(data).toEqual(modificacion[0]);
    });
  });
  it('get ModificacionModel item and return ModificacionModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(modificacion[0]));
    service.get(modificacion[0]._id).subscribe((data) => {
        expect(data).toEqual(modificacion[0]);
    });
  });
  it('delete ModificacionModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Modificacion Deleted Correctly'));
    service.delete(modificacion[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
