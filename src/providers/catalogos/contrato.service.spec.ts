import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ContratoModel } from '../../models/contrato.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { ContratoService } from './contrato.service';

describe('Service: Contrato', () => {
  let service: ContratoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const contratos = new Array<ContratoModel>(new ContratoModel({
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
      ContratoService,
      ApiService
    ]
    });
    service = TestBed.get(ContratoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<ContratoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(contratos));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(contratos);
    });
  });
  it('post ContratoModel item and return ContratoModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put ContratoModel item and return ContratoModel object', () => {
    contratos[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(contratos[0]));
    service.put(contratos[0]._id, contratos[0]).subscribe((data) => {
        expect(data).toEqual(contratos[0]);
    });
  });
  it('get ContratoModel item and return ContratoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(contratos[0]));
    service.get(contratos[0]._id).subscribe((data) => {
        expect(data).toEqual(contratos[0]);
    });
  });
  it('delete ContratoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Contrato Deleted Correctly'));
    service.delete(contratos[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
