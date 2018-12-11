import { UserValidationService } from './../validators/UserValidationService';
import { CustExtBrowserXhr } from './../cust-ext-browser-xhr';
import { BrowserXhr } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { StorageServiceModule } from 'angular-webstorage-service';
import { LoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { CatagolosModule } from '../components/catalogos/catagolos.module';
import { EmpresasComponent } from '../components/empresas/empresa.component';
import { HomeComponent } from '../components/home/home.component';
import { ImportacionExcelComponent } from '../components/importacion-excel/importacion-excel.component';
import { IntegracionesModule } from '../components/Integraciones/integraciones.module';
import { LoginComponent } from '../components/login/login.component';
import { MenuComponent } from '../components/menu/menu.component';
import { GanttModule } from '../components/ng2-gantt';
import { NotFoundComponent } from '../components/not_found/not_found';
import { ProyectosModule } from '../components/proyectos/proyectos.module';
import { SharedModule } from '../components/shared/shared.module';
import { ChangePasswordComponent } from '../components/usuarios/change_password.component';
import { ResetPasswordComponent } from '../components/usuarios/reset_password.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { UsuarioDetailComponent } from '../components/usuarios/usuario_detail.component';
import { AuthService } from '../providers/auth/auth.service';
import { RolService } from '../providers/catalogos/rol.service';
import { Common } from '../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';
import { EmpresaService } from '../providers/empresa/empresa.service';
import { ImportExcelProvider } from '../providers/import_excel/import_excel.provider';
import { ImportExcelService } from '../providers/import_excel/import_excel.service';
import { HttpInterceptorRequest, HTTPStatus } from '../providers/interceptor/http-interceptor-request.service';
import { UsuarioService } from '../providers/usuario/usuario.service';
import { AppConfigModule } from './app-config.module';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AuthGuard } from './auth_guard.provider';
import { ProjectGuardProvider } from './project_guard.provider';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({

  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    ImportacionExcelComponent,
    UsuariosComponent,
    EmpresasComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    UsuarioDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    // RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: true }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    AppConfigModule,
    GanttModule,
    LoadingModule,
    CatagolosModule,
    ProyectosModule,
    IntegracionesModule,
    SharedModule,
    // StorageServiceModule
  ],
  providers: [
    {
      provide: BrowserXhr,
      useClass: CustExtBrowserXhr
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new NgbCumstonDateParserFormatter(),
      multi: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorRequest,
      multi: true
    },
    AuthService,
    UsuarioService,
    UserValidationService,
    ImportExcelService,
    EmpresaService,
    RolService,
    Common,
    ImportExcelProvider,
    AuthGuard,
    ProjectGuardProvider,
    NgbCumstonDateParserFormatter,
    HTTPStatus
  ],
  exports: [RouterModule, AppComponent],
  entryComponents: [ChangePasswordComponent, ResetPasswordComponent, UsuarioDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
