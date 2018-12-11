import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Common {
  modalRef: any;
  response_string: string;

  constructor(public toastr: ToastrService,
    private router: Router
  ) {
  }

  handlerResponse(response) {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 500) {
        this.response_string = 'Error inesperado pongase en contacto con el administrador';
      } else if (response.status === 401) {
        this.response_string = 'Usuario no autorizado';
        sessionStorage.clear();
        this.router.navigate(['login']);
      } else if (response.status === 300) {
        this.response_string = response.statusText;
      } else if (response.status === 404) {
        this.response_string = response.statusText;
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
