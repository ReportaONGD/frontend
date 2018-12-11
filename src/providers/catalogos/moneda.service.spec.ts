import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MonedaModel } from '../../models/moneda.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { MonedaService } from './moneda.service';

describe('Service: Contrato', () => {
  let service: MonedaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const monedas = new Array<MonedaModel>(new MonedaModel({
      _id: '1',
      codigo: 'valor',
      descripcion: 'desc'
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
      MonedaService,
      ApiService
    ]
    });
    service = TestBed.get(MonedaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<MonedaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(monedas));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(monedas);
    });
  });
  it('post MonedaModel item and return MonedaModel object', () => {
    const item = {
      codigo: 'valor 2',
      descripcion: 'true'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put MonedaModel item and return MonedaModel object', () => {
    monedas[0].codigo = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(monedas[0]));
    service.put(monedas[0]._id, monedas[0]).subscribe((data) => {
        expect(data).toEqual(monedas[0]);
    });
  });
  it('get MonedaModel item and return MonedaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(monedas[0]));
    service.get(monedas[0]._id).subscribe((data) => {
        expect(data).toEqual(monedas[0]);
    });
  });
  it('delete MonedaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Contrato Deleted Correctly'));
    service.delete(monedas[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
