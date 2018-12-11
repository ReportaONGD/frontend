import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserValidationService } from './../../validators/UserValidationService';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolModel } from '../../models/rol.model';
import { UsuarioModel } from '../../models/usuario.model';
import { RolService } from '../../providers/catalogos/rol.service';
import { Common } from '../../providers/common/common';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { AlertComponent, IAlert } from '../shared/alert/alert.component';
import { Confirm2Component } from '../shared/confirm2/confirm.component';


@Component({
  selector: 'app-usuarios-component',
  templateUrl: './usuarios.component.html',
  styleUrls: ['../proyectos/proyectos.component.css'],
  providers: [UsuarioService, RolService, Common],
  entryComponents: [Confirm2Component]
})
export class UsuariosComponent implements OnInit {
  frmUsuario: FormGroup;
  usuario: UsuarioModel;
  usuarios: UsuarioModel[];
  roles: RolModel[];
  isNewUsuario = false;
  isEdit = false;
  alert: IAlert;
  alertComponent = new AlertComponent();
  showAlert = false;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private service: UsuarioService,
    private rolService: RolService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.initialize();
    this.loadRoles();
    this.frmUsuario = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, UserValidationService.emailValidator])],
      admin: [false],
      roles: [null, Validators.required]
    });
  }

  initialize() {
    this.service.all().subscribe((resp) => {
      if (resp.length === 0) {
        this.showAlert = true;
        this.alert = this.alertComponent.getAlert(2);
      } else {
        this.showAlert = false;
        this.usuarios = resp;
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  addNewUser() {
    this.usuario = new UsuarioModel();
    this.frmUsuario.patchValue(new UsuarioModel());
    this.isNewUsuario = !this.isNewUsuario;
    this.showAlert = false;
  }

  onSubmit() {
    if (!this.usuario._id) {
      this.create();
    } else {
      this.edit();
    }
    this.isNewUsuario = !this.isNewUsuario;
    this.usuario = new UsuarioModel();
  }
  editUsuario(item) {
    this.usuario = item;
    this.isNewUsuario = !this.isNewUsuario;
    this.frmUsuario.patchValue(item);
    this.isEdit = true;
  }
  openModalRemove(item: UsuarioModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Ususario';
    modalRef.componentInstance.message = `¿Desea eliminar Usuario ${item.username}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  create() {
    const usuario = { user: this.frmUsuario.value };

    if (!(this.existe(usuario))) {
      usuario.user.password = this.randomPassword(8);
      const modalRef = this.modal.open(Confirm2Component);
      modalRef.componentInstance.title = 'Aviso';
      modalRef.componentInstance.message =
        `Anote el siguiente password: ${usuario.user.password}, después pulse el botón aceptar para guardar los datos`;
      modalRef.result.then((result) => {
        if (result) {
          this.save(usuario);
        }
      });
    } else {
      this.common.toastr.error('Ya existe una cuenta con este email creada!', 'Error!', { timeOut: 3000 });
    }
  }
  save(usuario) {
    this.service.post(usuario).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  edit() {
    // const user = Object.assign(this.usuario, this.frmUsuario.value);

    const usuario = { user: this.frmUsuario.value };
    this.service.put(this.usuario._id, usuario).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.initialize();
    }, (err) => {
      if (err.value.error.errors) {
        this.common.toastr.error(err.value.error.errors.user, 'Error!', { timeOut: 3000 });
      }else {
        this.common.handlerResponse(err.value || err);
      }
    });
  }
  delete(user) {
    this.service.delete(user._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  compareFn(c1: RolModel, c2: RolModel): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
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

  private loadRoles() {
    this.rolService.all().subscribe((resp) => {
      this.roles = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private existe(usuario) {
    const user = this.usuarios.filter(u => u.email === usuario.user.email);
    if (user.length > 0) {
      return true;
    }
    return false;
  }
}
