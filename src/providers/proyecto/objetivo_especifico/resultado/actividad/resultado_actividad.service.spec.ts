import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../../base/api.service';
import { ResultadoActividadService } from './resultado_actividad.service';
import { Observable } from 'rxjs/Observable';
import { ActividadModel } from '../../../../../models/actividad.model';

describe('Service: Actividad Resultado', () => {
  let service: ResultadoActividadService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<any>({
    _id: '5b03f6d8bd3cbf001109ddce',
    descripcion: 'desc AG',
    codigo: 'AG',
    global: false,
    planificacion_actividad: {
      _id: '0000000000',
      fecha_inicio: '01/05/2018',
      fecha_fin: '01/06/2018',
      mes_inicio: 5,
      anio_inicio: 2018,
      mes_fin: 6,
      anio_fin: 2018
    },
    ejecucion_actividad: {
      _id: '0000000000',
      fecha_inicio: '09/05/2018',
      fecha_fin: '01/07/2018',
      mes_inicio: 5,
      anio_inicio: 2018,
      mes_fin: 7,
      anio_fin: 2018
    }
  });
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
      ResultadoActividadService,
      ApiService
    ]
    });
    service = TestBed.get(ResultadoActividadService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all actividades from one resultado, returns Array<ActividadModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(actividad);
    });
  });
  it('post ActividadModel item and return ActividadModel object', () => {
    const item = {
      descripcion: 'DESC OE.R1.H3'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put ActividadModel item and return ActividadModel object', () => {
    actividad[0].descripcion = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('get ActividadModel item and return ActividadModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('delete ActividadModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Actividad Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
