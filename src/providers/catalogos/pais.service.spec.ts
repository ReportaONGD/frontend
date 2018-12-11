import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PaisModel } from '../../models/pais.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { PaisService } from './pais.service';

describe('Service: Pais', () => {
  let service: PaisService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const paises = new Array<PaisModel>(new PaisModel({
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
      PaisService,
      ApiService
    ]
    });
    service = TestBed.get(PaisService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<PaisModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(paises));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(paises);
    });
  });
  it('post PaisModel item and return PaisModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put PaisModel item and return PaisModel object', () => {
    paises[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(paises[0]));
    service.put(paises[0]._id, paises[0]).subscribe((data) => {
        expect(data).toEqual(paises[0]);
    });
  });
  it('get PaisModel item and return PaisModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(paises[0]));
    service.get(paises[0]._id).subscribe((data) => {
        expect(data).toEqual(paises[0]);
    });
  });
  it('delete PaisModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('País Deleted Correctly'));
    service.delete(paises[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
