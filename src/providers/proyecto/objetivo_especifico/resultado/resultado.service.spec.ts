import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../base/api.service';
import { ResultadoService } from './resultado.service';
import { Observable } from 'rxjs/Observable';
import { ResultadoModel } from '../../../../models/resultado.model';

describe('Service: Resutlado Objetivo Especifico', () => {
  let service: ResultadoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<ResultadoModel>(new ResultadoModel({
      _id: '1',
      codigo: 'OE.R1',
      descripcion: 'DESC OE.R1'
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
      ResultadoService,
      ApiService
    ]
    });
    service = TestBed.get(ResultadoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all resultados from one objetivo especifico , returns Array<ResultadoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(actividad);
    });
  });
  it('post ResultadoModel item and return ResultadoModel object', () => {
    const item = {
      codigo: 'OE.R2',
      descripcion: 'DESC OE.R2'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put ResultadoModel item and return ResultadoModel object', () => {
    actividad[0].descripcion = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('get ResultadoModel item and return ResultadoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('delete ResultadoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Resultado Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
