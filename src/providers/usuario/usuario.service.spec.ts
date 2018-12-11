import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { ApiService } from '../base/api.service';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs/Observable';
import { UsuarioModel } from '../../models/usuario.model';

describe('Service: Empresa', () => {
  let service: UsuarioService;
  const usuario = new Array<UsuarioModel>(new UsuarioModel(
    {
      _id: '5af41848a34974135c044edc',
      username: 'usuario',
      email: 'email@email.com',
      admin: false
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
      UsuarioService,
      ApiService
    ]
    });
    service = TestBed.get(UsuarioService);
  });
  it('get all empresas from , returns Array<UsuarioModel>', () => {
    spyOn(service, 'all').and.returnValue({ subscribe: () => {} });
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(usuario);
    });
  });
  it('post UsuarioModel item and return UsuarioModel object', () => {
    const item = new UsuarioModel({
      _id: '5af41848a34974135c044edc',
      username: 'usuario 1',
      email: 'email@email.com',
      admin: false
    });
    spyOn(service, 'post').and.returnValue({ subscribe: () => {} });
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put UsuarioModel item and return UsuarioModel object', () => {
    spyOn(service, 'put').and.returnValue({ subscribe: () => {} });
    usuario[0].username = 'usuario 3';
    service.put(usuario[0]._id, usuario[0]).subscribe((data) => {
        expect(data).toEqual(usuario);
    });
  });
  it('get UsuarioModel item and return UsuarioModel object', () => {
    spyOn(service, 'get').and.returnValue({ subscribe: () => {} });
    service.get(usuario[0]._id).subscribe((data) => {
        expect(data).toEqual(usuario[0]);
    });
  });
  it('delete UsuarioModel item and return message', () => {
    spyOn(service, 'delete').and.returnValue({ subscribe: () => {} });
    service.delete(usuario[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
