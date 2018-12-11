import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../base/api.service';
import { CuentaBancariaService } from './cuenta_bancaria.service';
import { Observable } from 'rxjs/Observable';

describe('Service: CuentaBancaria', () => {
  let service: CuentaBancariaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const cuenta_bancaria = [
       {
        '_id': '5af414eba34974135c067676',
        'entidad': 'BBVA',
        'ncuenta': '22222222222222222222',
        'pais': '5af414eba34974135c044d2f',
        'moneda': '5af414eba34974135c044e20',
        'localizacion': '5af414eba34974135c044ec0'
       }
    ];
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
      CuentaBancariaService,
      ApiService
    ]
    });
    service = TestBed.get(CuentaBancariaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all cuentas bancarias from project, returns Array<CuentaBancariaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(cuenta_bancaria));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(cuenta_bancaria);
    });
  });
  it('post CuentaBancariaModel item and return CuentaBancariaModel object', () => {
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
  it('put CuentaBancariaModel item and return CuentaBancariaModel object', () => {
    cuenta_bancaria[0].entidad = 'ING DIRECT';
    spyOn(service, 'put').and.callFake(() => Observable.of(cuenta_bancaria[0]));
    service.put(cuenta_bancaria[0]._id, cuenta_bancaria[0]).subscribe((data) => {
        expect(data).toEqual(cuenta_bancaria[0]);
    });
  });
  it('get CuentaBancariaModel item and return CuentaBancariaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(cuenta_bancaria[0]));
    service.get(cuenta_bancaria[0]._id).subscribe((data) => {
        expect(data).toEqual(cuenta_bancaria[0]);
    });
  });
  it('delete CuentaBancariaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Cuenta Bancaria Deleted Correctly'));
    service.delete(cuenta_bancaria[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
