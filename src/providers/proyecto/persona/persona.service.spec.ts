import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { PersonaService } from './persona.service';

describe('Service: Persona', () => {
  let service: PersonaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const persona = [
    {
      _id: 'string',
      nombre: 'string',
      residencia: 'string',
      horas_imputadas: 1,
      salario_mensual: 1,
      meses: 1,
      salario_total: 1,
      categoria: null,
      contrato: null,
      tipo_personal: null
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('PersonaService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        PersonaService,
        ApiService
      ]
    });
    service = TestBed.get(PersonaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Personas from project, returns Array<PersonaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(persona));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(persona);
    });
  });
  it('post PersonaModel item and return PersonaModel object', () => {
    const item = {
      nombre: 'rrrrr',
      residencia: 'rrrrrr',
      horas_imputadas: 1,
      salario_mensual: 1,
      meses: 1,
      salario_total: 1,
      categoria: null,
      contrato: null,
      tipo_personal: null
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put PersonaModel item and return PersonaModel object', () => {
    persona[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(persona[0]));
    service.put(persona[0]._id, persona[0]).subscribe((data) => {
      expect(data).toEqual(persona[0]);
    });
  });
  it('get PersonaModel item and return PersonaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(persona[0]));
    service.get(persona[0]._id).subscribe((data) => {
      expect(data).toEqual(persona[0]);
    });
  });
  it('delete PersonaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Persona Deleted Correctly'));
    service.delete(persona[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
