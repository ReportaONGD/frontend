import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {DataProvider} from '../providers/data/data.provider';

@Injectable()
export class ProjectGuardProvider implements CanActivate {
  project: any;

  constructor(private router: Router,
              private dataService: DataProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.project =  this.dataService.getItem('project_id');
    console.log('AuthGuard#canActivate called');
    if (this.project) {
      return true;
    } else {
      return false;
    }
  }

}

