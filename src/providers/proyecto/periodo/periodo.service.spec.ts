import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { PeriodoService } from './periodo.service';

describe('Service: Periodo', () => {
  let service: PeriodoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const periodo = [
    {
      _id: '5b04082dbd3cbf001109cd30',
      nombre: 'string',
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      tipo_periodo: null
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('PeriodoService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        PeriodoService,
        ApiService
      ]
    });
    service = TestBed.get(PeriodoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Periodos from project, returns Array<PeriodoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(periodo));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(periodo);
    });
  });
  it('post PeriodoModel item and return PeriodoModel object', () => {
    const item = {
      nombre: 'string',
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      tipo_periodo: null
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put PeriodoModel item and return PeriodoModel object', () => {
    periodo[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(periodo[0]));
    service.put(periodo[0]._id, periodo[0]).subscribe((data) => {
      expect(data).toEqual(periodo[0]);
    });
  });
  it('get PeriodoModel item and return PeriodoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(periodo[0]));
    service.get(periodo[0]._id).subscribe((data) => {
      expect(data).toEqual(periodo[0]);
    });
  });
  it('delete PeriodoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Periodo Deleted Correctly'));
    service.delete(periodo[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
