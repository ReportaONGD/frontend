import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TipoValoracionModel } from '../../models/tipo_valoracion.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { TipoValoracionService } from './tipo_valoracion.service';

describe('Service: Tipo Valoracion', () => {
  let service: TipoValoracionService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const tipos = new Array<TipoValoracionModel>(new TipoValoracionModel({
      _id: '1',
      valor: 'valor'
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
      TipoValoracionService,
      ApiService
    ]
    });
    service = TestBed.get(TipoValoracionService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<TipoValoracionModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(tipos));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(tipos);
    });
  });
  it('post TipoValoracionModel item and return TipoValoracionModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put TipoValoracionModel item and return TipoValoracionModel object', () => {
    tipos[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(tipos[0]));
    service.put(tipos[0]._id, tipos[0]).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('get TipoValoracionModel item and return TipoValoracionModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(tipos[0]));
    service.get(tipos[0]._id).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('delete TipoValoracionModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Tipo Valoracion Deleted Correctly'));
    service.delete(tipos[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
