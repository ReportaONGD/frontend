import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CostesModel } from '../../models/costes.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { CostesService } from './costes.service';

describe('Service: Costes', () => {
  let service: CostesService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const costes = new Array<CostesModel>(new CostesModel({
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
      CostesService,
      ApiService
    ]
    });
    service = TestBed.get(CostesService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<CostesModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(costes));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(costes);
    });
  });
  it('post CostesModel item and return CostesModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put CostesModel item and return CostesModel object', () => {
    costes[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(costes[0]));
    service.put(costes[0]._id, costes[0]).subscribe((data) => {
        expect(data).toEqual(costes[0]);
    });
  });
  it('get CostesModel item and return CostesModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(costes[0]));
    service.get(costes[0]._id).subscribe((data) => {
        expect(data).toEqual(costes[0]);
    });
  });
  it('delete CostesModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Costes Deleted Correctly'));
    service.delete(costes[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
