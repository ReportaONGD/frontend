import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { DocumentosService } from './documento.service';

describe('Service: Documento', () => {
  let service: DocumentosService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const documento = [
      {
        _id: '1',
        nombre: 'string',
        ruta:	'string',
        fecha: '01/01/2018'
        }
    ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('DocumentosService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorRequest,
        multi: true
      },
      DocumentosService,
      ApiService
    ]
    });
    service = TestBed.get(DocumentosService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all aportaciones from project, returns Array<DocumentosModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(documento));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(documento);
    });
  });
  it('post DocumentosModel item and return DocumentosModel object', () => {
    const item = {
      entidad: {nombre: 'entidad 2'},
      cuantia: 1000,
      privada: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put DocumentosModel item and return DocumentosModel object', () => {
    documento[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(documento[0]));
    service.put(documento[0]._id, documento[0]).subscribe((data) => {
        expect(data).toEqual(documento[0]);
    });
  });
  it('get DocumentosModel item and return DocumentosModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(documento[0]));
    service.get(documento[0]._id).subscribe((data) => {
        expect(data).toEqual(documento[0]);
    });
  });
  it('delete DocumentosModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Documento Deleted Correctly'));
    service.delete(documento[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
