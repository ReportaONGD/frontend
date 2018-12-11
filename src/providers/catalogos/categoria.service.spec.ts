import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CategoriaModel } from '../../models/categoria.model';
import { ApiService } from '../base/api.service';
import { HttpInterceptorRequest } from '../interceptor/http-interceptor-request.service';
import { CategoriaService } from './categoria.service';

describe('Service: Categoria', () => {
  let service: CategoriaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const categorias = new Array<CategoriaModel>(new CategoriaModel({
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
      CategoriaService,
      ApiService
    ]
    });
    service = TestBed.get(CategoriaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from project, returns Array<CategoriaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(categorias));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(categorias);
    });
  });
  it('post CategoriaModel item and return CategoriaModel object', () => {
    const item = {
      valor: 'valor 2',
      global: true
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put CategoriaModel item and return CategoriaModel object', () => {
    categorias[0].valor = 'valor 1';
    spyOn(service, 'put').and.callFake(() => Observable.of(categorias[0]));
    service.put(categorias[0]._id, categorias[0]).subscribe((data) => {
        expect(data).toEqual(categorias[0]);
    });
  });
  it('get CategoriaModel item and return CategoriaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(categorias[0]));
    service.get(categorias[0]._id).subscribe((data) => {
        expect(data).toEqual(categorias[0]);
    });
  });
  it('delete CategoriaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Categoria Deleted Correctly'));
    service.delete(categorias[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
