import { UserValidationService } from './../../validators/UserValidationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { Common } from '../../providers/common/common';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Router } from '@angular/router';
import { ANIMATION_TYPES } from 'ngx-loading';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-password-component',
  templateUrl: './reset_password.component.html',
  styleUrls: ['../proyectos/proyectos.component.css'],
  providers: [UsuarioService, Common],
  entryComponents: []
})
export class ResetPasswordComponent implements OnInit {
  frmMail: FormGroup;
  usuario: any;
  config: any;
  isLoading = false;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    public router: Router,
    private activeModal: NgbActiveModal
  ) {
    this.config = {
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'red',
      secondaryColour: 'blue',
      tertiaryColour: 'green'
    };
  }
  ngOnInit() {
    this.frmMail = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, UserValidationService.emailValidator])],
    });
  }

  forgot() {

    this.isLoading = true;
    const user = {
      user: {
        email: this.frmMail.value.email,
        password: this.randomPassword(8),
        isReset: true
      }
    };
    const email = { email: this.frmMail.value.email };
    this.service.login(user).subscribe(() => {
        sessionStorage.clear();
        this.common.toastr.success('Se ha enviado un correo con la nueva contraseña a la dirección de email indicada!', 'Success!', { timeOut: 3000 });
        this.isLoading = false;
        this.close();
      }, (err) => {
        this.isLoading = false;

        if (err.value.error.errors) {
          this.common.toastr.success(err.value.error.errors.user, 'Success!', { timeOut: 3000 });
        }else {
          this.common.handlerResponse(err.value || err);
        }
      });
    // }
  }

  close() {
    this.activeModal.close();
  }

  private randomPassword(length): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$()ABCDEFGHIJKLMNOP1234567890';
    let pass = '';
    for (let x = 0; x < length; x++) {
      const i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }

}
