import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../../base/api.service';
import { ResultadoHipotesisService } from './resultado_hipotesis.service';
import { Observable } from 'rxjs/Observable';
import { HipotesisModel } from '../../../../../models/hipotesis.model';

describe('Service: Hipotesis Objetivo Especifico', () => {
  let service: ResultadoHipotesisService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<HipotesisModel>(new HipotesisModel({
      _id: '1',
      descripcion: 'DESC OE.R1.H1'
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
      ResultadoHipotesisService,
      ApiService
    ]
    });
    service = TestBed.get(ResultadoHipotesisService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all hipotesis from one resultado , returns Array<HipotesisModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(actividad);
    });
  });
  it('post HipotesisModel item and return HipotesisModel object', () => {
    const item = {
      descripcion: 'DESC OE.R1.H3'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put HipotesisModel item and return HipotesisModel object', () => {
    actividad[0].descripcion = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('get HipotesisModel item and return HipotesisModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('delete HipotesisModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Hipotesis Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
