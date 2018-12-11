import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { GastosService } from './gastos.service';

describe('Service: Gasto', () => {
  let service: GastosService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const gastos = [
    {
      _id: '1',
      fecha: new Date(),
      numero_orden: '12345',
      emisor: 'string',
      concepto: 'string',
      importe_local: 1,
      tipo_de_cambio_dm: 1,
      tipo_de_cambio_ld: 1,
      moneda: null,
      partida: null,
      financiador: null,
      actividad: null,
      documentos: null
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('GastosService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        GastosService,
        ApiService
      ]
    });
    service = TestBed.get(GastosService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Gastos from project, returns Array<GastoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(gastos));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(gastos);
    });
  });
  it('post GastoModel item and return GastoModel object', () => {
    const item = {
      _id: '1',
      fecha: new Date(),
      numero_orden: 'dfsfsdfd',
      emisor: 'strfdssfding',
      concepto: 'ddsdsd',
      importe_local: 1,
      tipo_de_cambio_dm: 1,
      tipo_de_cambio_ld: 1,
      moneda: null,
      partida: null,
      financiador: null,
      actividad: null,
      documentos: null
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put GastoModel item and return GastoModel object', () => {
    gastos[0].importe_local = 3;
    spyOn(service, 'put').and.callFake(() => Observable.of(gastos[0]));
    service.put(gastos[0]._id, gastos[0]).subscribe((data) => {
      expect(data).toEqual(gastos[0]);
    });
  });
  it('get GastoModel item and return GastoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(gastos[0]));
    service.get(gastos[0]._id).subscribe((data) => {
      expect(data).toEqual(gastos[0]);
    });
  });
  it('delete GastoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Gasto Deleted Correctly'));
    service.delete(gastos[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
