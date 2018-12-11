import { ResetPasswordComponent } from './../usuarios/reset_password.component';
import { Common } from './../../providers/common/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../providers/auth/auth.service';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [LoginService],
})
export class LoginComponent implements OnInit {
  response_string: string;
  @Input() isModal = false;
  @Input() activeModal: any;
  isCollapse = true;
  usuario: UsuarioModel;
  constructor(private authProvider: AuthService,
    private router: Router,
    private modal: NgbModal,
    private common: Common,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }
  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
  onSubmit() {
    this.authProvider.login(this.usuario).subscribe((resp) => {
      this.authProvider.setCurrentUser(resp);
      this.router.navigate(['/home']);
    }, (err) => {
      if (err.value.error.errors.user) {
        this.toastr.error('Usuario bloquedo por varios intentos de acceso fallidos! Recupere contraseña', 'Error!', { timeOut: 3000 });
      } else {
        this.toastr.error('Contraseña incorrecta!', 'Error!', { timeOut: 3000 });
      }
    });
  }

  closeModal(event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    this.activeModal.close();
  }
  resetPassword() {
    this.modal.open(ResetPasswordComponent, { size: 'lg', backdrop: 'static' });
    this.isCollapse = true;
  }

  handlerResponse(response) {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 500) {
        this.response_string = 'Error inesperado pongase en contacto con el administrador';
      } else if (response.status === 401) {
        this.response_string = 'Usuario no autorizado';
      } else {
        this.response_string = 'Error inesperado pongase en contacto con el administrador';
      }
    } else if (response instanceof Object) {
      this.response_string = 'Success!';
    }
    this.createToaster();
  }

  createToaster() {
    this.toastr.error(this.response_string, 'Error', { timeOut: 3000 });
  }
}
