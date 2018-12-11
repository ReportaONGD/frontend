import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { InformeService } from './informe.service';

describe('Service: Informe', () => {
  let service: InformeService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const informe = [
    {
      _id: '1',
      nombre: 'string',
      autor: 'string',
      fecha_fin: '01/02/2018',
      fecha_inicio: '01/01/2018'
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('InformeService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        InformeService,
        ApiService
      ]
    });
    service = TestBed.get(InformeService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all informes from project, returns Array<InformeModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(informe));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(informe);
    });
  });
  it('post InformeModel item and return InformeModel object', () => {
    const item = {
      nombre: 'string',
      autor: 'string',
      fecha_fin: '01/02/2018',
      fecha_inicio: '01/01/2018'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put InformeModel item and return InformeModel object', () => {
    informe[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(informe[0]));
    service.put(informe[0]._id, informe[0]).subscribe((data) => {
      expect(data).toEqual(informe[0]);
    });
  });
  it('get InformeModel item and return InformeModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(informe[0]));
    service.get(informe[0]._id).subscribe((data) => {
      expect(data).toEqual(informe[0]);
    });
  });
  it('delete InformeModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Informe Deleted Correctly'));
    service.delete(informe[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
