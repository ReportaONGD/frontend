import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { AgenteService } from '../../providers/catalogos/agente.service';
import { FinanciadorService } from '../../providers/catalogos/financiador.service';
import { ImplementadorService } from '../../providers/catalogos/implementador.service';
import { SocioLocalService } from '../../providers/catalogos/socio_local.service';
// PROVIDERS
import { LocalizacionService } from '../../providers/catalogos/localizacion.service';
import { MonedaService } from '../../providers/catalogos/moneda.service';
import { PaisService } from '../../providers/catalogos/pais.service';
import { CuentaBancariaService } from '../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';
import { EtapaService } from '../../providers/proyecto/etapas/etapa.service';
import { PartidaService } from '../../providers/proyecto/partida/partida.service';
import { ProyectoService } from '../../providers/proyecto/proyecto.service';
// COMPONENTS
import { ActividadComboComponent } from './actividad/actividad.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { Confirm2Component } from './confirm2/confirm.component';
import { CuentaComboComponent } from './cuenta/cuenta.component';
import { DocumentosComponent } from './documentos/documento.component';
import { EtapaComboComponent } from './etapa/etapa.component';
import { FinanciadorComboComponent } from './financiador/financiador.component';
import { ImplementadorComboComponent } from './implementador/implementador.component';
import { LoaderComponent } from './loader/loader.component';
import { LocalizacionComboComponent } from './localizacion/localizacion.component';
import { MonedaComponent } from './moneda/moneda.component';
import { PaisComponent } from './pais/pais.component';
import { GastosComponent } from './gastos/gasto.component';
import { PartidaComboComponent } from './partida/partida.component';



@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    Confirm2Component,
    CuentaComboComponent,
    MonedaComponent,
    PaisComponent,
    GastosComponent,
    LocalizacionComboComponent,
    EtapaComboComponent,
    ActividadComboComponent,
    PartidaComboComponent,
    FinanciadorComboComponent,
    ImplementadorComboComponent,
    DocumentosComponent,
    AutofocusDirective,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LoadingModule
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
    Confirm2Component,
    AutofocusDirective,
    MonedaComponent,
    PaisComponent,
    GastosComponent,
    EtapaComboComponent,
    LocalizacionComboComponent,
    PartidaComboComponent,
    ActividadComboComponent,
    FinanciadorComboComponent,
    ImplementadorComboComponent,
    DocumentosComponent,
    CuentaComboComponent,
    LoaderComponent
  ],
  providers: [
    PaisService,
    MonedaService,
    LocalizacionService,
    EtapaService,
    PartidaService,
    AgenteService,
    FinanciadorService,
    ImplementadorService,
    SocioLocalService,
    CuentaBancariaService,
    ProyectoService
  ]
})
export class SharedModule { }
