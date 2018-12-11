// import {Location} from '@angular/common';
// import {TestBed, async, tick, fakeAsync} from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import {MenuComponent} from '../components/menu/menu.component';
// import {RouterTestingModule} from '@angular/router/testing';
// import {routes} from './app.routing';
// import {HomeComponent} from '../components/home/home.component';
// import {NotFoundComponent} from '../components/not_found/not_found';
// import {LoginComponent} from '../components/login/login.component';
// import {EstadosInformeComponent} from '../components/catalogos/estados_informe/estados_informe.component';
// import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AppConfigModule} from './app-config.module';
// import {ToastrModule} from 'ngx-toastr';
// import {LoginProvider} from '../providers/login/login.provider';
// import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {BrowserModule} from '@angular/platform-browser';
// import {CatalogoService} from '../providers/catalogos/catalogo.provider';
// import {AdminProvider} from '../providers/admin/admin.provider';
// import {AngularFontAwesomeModule} from 'angular-font-awesome';
// import {EstadosInformeProvider} from '../providers/estados_informe/estados_informe.provider';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NgbCumstonDateParserFormatter} from '../providers/dateStruct/dateParseFormatter';
// import {MyHttpInterceptor} from '../providers/interceptor/MyHttpInterceptor';
// import {ActivatedRoute, Router, RouterModule} from '@angular/router';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// import {Common} from '../providers/common/common';
// import {AuthGuard} from './auth_guard.provider';
// import {DataProvider} from '../providers/data/data.provider';
// import {ProyectoProvider} from '../providers/proyecto/proyecto.provider';
// import {ConfirmComponent} from '../components/shared/confirm/confirm.component';
// import {AlertComponent} from '../components/shared/alert/alert.component';

// describe('AppComponent', () => {
//   let location: Location;
//   let router: Router;
//   let activatedRoute: ActivatedRoute;
//   let service: CatalogoService;
//   let fixture;
//   let httpMock: HttpTestingController;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({

//       declarations: [
//         AppComponent,
//         MenuComponent,
//         NotFoundComponent,
//         HomeComponent,
//         LoginComponent,
//         EstadosInformeComponent,
//         ConfirmComponent,
//         AlertComponent,
//       ],
//       imports: [
//         BrowserModule,
//         ReactiveFormsModule,
//         FormsModule,
//         RouterTestingModule.withRoutes(routes),
//         BrowserAnimationsModule,
//         NgbModule.forRoot(),
//         HttpClientTestingModule,
//         ToastrModule.forRoot(),
//         AngularFontAwesomeModule,
//         AppConfigModule
//       ],
//       providers: [
//         {
//           provide: NgbDateParserFormatter,
//           useClass: NgbCumstonDateParserFormatter,
//           multi: false
//         },
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: MyHttpInterceptor,
//           multi: true
//         },

//         LoginProvider,
//         EstadosInformeProvider,
//         AdminProvider,
//         CatalogoService,
//         ProyectoProvider,
//         DataProvider,
//         Common,
//         AuthGuard

//       ]
//     }).compileComponents().then(function(){
//         router = TestBed.get(Router);
//         location = TestBed.get(Location);
//         activatedRoute = TestBed.get(ActivatedRoute);
//         service = TestBed.get(CatalogoService);
//         httpMock = TestBed.get(HttpTestingController);
//     });
//   }));
//   it('should create the app', async(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title undefined`, async(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual(undefined);
//   }));
//   it('navigate to "" redirects you to /home', fakeAsync(() => {
//     router.navigate(['']);
//     tick();
//     expect(location.path()).toBe('/home');
//   }));
//   it('navigate to "categorias" takes you to /categorias', fakeAsync(() => {
//     router.navigate(['/categorias']);
//     tick(50);
//     expect(location.path()).toBe('/categorias');
//   }));

// });
