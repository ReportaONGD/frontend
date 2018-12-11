import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TipoPartidaModel } from '../../models/tipo_partida.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { TipoPartidaService } from './tipo_partida.service';

describe('Service: Tipo Partida', () => {
  let service: TipoPartidaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const tipos = new Array<TipoPartidaModel>(new TipoPartidaModel({
      _id: '1',
      codigo: 'valor',
      nombre: 'nombre'
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
      TipoPartidaService,
      ApiService
    ]
    });
    service = TestBed.get(TipoPartidaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<TipoPartidaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(tipos));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(tipos);
    });
  });
  it('post TipoPartidaModel item and return TipoPartidaModel object', () => {
    const item = {
      nombre: 'valor 2',
      codigo: 'true'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put TipoPartidaModel item and return TipoPartidaModel object', () => {
    tipos[0].nombre = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(tipos[0]));
    service.put(tipos[0]._id, tipos[0]).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('get TipoPartidaModel item and return TipoPartidaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(tipos[0]));
    service.get(tipos[0]._id).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('delete TipoPartidaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Tipo Partida Deleted Correctly'));
    service.delete(tipos[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
