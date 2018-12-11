import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalizacionModel } from '../../models/localizacion.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { LocalizacionService } from './localizacion.service';

describe('Service: Localizacion', () => {
  let service: LocalizacionService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const localizaciones = new Array<LocalizacionModel>(new LocalizacionModel({
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
      LocalizacionService,
      ApiService
    ]
    });
    service = TestBed.get(LocalizacionService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<LocalizacionModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(localizaciones));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(localizaciones);
    });
  });
  it('post LocalizacionModel item and return LocalizacionModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put LocalizacionModel item and return LocalizacionModel object', () => {
    localizaciones[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(localizaciones[0]));
    service.put(localizaciones[0]._id, localizaciones[0]).subscribe((data) => {
        expect(data).toEqual(localizaciones[0]);
    });
  });
  it('get LocalizacionModel item and return LocalizacionModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(localizaciones[0]));
    service.get(localizaciones[0]._id).subscribe((data) => {
        expect(data).toEqual(localizaciones[0]);
    });
  });
  it('delete LocalizacionModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Localización Deleted Correctly'));
    service.delete(localizaciones[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
