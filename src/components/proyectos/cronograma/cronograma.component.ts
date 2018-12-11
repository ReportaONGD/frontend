import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Zooming } from '../../ng2-gantt';
import { ParamsModel } from '../../../models/params.model';
import { ProyectoModel } from '../../../models/proyecto.model';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { EtapaModel } from '../../../models/etapa.model';
import { Common } from '../../../providers/common/common';
import { CronogramaDetailComponent } from './cronograma_detail.component';

@Component({
  selector: 'app-cronograma-component',
  templateUrl: './cronograma.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [ProyectoService, NgbCumstonDateParserFormatter, Common],
  entryComponents: [CronogramaDetailComponent]
})
export class CronogramaComponent implements OnInit {
  project: BehaviorSubject<ProyectoModel>;
  modalRef: any;
  etapa: EtapaModel = new EtapaModel();
  etapas: EtapaModel[];
  isEtapaSelected = false;
  isGanttCreated = false;
  ids: ParamsModel = new ParamsModel();
  // Default options
  startDateProject: any;
  endDateProject: any;
  options: any;
  projectGantt: any;
  task: any;
  loading = false;
  constructor(private modal: NgbModal,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private common: Common,
    private ds: NgbCumstonDateParserFormatter
  ) {
  }
  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids.proyecto_id = params['id'];
        this.proyectoService.ids = this.ids;
      });
      this.initialize();
    }
  }
  changeEstado() {
    if (this.etapa && this.etapa._id !== undefined) {
      const etapa = new EtapaModel(this.etapa);
      this.etapa.fecha_inicio = this.ds.format(etapa._fecha_inicio);
      this.etapa.fecha_fin = this.ds.format(etapa._fecha_fin);
      this.etapa._fecha_inicio = etapa._fecha_inicio;
      this.etapa._fecha_fin = etapa._fecha_fin;
      this.startDateProject = new Date(etapa.fecha_inicio);
      this.endDateProject = new Date(etapa.fecha_fin);
      this.options = {
        scale: {
          start:  this.startDateProject,
          end: this.endDateProject
        },
        zooming: Zooming[Zooming.month]
      };
      this.projectGantt = {};
      this.isEtapaSelected = true;
      // this.createProjectGantt();
    } else {
      this.isEtapaSelected = false;
    }
  }
  initialize() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.project = new BehaviorSubject<ProyectoModel>(resp);
      this.etapas = this.project.getValue().etapas;
      if (this.etapas && this.etapas.length > 0) {
        this.etapa = this.etapas[0];
        this.changeEstado();
        this.createProjectGantt();
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  createProjectGantt() {
    this.projectGantt.name = `Proyecto: ${this.project.getValue().codigo} -  ${this.project.getValue().nombre}`;
    this.projectGantt.startDate = this.startDateProject;
    this.projectGantt.endDate = this.endDateProject;
    this.projectGantt.startDateString = this.etapa.fecha_inicio;
    this.projectGantt.endDateString = this.etapa.fecha_fin;
    this.projectGantt.tasks = [];
    this.createTask();
  }
  createTask() {
    let project;
    this.project.subscribe(proyecto => project = proyecto);
    project.objetivos_especificos.forEach((oe: any) => {
      const oeCode = oe.codigo;
      if (oe.resultados && oe.resultados.length > 0) {
        oe.resultados.forEach((resultado: any) => {
          if (resultado.actividades && resultado.actividades.length > 0) {
            const resultadoCode = resultado.codigo;
            resultado.actividades.forEach((actividad: any) => {
              this.task = {};
              this.task.name = actividad.codigo;
              this.task.tasks = [];
              if (actividad.planificacion_actividad) {
                const startDateP = this.ds.parse(actividad.planificacion_actividad.fecha_inicio);
                const endDateP = this.ds.parse(actividad.planificacion_actividad.fecha_fin);
                if (this.validateDates(startDateP, endDateP)) {
                  this.projectGantt.tasks.push(
                    {
                      'id': this.task.name,
                      'treePath': oeCode + '-' + resultadoCode + '-' + this.task.name,
                      'parentId': this.task.name,
                      'name': 'Planificada',
                      'resource': actividad.planificacion_actividad.codigo,
                      // tslint:disable-next-line:max-line-length
                      'start': new Date(startDateP.year, startDateP.month - 1, startDateP.day),
                      'end': new Date(endDateP.year, endDateP.month - 1, endDateP.day),
                      'status': 'Information'
                    });
                }
                if (actividad.ejecucion_actividad && actividad.ejecucion_actividad.fecha_inicio && actividad.ejecucion_actividad.fecha_fin) {
                  const startDateE = this.ds.parse(actividad.ejecucion_actividad.fecha_inicio);
                  const endDateE = this.ds.parse(actividad.ejecucion_actividad.fecha_fin);
                  if (this.validateDates(startDateE, endDateE)) {
                    this.projectGantt.tasks.push(
                      {
                        'id': this.task.name,
                        'treePath': oeCode + '-' + resultadoCode + '-' + this.task.name,
                        'parentId': this.task.name,
                        'name': 'Real',
                        'resource': actividad.ejecucion_actividad.codigo,
                        // tslint:disable-next-line:max-line-length
                        'start': new Date(startDateE.year, startDateE.month - 1, startDateE.day),
                        'end': new Date(endDateE.year, endDateE.month - 1, endDateE.day),
                        'status': 'Progress'
                      });
                  }
                }

              }
            });
          }
        });
      }
    });
    this.isGanttCreated = true;
  }
  gridRowClicked(event) {
    // console.log(event);
  }
  edit(value) {
    console.log(value);
    const project = this.project.getValue();
    if (project.objetivos_especificos && project.objetivos_especificos.length > 0) {
      const obj_esp = project.objetivos_especificos
        .filter(oe => oe.codigo === value.treePath.split('-')[0]);
      this.ids.objetivo_especifico_id = obj_esp[0]._id;
      const res = obj_esp[0].resultados
        .filter(r => r.codigo === value.treePath.split('-')[1]);
      this.ids.resultado_id = res[0]._id;
      const act = res[0].actividades
        .filter(a => a.codigo === value.id);
      this.ids.actividad_id = act[0]._id;
      this.modalRef = this.modal.open(CronogramaDetailComponent, { size: 'lg', backdrop: 'static' });
      this.modalRef.componentInstance.ids = this.ids;
      this.modalRef.componentInstance.title = `Cronograma para la actividad: ${value.treePath.split('-')[2]}`;
      this.modalRef.result.then((result) => {
        if (result) {
          this.isGanttCreated = false;
          this.get();
        }
      });
    }
  }

  private validateDates(fecha_inicio: any, fecha_fin: any): boolean {
    const dateInitProject = new Date(this.etapa._fecha_inicio.year, this.etapa._fecha_inicio.month - 1, this.etapa._fecha_inicio.day);
    const dateEndProject = new Date(this.etapa._fecha_fin.year, this.etapa._fecha_fin.month - 1, this.etapa._fecha_fin.day);
    const dateInit = new Date(fecha_inicio.year, fecha_inicio.month - 1, fecha_inicio.day);
    const dateEnd = new Date(fecha_fin.year, fecha_fin.month - 1, fecha_fin.day);
    if ((dateInit >= dateInitProject && dateInit <= dateEndProject) &&
      (dateEnd >= dateInitProject && dateEnd <= dateEndProject)) {
      return true;
    } else {
      return false;
    }
  }

  private get() {
    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.project.next(resp);
      this.changeEstado();
      this.createProjectGantt();
      this.isGanttCreated = true;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
