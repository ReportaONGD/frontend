import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routes } from '../../app/app.routing';
// CUSTOM MODULES
import { PipesModule } from '../../pipes/pipes.module';
import { ApiService } from '../../providers/base/api.service';
// PROVIDERS
import { CategoriaService } from '../../providers/catalogos/categoria.service';
import { CofinanciadorService } from '../../providers/catalogos/cofinanciador.service';
import { ContratoService } from '../../providers/catalogos/contrato.service';
import { CostesService } from '../../providers/catalogos/costes.service';
import { EstadosInformeService } from '../../providers/catalogos/estados_informe.service';
import { EstadosProyectoService } from '../../providers/catalogos/estados_proyecto.service';
import { AgenteService } from '../../providers/catalogos/agente.service';
import { FinanciadorService } from '../../providers/catalogos/financiador.service';
import { ImplementadorService } from '../../providers/catalogos/implementador.service';
import { SocioLocalService } from '../../providers/catalogos/socio_local.service';
import { TipoMovimientoService } from '../../providers/catalogos/tipo_movimiento.service';
import { TipoPartidaService } from '../../providers/catalogos/tipo_partida.service';
import { TipoPersonalService } from '../../providers/catalogos/tipo_personal.service';
import { TipoValoracionService } from '../../providers/catalogos/tipo_valoracion.service';
import { NgbCumstonDateParserFormatter } from '../../providers/dateStruct/dateParseFormatter';
// CUSTOM COMPONENTS
import { Confirm2Component } from '../shared/confirm2/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaComponent } from './categorias/categoria.component';
import { CategoriaFormComponent } from './categorias/categoria_form.component';
import { CofinanciadorComponent } from './cofinanciadores/cofinanciador.component';
import { CofinanciadorFormComponent } from './cofinanciadores/cofinanciador_form.component';
import { ContratoComponent } from './contratos/contrato.component';
import { ContratoFormComponent } from './contratos/contrato_form.component';
import { EstadosInformeComponent } from './estados_informe/estados_informe.component';
import { EstadosInformeFormComponent } from './estados_informe/estados_informe_form.component';
import { EstadosProyectoComponent } from './estados_proyecto/estados_proyecto.component';
import { EstadosProyectoFormComponent } from './estados_proyecto/estados_proyecto_form.component';
import { FinanciadorComponent } from './financiador/financiador.component';
import { FinanciadorFormComponent } from './financiador/financiador_form.component';
import { ImplementadorComponent } from './implementador/implementador.component';
import { ImplementadorFormComponent } from './implementador/implementador_form.component';
import { LocalizacionComponent } from './localizaciones/localizacion.component';
import { LocalizacionFormComponent } from './localizaciones/localizacion_form.component';
import { TipoMovimientoComponent } from './tipos_movimiento/tipo_movimiento.component';
import { TipoMovimientoFormComponent } from './tipos_movimiento/tipo_movimiento_form.component';
import { TipoPartidaComponent } from './tipos_partida/tipo_partida.component';
import { TipoPartidaFormComponent } from './tipos_partida/tipo_partida_form.component';
import { TipoPersonalComponent } from './tipos_personal/tipo_personal.component';
import { TipoPersonalFormComponent } from './tipos_personal/tipo_personal_form.component';
import { TipoValoracionComponent } from './tipos_valoracion/tipo_valoracion.component';
import { TipoValoracionFormComponent } from './tipos_valoracion/tipo_valoracion_form.component';
import { ConvocatoriaService } from '../../providers/catalogos/convocatoria.service';
import { ConvocatoriaComponent } from './convocatorias/convocatoria.component';
import { ConvocatoriaFormComponent } from './convocatorias/convocatoria_form.component';



@NgModule({
  declarations: [
    EstadosInformeComponent,
    EstadosInformeFormComponent,
    EstadosProyectoComponent,
    EstadosProyectoFormComponent,
    CategoriaComponent,
    CategoriaFormComponent,
    CofinanciadorComponent,
    CofinanciadorFormComponent,
    ContratoComponent,
    ContratoFormComponent,
    LocalizacionComponent,
    LocalizacionFormComponent,
    TipoMovimientoComponent,
    TipoMovimientoFormComponent,
    TipoPersonalComponent,
    TipoPersonalFormComponent,
    TipoValoracionComponent,
    TipoValoracionFormComponent,
    TipoPartidaComponent,
    TipoPartidaFormComponent,
    FinanciadorFormComponent,
    FinanciadorComponent,
    ConvocatoriaComponent,
    ConvocatoriaFormComponent,
    ImplementadorComponent,
    ImplementadorFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    PipesModule,
    SharedModule
  ],
  providers: [
    CofinanciadorService,
    EstadosInformeService,
    EstadosProyectoService,
    CategoriaService,
    ContratoService,
    TipoMovimientoService,
    TipoPartidaService,
    TipoPersonalService,
    TipoValoracionService,
    CostesService,
    AgenteService,
    FinanciadorService,
    ConvocatoriaService,
    ImplementadorService,
    SocioLocalService,
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new NgbCumstonDateParserFormatter(),
      multi: false
    },
    ApiService
  ],
  exports: [RouterModule],
  entryComponents: [
    CategoriaFormComponent,
    ContratoFormComponent,
    EstadosInformeFormComponent,
    EstadosProyectoFormComponent,
    TipoPersonalFormComponent,
    TipoMovimientoFormComponent,
    TipoPartidaFormComponent,
    TipoValoracionFormComponent,
    LocalizacionFormComponent,
    CofinanciadorFormComponent,
    FinanciadorFormComponent,
    ConvocatoriaFormComponent,
    ImplementadorFormComponent,
    Confirm2Component]
})
export class CatagolosModule { }
