import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProyectoModel } from '../../../models/proyecto.model';
import { Common } from '../../../providers/common/common';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { IndicadorModel } from '../../../models/indicador.model';
import { MedidaModel } from '../../../models/medida.model';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';


@Component({
  selector: 'app-resumen-seguimiento-tecnico-component',
  templateUrl: './resumen_seguimiento_tecnico.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, NgbCumstonDateParserFormatter, Common]
})
export class ResumenSeguimientoTecnicoComponent implements OnInit {
  isLoading = true;
  _id: string;
  proyecto: ProyectoModel;
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  cumplimientosInd: any;
  cumplimientosRes: any;
  constructor(private common: Common,
    private service: ProyectoService,
    private route: ActivatedRoute,
    private ds: NgbCumstonDateParserFormatter) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this._id = params['id'];
      this.initialize();
    });
  }

  initialize() {
    this.service.get(this._id).subscribe((resp) => {
      this.proyecto = new ProyectoModel(resp);
      this.setCumplimientoIndicador();
      this.setCumplimientoResultadoIndicador();
      this.showAlert.next(false);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => { this.isLoading = false; });
  }

  getType(item: IndicadorModel, es_indicador: boolean) {
    let cumpliento;
    if (es_indicador) {
      cumpliento = this.cumplimientosInd.filter(c => c._id === item._id);
    } else {
      cumpliento = this.cumplimientosRes.filter(c => c._id === item._id);
    }
    return cumpliento[0].type;
  }

  getMessage(item: IndicadorModel, es_indicador: boolean) {
    let cumpliento;
    if (es_indicador) {
      cumpliento = this.cumplimientosInd.filter(c => c._id === item._id);
    } else {
      cumpliento = this.cumplimientosRes.filter(c => c._id === item._id);
    }
    return cumpliento[0].value;
  }

  setCumplimientoIndicador() {
    this.cumplimientosInd = [];
    this.proyecto.objetivos_especificos.forEach((oe) => {
      oe.indicadores.forEach(ind => {
        if (ind.medida && ind.medida.length === 0) {
          this.cumplimientosInd.push({
            _id: ind._id,
            type: 'danger',
            value: '0%'
          });
        } else {
          ind.medida.sort((item1, item2): number => {
            const med1 = new MedidaModel(item1);
            const med2 = new MedidaModel(item2);
            const fecha1 = new Date(med1.fecha.year, med1.fecha.month - 1, med1.fecha.day);
            const fecha2 = new Date(med2.fecha.year, med2.fecha.month - 1, med2.fecha.day);
            if (fecha1 < fecha2) { return 1; }
            return 0;
          });
          const medida = ind.medida[0];
          let valor = '100%';
          let valorNum = 100;
          if (parseFloat(medida.valor) !== ind.meta) {
            valorNum = Math.round(((parseFloat(medida.valor) * 100) / ind.meta));
            valor = valorNum + '%';
          }
          this.cumplimientosInd.push({
            _id: ind._id,
            type: this.setTypeInd(valorNum),
            value: valor
          });
        }
      });
    });
  }
  setCumplimientoResultadoIndicador() {
    this.cumplimientosRes = [];
    this.proyecto.objetivos_especificos.forEach((oe) => {
      oe.resultados.forEach(resultado => {
        resultado.indicadores.forEach(ind => {
          if (ind.medida && ind.medida.length === 0) {
            this.cumplimientosRes.push({
              _id: ind._id,
              type: 'danger',
              value: '0%'
            });
          } else {
            ind.medida.sort((item1, item2): number => {
              const med1 = new MedidaModel(item1);
              const med2 = new MedidaModel(item2);
              const fecha1 = new Date(med1.fecha.year, med1.fecha.month - 1, med1.fecha.day);
              const fecha2 = new Date(med2.fecha.year, med2.fecha.month - 1, med2.fecha.day);
              if (fecha1 < fecha2) { return 1; }
              return 0;
            });
            const medida = ind.medida[0];
            let valor = '100%';
            let valorNum = 100;
            if (parseFloat(medida.valor) !== ind.meta) {
              valorNum = Math.round(((parseFloat(medida.valor) * 100) / ind.meta));
              valor = valorNum + '%';
            }
            this.cumplimientosRes.push({
              _id: ind._id,
              type: this.setTypeInd(valorNum),
              value: valor
            });
          }
        });
      });
    });
  }
  setTypeInd(valor: number): string {
    if (valor >= 0 && valor < 25) {
      return 'danger';
    } else if (valor >= 25  && valor < 75) {
      return 'warning';
    } else if (valor >= 75  && valor < 100) {
      return 'info';
    } else {
      return 'success';
    }
  }
}



