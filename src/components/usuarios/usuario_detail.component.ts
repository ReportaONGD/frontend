import { AuthService } from './../../providers/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioModel } from '../../models/usuario.model';
import { Common } from '../../providers/common/common';
import { UsuarioService } from '../../providers/usuario/usuario.service';

@Component({
  selector: 'app-usuario-detail-component',
  templateUrl: './usuario_detail.component.html',
  styleUrls: ['../proyectos/proyectos.component.css'],
  providers: [UsuarioService, Common],
  entryComponents: []
})
export class UsuarioDetailComponent implements OnInit {
  frmUsuario: FormGroup;
  usuario: UsuarioModel;
  constructor(private common: Common,
              private formBuilder: FormBuilder,
              private activeModal: NgbActiveModal,
              private authService: AuthService,
              private service: UsuarioService,
              public router: Router
  ) {
  }
  ngOnInit() {
     this.frmUsuario = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['' , Validators.required],
      admin: [false]
    });
    this.initialize();
  }
  initialize() {
    if (sessionStorage.getItem('user')) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
      this.frmUsuario.patchValue(this.usuario);
    }
  }

  edit() {
    const user = Object.assign(this.usuario, this.frmUsuario.value);
    const usuario = {user: user};
    this.service.put(user.id, usuario).subscribe(() => {
        // sessionStorage.clear();
      // this.authService.setLoggedOut();
      this.common.toastr.success('Datos cambiados!', 'Success!', { timeOut: 3000 });
        this.close();
        // this.router.navigate(['/']);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  close() {
    this.activeModal.close();
  }
}
