import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../providers/auth/auth.service';
import { Utils } from '../utils/utils';
import { ProyectoService } from '../providers/proyecto/proyecto.service';
import { ProyectoModel } from '../models/proyecto.model';
import { Common } from '../providers/common/common';
import { HTTPStatus } from '../providers/interceptor/http-interceptor-request.service';
import { ANIMATION_TYPES } from 'ngx-loading';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private title: string;
  config: any;
  _id: string;
  visible$: BehaviorSubject<boolean>;
  // loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loading: boolean;
  proyecto_padre_id: string;
  showGoto$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  navigationSubscription: Subscription;
  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginProvider: AuthService,
    private proyectoService: ProyectoService,
    private common: Common,
    private httpStatus: HTTPStatus
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
  ngAfterViewInit() {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loading = status;
      console.log(status);
    });
  }
  // ngOnDestroy() {
  //   if (this.navigationSubscription) {
  //      this.navigationSubscription.unsubscribe();
  //   }
  // }
  ngOnInit() {
    // this.loading$.next(true);
    // this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
    //   this.loading = status;
    //   console.log(status);
    // });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationStart) {
        if (e.url.indexOf('login') === -1 && e.url !== '/' && e.url.indexOf('404') === -1  && e.url.indexOf('importacion-excel') === -1) {
          this.httpStatus.setHttpStatus(true);
        }
      }
    });
    this.visible$ = this.loginProvider.getLoggedIn();
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        if (route.parent && route.parent.params) {
          route.parent.params.subscribe((params: any) => {
            this._id = params['id'];
          });
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        this.title = event['title'];
        if (this._id) { this.getProyecto(); }
      });
  }

  goTo() {
    this.router.navigate(['/proyectos', this.proyecto_padre_id, 'edit', 'datos-generales']);
  }

  private getProyecto() {
    this.proyectoService.get(this._id).subscribe((resp) => {
      const proyecto = new ProyectoModel(resp);
      this.proyecto_padre_id = proyecto.proyecto_padre;
      if (this.proyecto_padre_id) {
        this.showGoto$.next(true);
      } else {
        this.showGoto$.next(false);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
