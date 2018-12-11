import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-menu-proyecto',
  templateUrl: 'menu_proyecto.component.html',
  styleUrls: ['menu_proyecto.component.css'],
  providers: [Common]
})
export class MenuProyectoComponent implements OnInit {
  _id: any;
  menu: any[] = [];
  isCollapsed: false;
  private ruta = '/proyectos/:id/edit/';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private common: Common) {

    const user = JSON.parse(sessionStorage.getItem('user'));
    this.menu = [
      {
        titleLink: 'Menú Proyecto',
        collapse: false,
        target: 'collapseFormulacion',
        childrens: [
          {
            titleLink: 'Datos del Proyecto',
            display: true,
            route: 'datos-generales'
          },
          {
            titleLink: 'Cuentas Bancarias',
            display: user.admin,
            route: 'cuentas-bancarias',
          },
          {
            titleLink: 'Obj. Generales',
            display: true,
            route: 'objetivos-generales'
          },
          {
            titleLink: 'Obj. Específicos',
            display: true,
            route: 'objetivos-especificos'
          },
          {
            titleLink: 'O. Específicos/Resultados',
            display: true,
            route: 'resultados'
          },
          {
            titleLink: 'Actividad Global',
            display: true,
            route: 'actividad-global'
          },
          {
            titleLink: 'Partidas',
            display: true,
            route: 'partidas'
          },
          {
            titleLink: 'Personal',
            display: user.admin,
            route: 'persona'
          },
          {
            titleLink: 'Cronograma',
            display: true,
            route: 'cronograma'
          },
          {
            titleLink: 'Presupuestos',
            display: true,
            route: 'presupuesto-inicial'
          },
          {
            titleLink: 'Gastos',
            display: true,
            route: 'gastos'
          },
          {
            titleLink: 'Operaciones Bancarias',
            display: true,
            route: 'operaciones-bancarias'
          },
          {
            titleLink: 'Informes',
            display: true,
            route: 'informe'
          }
        ]
      }/*,
      {
        titleLink: 'Resumen',
        collapse: true,
        target: 'collapseSeguimiento',
        childrens: [
          {
            titleLink: 'Resumen Gastos',
            route: 'resumen-gasto'
          },
          {
            titleLink: 'Resumen Matriz',
            route: 'resumen-matriz'
          },
          {
            titleLink: 'Resumen Operaciones Bancarias',
            route: 'resumen-caja'
          },
          {
            titleLink: 'Resumen Presupuesto',
            route: 'resumen-presupuesto'
          },
          {
            titleLink: 'Resumen Proveedores',
            route: 'resumen-proveedor'
          },
          {
            titleLink: 'Resumen Tesoreria',
            route: 'resumen-tesoreria'
          },
          {
            titleLink: 'Resumen Seguimiento Tecnico',
            route: 'resumen-seguimiento-tecnico'
          }
        ]
      }*/
    ];
  }
  ngOnInit() {
    this.activatedRoute.firstChild.parent.params.subscribe((params: any) => {
      this._id = params['id'];
    });
  }
  goTo(path: string) {
    const r = this.ruta.replace(':id', this._id) + path;
    this.router.navigate([r]);
    // .then((resp) => {
    //   // if (!resp) {
    //   //   const err = Observable.throw(new HttpErrorResponse(
    //   //     { status: 300, statusText: 'No puede acceder a la opción deseada si no cumplimenta los datos del proyecto.' })
    //   //   );
    //   //   this.common.handlerResponse(err.error);
    //   // }
    // });
  }
}
