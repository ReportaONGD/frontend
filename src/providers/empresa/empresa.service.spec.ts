import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { ApiService } from '../base/api.service';
import { EmpresaService } from './empresa.service';
import { Observable } from 'rxjs/Observable';
import { EmpresaModel } from '../../models/empresa.model';

describe('Service: Empresa', () => {
  let service: EmpresaService;
  const proyecto = new Array<EmpresaModel>(new EmpresaModel(
    {
        _id: '5af41848a34974135c044edc',
        nombre: 'empresa',
        cif: '1234556h',
        direccion_fiscal: 'fffff',
        tfno: '232323232'
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
      EmpresaService,
      ApiService
    ]
    });
    service = TestBed.get(EmpresaService);
  });
  it('get all empresas from , returns Array<EmpresaModel>', () => {
    spyOn(service, 'all').and.returnValue({ subscribe: () => {} });
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(proyecto);
    });
  });
  it('post EmpresaModel item and return EmpresaModel object', () => {
    const item = new EmpresaModel({
      _id: '5af41848a34974135c044edc',
      nombre: 'empresa',
      cif: '1234556h',
      direccion_fiscal: 'fffff',
      tfno: '232323232'
    });
    spyOn(service, 'post').and.returnValue({ subscribe: () => {} });
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put EmpresaModel item and return EmpresaModel object', () => {
    spyOn(service, 'put').and.returnValue({ subscribe: () => {} });
    proyecto[0].nombre = 'proyecto 3';
    service.put(proyecto[0]._id, proyecto[0]).subscribe((data) => {
        expect(data).toEqual(proyecto);
    });
  });
  it('get EmpresaModel item and return EmpresaModel object', () => {
    spyOn(service, 'get').and.returnValue({ subscribe: () => {} });
    service.get(proyecto[0]._id).subscribe((data) => {
        expect(data).toEqual(proyecto[0]);
    });
  });
  it('delete EmpresaModel item and return message', () => {
    spyOn(service, 'delete').and.returnValue({ subscribe: () => {} });
    service.delete(proyecto[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
