import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../providers/auth/auth.service';
import { Common } from '../../providers/common/common';
import { ChangePasswordComponent } from '../usuarios/change_password.component';
import { UsuarioDetailComponent } from '../usuarios/usuario_detail.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.component.css'],
  providers: [Common],
  entryComponents: [ChangePasswordComponent]
})
export class MenuComponent implements OnInit {
  private menu: Array<any>;
  public navbarCollapsed = true;
  isCollapse = true;
  modalRef: any;
  constructor(private router: Router,
    private common: Common,
    private authService: AuthService,
    private modal: NgbModal
  ) {
  }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.menu = [
      {
        titleLink: 'Proyectos',
        hasChilds: false,
        route: 'proyectos',
        display: true
      },
      {
        titleLink: 'Catálogos',
        hasChilds: true,
        display: user.admin,
        childrens: [
          {
            titleLink: 'Categorias Profesionales',
            hasChilds: false,
            route: 'categorias'
          },
          /* {
            titleLink: 'Co-finaciadores',
            hasChilds: false,
            route: 'cofinanciadores'
          }, */
          {
            titleLink: 'Contratos',
            hasChilds: false,
            route: 'contratos'
          },
          {
            titleLink: 'Convocatorias',
            hasChilds: false,
            route: 'convocatorias'
          },
          /* {
            titleLink: 'Estados Informe',
            hasChilds: false,
            route: 'estados-informe'
          }, */
          {
            titleLink: 'Estados Proyecto',
            hasChilds: false,
            route: 'estados-proyecto'
          },
          {
            titleLink: 'Agentes',
            hasChilds: false,
            route: 'agente'
          },
         /* {
            titleLink: 'Financiadores',
            hasChilds: false,
            route: 'financiador'
          },
          {
            titleLink: 'Implementadores',
            hasChilds: false,
            route: 'implementador'
          },*/
          {
            titleLink: 'Localización',
            hasChilds: false,
            route: 'localizaciones'
          },
          {
            titleLink: 'Tipos Movimientos',
            hasChilds: false,
            route: 'tipos-movimiento'
          },
          // {
          //   titleLink: 'Tipos Partida',
          //   hasChilds: false,
          //   route: 'tipos-partida'
          // },
          {
            titleLink: 'Tipos Personal',
            hasChilds: false,
            route: 'tipos-personal'
          },
          {
            titleLink: 'Tipos Valoración',
            hasChilds: false,
            route: 'tipos-valoracion'
          }
        ]
      },
      {
        titleLink: 'Usuarios',
        hasChilds: false,
        display: user.admin,
        route: 'usuarios'
      },
      {
        titleLink: 'Entidad',
        hasChilds: false,
        display: user.admin,
        route: 'empresas'
      },
      {
        titleLink: 'Gong',
        hasChilds: false,
        display: user.admin,
        route: 'gong'
      },
      {
        titleLink: 'Importar Excel',
        hasChilds: false,
        display: user.admin,
        route: 'importacion-excel'
      }
    ];
  }

  goTo(path: string) {
    const r = path;
    this.router.navigate([path]).then((resp) => {
      // if (!resp) {
      //   const err = Observable.throw(new HttpErrorResponse(
      //     { status: 401 })
      //   );
      //   this.common.handlerResponse(err.error);
      // }
      // this.navbarCollapsed = !this.navbarCollapsed;
    });
  }

  logout() {
    this.authService.setLoggedOut();
    this.router.navigate(['/']);
  }

  openChangePass() {
    this.modal.open(ChangePasswordComponent, { size: 'lg', backdrop: 'static' });
    this.isCollapse = true;
  }
  openEditUser() {
    this.modal.open(UsuarioDetailComponent, { size: 'lg', backdrop: 'static' });
    this.isCollapse = true;
  }
}
