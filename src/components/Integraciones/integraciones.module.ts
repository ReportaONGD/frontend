import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { routes } from '../../app/app.routing';
// CUSTOM MODULES
import { PipesModule } from '../../pipes/pipes.module';
import { ApiService } from '../../providers/base/api.service';
import { ProyectoGongService } from '../../providers/integraciones/gong/proyecto.gong.service';
import { SharedModule } from '../shared/shared.module';
import { ProyectosGongComponent } from './gong/proyectos.gong.component';

@NgModule({
  declarations: [
    ProyectosGongComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    PipesModule,
    SharedModule,
    LoadingModule
  ],
  providers: [
    ProyectoGongService,
    ApiService
  ],
  exports: [RouterModule],
  entryComponents: []
})
export class IntegracionesModule { }
