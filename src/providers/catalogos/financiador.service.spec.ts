import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { FinanciadorModel } from '../../models/financiador.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { FinanciadorService } from './financiador.service';

describe('Service: Financiador', () => {
  let service: FinanciadorService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const financiadores = new Array<FinanciadorModel>(new FinanciadorModel({
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
      FinanciadorService,
      ApiService
    ]
    });
    service = TestBed.get(FinanciadorService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<FinanciadorModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(financiadores));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(financiadores);
    });
  });
  it('post FinanciadorModel item and return FinanciadorModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put FinanciadorModel item and return FinanciadorModel object', () => {
    financiadores[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(financiadores[0]));
    service.put(financiadores[0]._id, financiadores[0]).subscribe((data) => {
        expect(data).toEqual(financiadores[0]);
    });
  });
  it('get FinanciadorModel item and return FinanciadorModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(financiadores[0]));
    service.get(financiadores[0]._id).subscribe((data) => {
        expect(data).toEqual(financiadores[0]);
    });
  });
  it('delete FinanciadorModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Financiador Deleted Correctly'));
    service.delete(financiadores[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
