import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../../../base/api.service';
import { ResultadoMedidaService } from './resultado_medida.service';
import { Observable } from 'rxjs/Observable';
import { FuenteVerificacionModel } from '../../../../../../models/fuente_verificacion.model';

describe('Service: Fuente Verificacion Indicador Resultado', () => {
  let service: ResultadoMedidaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<FuenteVerificacionModel>(new FuenteVerificacionModel({
      _id: '1',
      codigo: 'OE.R1.I1.FV1',
      descripcion: 'DESC OE.R1.I1.FV1'
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
      ResultadoMedidaService,
      ApiService
    ]
    });
    service = TestBed.get(ResultadoMedidaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all fuentes verificacion from one indicador nested in one resultado , returns Array<FuenteVerificacionModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(actividad);
    });
  });
  it('post FuenteVerificacionModel item and return FuenteVerificacionModel object', () => {
    const item = {
        codigo: 'OE.R1.I1.FV2',
        descripcion: 'DESC OE.R1.I1.FV2'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put FuenteVerificacionModel item and return FuenteVerificacionModel object', () => {
    actividad[0].descripcion = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('get FuenteVerificacionModel item and return FuenteVerificacionModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('delete FuenteVerificacionModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Fuente de Verificacion Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
