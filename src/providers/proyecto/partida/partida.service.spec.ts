import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { PartidaService } from './partida.service';

describe('Service: Partida', () => {
  let service: PartidaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const partida = [
    {
        _id: '5b04082dbd3cbf001109cd30',
        nombre: 'string',
        codigo: 'string',
        costes: null,
        importe: 1,
        aecid: false,
        partida_padre: null,
        es_padre: false,
        es_inversion: false
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('PartidaService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        PartidaService,
        ApiService
      ]
    });
    service = TestBed.get(PartidaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Partidas from project, returns Array<PartidaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(partida));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(partida);
    });
  });
  it('post PartidaModel item and return PartidaModel object', () => {
    const item = {
        nombre: 'string',
        codigo: 'string',
        costes: null,
        importe: 1,
        aecid: false,
        partida_padre: null,
        es_padre: false,
        es_inversion: false
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put PartidaModel item and return PartidaModel object', () => {
    partida[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(partida[0]));
    service.put(partida[0]._id, partida[0]).subscribe((data) => {
      expect(data).toEqual(partida[0]);
    });
  });
  it('get PartidaModel item and return PartidaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(partida[0]));
    service.get(partida[0]._id).subscribe((data) => {
      expect(data).toEqual(partida[0]);
    });
  });
  it('delete PartidaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Partida Deleted Correctly'));
    service.delete(partida[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
