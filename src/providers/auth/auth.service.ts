import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Common } from '../common/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private common: Common,
    private usuarioService: UsuarioService) {
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(value) {
    this.loggedIn.next(value);
  }

  setLoggedOut() {
    sessionStorage.clear();
    this.loggedIn.next(false);
  }


  login(usuario: any): Observable<any> {
    {
      const user = {
        user: {
          email: usuario.email,
          password: usuario.password,
          isReset: false
        }
      };

      return this.usuarioService.login(user);
    }
  }

  refreshToken() {
    return this.usuarioService.refreshToken();
  }

  getCurrentUser() {
    return sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  }

  setCurrentUser(user) {
    return sessionStorage.setItem('user', JSON.stringify(user.user));
  }

  getAuthToken() {
    return sessionStorage.getItem('user') ? this.getCurrentUser().token : null;
  }

  getRefreshToken() {
    return sessionStorage.getItem('user') ? this.getCurrentUser().refresh_token : null;
  }

  setAuthToken(token) {
    // JSON.parse(sessionStorage.getItem('user')).token = token;
  }
}

