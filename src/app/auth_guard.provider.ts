import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../providers/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authProvider: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AuthGuard#canActivate called');
    const value = sessionStorage.getItem('user');

    // if (!value || !this.authProvider.getLoggedIn()) {
    if (!value) {
      this.router.navigate(['login']);
    } else {
      this.authProvider.setLoggedIn(true);
      return true;
    }

    return this.authProvider.getLoggedIn();
  }
}
