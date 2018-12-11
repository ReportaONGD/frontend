import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CofinanciadorModel } from '../../models/cofinanciador.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { CofinanciadorService } from './cofinanciador.service';

describe('Service: Cofinanciador', () => {
  let service: CofinanciadorService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const cofinanciadores = new Array<CofinanciadorModel>(new CofinanciadorModel({
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
      CofinanciadorService,
      ApiService
    ]
    });
    service = TestBed.get(CofinanciadorService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<CofinanciadorModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(cofinanciadores));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(cofinanciadores);
    });
  });
  it('post CofinanciadorModel item and return CofinanciadorModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put CofinanciadorModel item and return CofinanciadorModel object', () => {
    cofinanciadores[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(cofinanciadores[0]));
    service.put(cofinanciadores[0]._id, cofinanciadores[0]).subscribe((data) => {
        expect(data).toEqual(cofinanciadores[0]);
    });
  });
  it('get CofinanciadorModel item and return CofinanciadorModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(cofinanciadores[0]));
    service.get(cofinanciadores[0]._id).subscribe((data) => {
        expect(data).toEqual(cofinanciadores[0]);
    });
  });
  it('delete CofinanciadorModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Cofinanciador Deleted Correctly'));
    service.delete(cofinanciadores[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
