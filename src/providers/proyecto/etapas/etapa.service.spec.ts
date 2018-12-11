import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { EtapaService } from './etapa.service';

describe('Service: Etapa', () => {
  let service: EtapaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const etapa = [
    {
      _id: '1',
      nombre: 'string',
      descripcion: 'string',
      fecha_fin: '01/02/2018',
      fecha_inicio: '01/01/2018'
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('EtapaService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        EtapaService,
        ApiService
      ]
    });
    service = TestBed.get(EtapaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all etapas from project, returns Array<EtapaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(etapa));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(etapa);
    });
  });
  it('post EtapaModel item and return EtapaModel object', () => {
    const item = {
      _id: '1',
      nombre: 'string',
      descripcion: 'string',
      fecha_fin: '01/03/2018',
      fecha_inicio: '01/04/2018'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put EtapaModel item and return EtapaModel object', () => {
    etapa[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(etapa[0]));
    service.put(etapa[0]._id, etapa[0]).subscribe((data) => {
      expect(data).toEqual(etapa[0]);
    });
  });
  it('get EtapaModel item and return EtapaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(etapa[0]));
    service.get(etapa[0]._id).subscribe((data) => {
      expect(data).toEqual(etapa[0]);
    });
  });
  it('delete EtapaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Etapa Deleted Correctly'));
    service.delete(etapa[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
