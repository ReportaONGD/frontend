import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { MedidaModel } from '../../../../../models/medida.model';
import { ApiService } from '../../../../base/api.service';
import { HttpInterceptorRequest } from '../../../../interceptor/http-interceptor-request.service';
import { OGMedidaService } from './medida.service';

describe('Service: Indicador Objetivo Generico', () => {
  let service: OGMedidaService;
  const ids = {
    proyecto_id: '5af41848a34974135c044edc'
  };
  const actividad = new Array<MedidaModel>(new MedidaModel({
    _id: '1',
    valor: '11',
    fecha: '01/01/19',
    comentario: 'Comentario'
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
        OGMedidaService,
        ApiService
      ]
    });
    service = TestBed.get(OGMedidaService);
    service.ids = ids;
  });
  it(`should be initialized`, () => {
    expect(service).toBeDefined();
    expect(service.ids.proyecto_id).toEqual('5af41848a34974135c044edc');
  });
  it('get all fuentes verificacion from one indicador nested in objetivo especifico , returns Array<MedidaModel>', () => {
    spyOn(service, 'all').and.callFake(() => Observable.of(actividad));
    service.all().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(actividad);
    });
  });
  it('post MedidaModel item and return MedidaModel object', () => {
    const item = {
      codigo: 'OG.I1.FV2',
      descripcion: 'DESC OG.I1.FV2'
    };
    spyOn(service, 'post').and.callFake(() => Observable.of(item));
    service.post(item).subscribe((data) => {
      expect(data).toEqual(item);
    });
  });
  it('put MedidaModel item and return MedidaModel object', () => {
    actividad[0].comentario = 'DESC AG MOD';
    spyOn(service, 'put').and.callFake(() => Observable.of(actividad[0]));
    service.put(actividad[0]._id, actividad[0]).subscribe((data) => {
      expect(data).toEqual(actividad[0]);
    });
  });
  it('get MedidaModel item and return MedidaModel object', () => {
    spyOn(service, 'get').and.callFake(() => Observable.of(actividad[0]));
    service.get(actividad[0]._id).subscribe((data) => {
      expect(data).toEqual(actividad[0]);
    });
  });
  it('delete MedidaModel item and return message', () => {
    spyOn(service, 'delete').and.callFake(() => Observable.of('Fuente de Verificacion Deleted Correctly'));
    service.delete(actividad[0]._id).subscribe((data) => {
      expect(data).toContain('Correctly');
    });
  });
});
