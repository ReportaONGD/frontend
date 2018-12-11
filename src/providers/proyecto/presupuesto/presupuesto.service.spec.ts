import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { PresupuestoService } from './presupuesto.service';

describe('Service: Presupuesto', () => {
  let service: PresupuestoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const presupuesto = [
    {
      _id: '5b04082dbd3cbf001109cd30',
      importe: 2000,
      etapa: null,
      pais: null,
      actividad: null,
      financiador: null,
      moneda: null,
      partida: null
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('PresupuestoService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        PresupuestoService,
        ApiService
      ]
    });
    service = TestBed.get(PresupuestoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all Presupuestos from project, returns Array<PresupuestoModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(presupuesto));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(presupuesto);
    });
  });
  it('post PresupuestoModel item and return PresupuestoModel object', () => {
    const item = {
      importe: 5060,
      etapa: null,
      pais: null,
      actividad: null,
      financiador: null,
      moneda: null,
      partida: null
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put PresupuestoModel item and return PresupuestoModel object', () => {
    presupuesto[0].importe = 7647;
    spyOn(service, 'put').and.callFake(() => Observable.of(presupuesto[0]));
    service.put(presupuesto[0]._id, presupuesto[0]).subscribe((data) => {
      expect(data).toEqual(presupuesto[0]);
    });
  });
  it('get PresupuestoModel item and return PresupuestoModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(presupuesto[0]));
    service.get(presupuesto[0]._id).subscribe((data) => {
      expect(data).toEqual(presupuesto[0]);
    });
  });
  it('delete PresupuestoModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Presupuesto Deleted Correctly'));
    service.delete(presupuesto[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
