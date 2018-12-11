import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { TipoPeriodoService } from './tipo_periodo.service';

describe('Service: Tipo Periodo', () => {
  let service: TipoPeriodoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const tipo_periodo = [
    {
     _id: '5b04082dbd3cbf001109cd30',
     valor: 'valor'
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('TipoPeriodoService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        TipoPeriodoService,
        ApiService
      ]
    });
    service = TestBed.get(TipoPeriodoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Tipos Periodo from project, returns Array<TipoPeriodoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(tipo_periodo));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(tipo_periodo);
    });
  });
  it('post TipoPeriodoModel item and return TipoPeriodoModel object', () => {
    const item = {
      valor: 'valor 1'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put TipoPeriodoModel item and return TipoPeriodoModel object', () => {
    tipo_periodo[0].valor = 'valor 2';
    spyOn(service, 'put').and.callFake(() => Observable.of(tipo_periodo[0]));
    service.put(tipo_periodo[0]._id, tipo_periodo[0]).subscribe((data) => {
      expect(data).toEqual(tipo_periodo[0]);
    });
  });
  it('get TipoPeriodoModel item and return TipoPeriodoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(tipo_periodo[0]));
    service.get(tipo_periodo[0]._id).subscribe((data) => {
      expect(data).toEqual(tipo_periodo[0]);
    });
  });
  it('delete TipoPeriodoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Tipo Periodo Deleted Correctly'));
    service.delete(tipo_periodo[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
