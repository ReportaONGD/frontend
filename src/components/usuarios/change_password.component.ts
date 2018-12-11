import { AuthService } from './../../providers/auth/auth.service';
import { UserValidationService } from './../../validators/UserValidationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { Common } from '../../providers/common/common';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password-component',
  templateUrl: './change_password.component.html',
  styleUrls: ['../proyectos/proyectos.component.css'],
  providers: [UsuarioService, Common],
  entryComponents: []
})
export class ChangePasswordComponent implements OnInit {
  frmPassword: FormGroup;
  usuario: any;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private authService: AuthService,
    public router: Router,
    private activeModal: NgbActiveModal
  ) {
  }
  ngOnInit() {
    this.initialize();
    this.frmPassword = this.formBuilder.group({
      new_password: ['', Validators.compose([Validators.required, UserValidationService.passwordValidator])],
      repeat_new_password: ['', Validators.compose([Validators.required, this.equalto('new_password')])]
    });
  }

  initialize() {
    if (sessionStorage.getItem('user')) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
    }
  }
  edit() {
    /* if (this.frmPassword.dirty && this.frmPassword.valid) {
      alert('Password: ${this.frmPassword.value.new_password}');
    }else { */
      this.usuario.password = this.frmPassword.value.new_password;
      const usuario = { user: this.usuario };
      this.service.put(this.usuario.id, usuario).subscribe(() => {
        // sessionStorage.clear();
        // this.authService.setLoggedOut();
        this.common.toastr.success('Contraseña cambiada!', 'Success!', { timeOut: 3000 });
        this.close();
        // this.router.navigate(['/']);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    // }
  }

  close() {
    this.activeModal.close();
  }

  private equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const input = control.value;
      const isValid = control.root.value[field_name] === input;
      if (!isValid) {
        return { 'equalTo': {isValid} };
      } else {
        return null;
      }
    };
  }
}
