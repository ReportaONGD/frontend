import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../base/api.service';
import { ActividadGlobalRecursoService } from './actividad_global_recurso.service';
import { Observable } from 'rxjs/Observable';
import { RecursoModel } from '../../../../models/recurso.model';

describe('Service: Recurso Actividad Global', () => {
  let service: ActividadGlobalRecursoService;
  const recurso = new Array<RecursoModel>(new RecursoModel(
    {
        _id: '5af41848a34974135c044edc',
        descripcion: 'recurso',
        coste: 1000
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
      ActividadGlobalRecursoService,
      ApiService
    ]
    });
    service = TestBed.get(ActividadGlobalRecursoService);
  });
  it('get all recursos from , returns Array<RecursoModel>', () => {
    spyOn(service, 'all').and.returnValue({ subscribe: () => {} });
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(recurso);
    });
  });
  it('post RecursoModel item and return RecursoModel object', () => {
    const item = new RecursoModel({
        descripcion: 'recurso',
        coste: 1000
    });
    spyOn(service, 'post').and.returnValue({ subscribe: () => {} });
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put RecursoModel item and return RecursoModel object', () => {
    spyOn(service, 'put').and.returnValue({ subscribe: () => {} });
    recurso[0].descripcion = 'proyecto 3';
    service.put(recurso[0]._id, recurso[0]).subscribe((data) => {
        expect(data).toEqual(recurso);
    });
  });
  it('get RecursoModel item and return RecursoModel object', () => {
    spyOn(service, 'get').and.returnValue({ subscribe: () => {} });
    service.get(recurso[0]._id).subscribe((data) => {
        expect(data).toEqual(recurso[0]);
    });
  });
  it('delete RecursoModel item and return message', () => {
    spyOn(service, 'delete').and.returnValue({ subscribe: () => {} });
    service.delete(recurso[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
