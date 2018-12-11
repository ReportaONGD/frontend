import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TipoPersonalModel } from '../../models/tipo_personal.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { TipoPersonalService } from './tipo_personal.service';

describe('Service: Tipo Personal', () => {
  let service: TipoPersonalService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const tipos = new Array<TipoPersonalModel>(new TipoPersonalModel({
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
      TipoPersonalService,
      ApiService
    ]
    });
    service = TestBed.get(TipoPersonalService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<TipoPersonalModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(tipos));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(tipos);
    });
  });
  it('post TipoPersonalModel item and return TipoPersonalModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put TipoPersonalModel item and return TipoPersonalModel object', () => {
    tipos[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(tipos[0]));
    service.put(tipos[0]._id, tipos[0]).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('get TipoPersonalModel item and return TipoPersonalModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(tipos[0]));
    service.get(tipos[0]._id).subscribe((data) => {
        expect(data).toEqual(tipos[0]);
    });
  });
  it('delete TipoPersonalModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Tipo Personal Deleted Correctly'));
    service.delete(tipos[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
