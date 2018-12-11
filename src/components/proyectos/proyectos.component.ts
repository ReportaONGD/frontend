import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProyectoModel } from '../../models/proyecto.model';
import { ImplementadorService } from '../../providers/catalogos/implementador.service';
import { Common } from '../../providers/common/common';
import { ProyectoService } from '../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../shared/confirm2/confirm.component';
import { FinanciadorService } from '../../providers/catalogos/financiador.service';
import { SocioLocalService } from '../../providers/catalogos/socio_local.service';


@Component({
  selector: 'app-project-component',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers: [ProyectoService, ImplementadorService, SocioLocalService, FinanciadorService, Common],
  entryComponents: [Confirm2Component]
})
export class ProyectosComponent implements OnInit {
  proyectos: ProyectoModel[];
  filter = { codigo: '', nombre: '' };
  showAlertFinanciador: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showAlertSocio: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private proyectoProvider: ProyectoService,
    private financiadorProvider: FinanciadorService,
    private implementadorProvider: ImplementadorService,
    private socioProvider: SocioLocalService,
    private modal: NgbModal,
    private router: Router,
    private common: Common
  ) {
  }

  ngOnInit() {
    this.loadFinanciadores();
    this.loadImplementadores();
    this.loadSocios();
    this.initialize();
  }

  initialize(): void {
    this.proyectoProvider.all().subscribe((resp) => {
      this.proyectos = resp.filter(p => !p.readonly);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(item: any): void {
    this.proyectoProvider.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  onCreate(): void {
    this.router.navigate(['/proyectos', 'new', 'datos-generales']);
  }

  onEdit(proyecto: ProyectoModel) {
    this.router.navigate(['/proyectos', proyecto._id, 'edit', 'datos-generales']);
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Proyecto';
    modalRef.componentInstance.message = `¿Desea eliminar el Proyecto ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  goToCronograma(item) {
    this.router.navigate(['/proyectos', item._id, 'cronograma']);
  }

  goToPresupuestoInicial(item) {
    // this.dataService.save('project', item);
    this.router.navigate(['/proyectos', item._id, 'presupuesto-inicial']);
  }

  goToGastos(item) {
    this.router.navigate(['/proyectos', item._id, 'gastos']);
  }

  goToDocumentos(item) {
    this.router.navigate(['/proyectos', item._id, 'documentos']);
  }

  showAlert() {
    return this.proyectos && this.proyectos.length === 0;
  }

  private loadFinanciadores() {
    this.financiadorProvider.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertFinanciador.next(false);
      } else {
        this.showAlertFinanciador.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private loadImplementadores() {
    this.implementadorProvider.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertSocio.next(false);
      } else {
        this.showAlertSocio.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private loadSocios() {
    this.socioProvider.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertSocio.next(false);
      } else {
        this.showAlertSocio.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
