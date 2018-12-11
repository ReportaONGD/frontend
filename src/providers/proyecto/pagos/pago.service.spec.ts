import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../base/api.service';
import { HttpInterceptorRequest } from '../../interceptor/http-interceptor-request.service';
import { PagoService } from './pago.service';


describe('Service: Etapa', () => {
  let service: PagoService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const pago = [
    {
      _id: '1',
      nombre: 'string',
      descripcion: 'string',
      fecha_fin: '01/02/2018',
      fecha_inicio: '01/01/2018'
    }
  ];
  beforeEach(() => {
    // const spy = jasmine.createSpyObj('PagoService', ['all']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorRequest,
          multi: true
        },
        PagoService,
        ApiService
      ]
    });
    service = TestBed.get(PagoService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all pagos from project, returns Array<EtapaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(pago));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(pago);
    });
  });
  it('post EtapaModel item and return EtapaModel object', () => {
    const item = {
      _id: '1',
      nombre: 'string',
      descripcion: 'string',
      fecha_fin: '01/03/2018',
      fecha_inicio: '01/04/2018'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put EtapaModel item and return EtapaModel object', () => {
    pago[0].nombre = 'entidad 3';
    spyOn(service, 'put').and.callFake(() => Observable.of(pago[0]));
    service.put(pago[0]._id, pago[0]).subscribe((data) => {
      expect(data).toEqual(pago[0]);
    });
  });
  it('get EtapaModel item and return EtapaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(pago[0]));
    service.get(pago[0]._id).subscribe((data) => {
      expect(data).toEqual(pago[0]);
    });
  });
  it('delete EtapaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Etapa Deleted Correctly'));
    service.delete(pago[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
