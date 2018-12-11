import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpInterceptorRequest } from '../../../interceptor/http-interceptor-request.service';
import { ApiService } from '../../../base/api.service';
import { ObjetivoEspecificoIndicadorService } from './objetivo_especifico_indicador.service';
import { Observable } from 'rxjs/Observable';
import { IndicadorModel } from '../../../../models/indicador.model';

describe('Service: Indicador Objetivo Especifico', () => {
  let service: ObjetivoEspecificoIndicadorService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<IndicadorModel>(new IndicadorModel({
      _id: '1',
      codigo: 'OE1.I1',
      descripcion: 'DESC OE1.I1',
      meta: 100,
      linea_base: 30
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
      ObjetivoEspecificoIndicadorService,
      ApiService
    ]
    });
    service = TestBed.get(ObjetivoEspecificoIndicadorService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all indicadores from one objetivo especifico, returns Array<IndicadorModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(actividad);
    });
  });
  it('post IndicadorModel item and return IndicadorModel object', () => {
    const item = {
        codigo: 'OE1.I2',
        descripcion: 'DESC OE1.I2',
        meta: 100,
        linea_base: 30
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
        expect(data).toEqual(item);
    });
  });
  it('put IndicadorModel item and return IndicadorModel object', () => {
    actividad[0].descripcion = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('get IndicadorModel item and return IndicadorModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
        expect(data).toEqual(actividad[0]);
    });
  });
  it('delete IndicadorModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Indicador Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
        expect(data).toContain('Correctly');
    });
  });
});
