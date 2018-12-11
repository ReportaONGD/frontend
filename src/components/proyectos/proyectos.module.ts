import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { PipesModule } from '../../pipes/pipes.module';
import { Common } from '../../providers/common/common';
import { DataProvider } from '../../providers/data/data.provider';
import { CustomDatepickerI18n, I18n } from '../../providers/dateStruct/datepicker_i18n';
import { ActividadGlobalService } from '../../providers/proyecto/actividad_global/actividad_global.service';
import { ActividadGlobalRecursoService } from '../../providers/proyecto/actividad_global/recursos/actividad_global_recurso.service';
import { AportacionService } from '../../providers/proyecto/aportacion/aportacion.service';
import { BienService } from '../../providers/proyecto/bien/bien.service';
import { CuentaBancariaService } from '../../providers/proyecto/cuenta_bancaria/cuenta_bancaria.service';
import { OperacionBancariaService } from '../../providers/proyecto/cuenta_bancaria/operacion_bancaria/operacion_bancaria.service';
import { DocumentosService } from '../../providers/proyecto/documentos/documento.service';
import { EntidadService } from '../../providers/proyecto/entidad/entidad.service';
import { EtapaService } from '../../providers/proyecto/etapas/etapa.service';
import { ExcelExportService } from '../../providers/proyecto/excel_export/excel_export.service';
import { GastosDocumentosService } from '../../providers/proyecto/gastos/documentos/gastos_documentos.service';
import { GastosService } from '../../providers/proyecto/gastos/gastos.service';
import { InformeService } from '../../providers/proyecto/informe/informe.service';
import { ModificacionService } from '../../providers/proyecto/modificacion/modificacion.service';
import { ObjetivoGeneralComentariosService } from '../../providers/proyecto/objetivo/indicador/comentarios/comentarios.service';
// tslint:disable-next-line:max-line-length
import { ObjetivoFuenteVerificacionDocumentosService } from '../../providers/proyecto/objetivo/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { OGFuenteVerificacionService } from '../../providers/proyecto/objetivo/indicador/fuente_verificacion/fuente_verificacion.service';
import { IndicadorService } from '../../providers/proyecto/objetivo/indicador/indicador.service';
import { OGMedidaService } from '../../providers/proyecto/objetivo/indicador/medida/medida.service';
import { ObjetivoService } from '../../providers/proyecto/objetivo/objetivo.service';
import { ObjetivoEspecificoComentariosService } from '../../providers/proyecto/objetivo_especifico/comentarios/comentarios.service';
import { ObjetivoEspecificoHipotesisService } from '../../providers/proyecto/objetivo_especifico/hipotesis/objetivo_especifico_hipotesis.service';
import { ObjetivoEspecificoIndicadorComentariosService } from '../../providers/proyecto/objetivo_especifico/indicador/comentarios/comentarios.service';
// tslint:disable-next-line:max-line-length
import { ObjetivoEspecificoFuenteVerificacionDocumentoService } from '../../providers/proyecto/objetivo_especifico/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { OEFuenteVerificacionService } from '../../providers/proyecto/objetivo_especifico/indicador/fuente_verificacion/objetivo_especifico_fuente_verificacion.service';
import { OEMedidaService } from '../../providers/proyecto/objetivo_especifico/indicador/medida/objetivo_especifico_medida.service';
import { ObjetivoEspecificoIndicadorService } from '../../providers/proyecto/objetivo_especifico/indicador/objetivo_especifico_indicador.service';
import { ObjetivoEspecificoService } from '../../providers/proyecto/objetivo_especifico/objetivo_especifico.service';
import { ResultadoActividadComentariosService } from '../../providers/proyecto/objetivo_especifico/resultado/actividad/comentarios/comentarios.service';
import { ActividadRecursoService } from '../../providers/proyecto/objetivo_especifico/resultado/actividad/recursos/actividad_recurso.service';
import { ResultadoActividadService } from '../../providers/proyecto/objetivo_especifico/resultado/actividad/resultado_actividad.service';
import { ResultadoComentariosService } from '../../providers/proyecto/objetivo_especifico/resultado/comentarios/comentarios.service';
import { ResultadoHipotesisService } from '../../providers/proyecto/objetivo_especifico/resultado/hipotesis/resultado_hipotesis.service';
import { ResultadoIndicadorComentariosService } from '../../providers/proyecto/objetivo_especifico/resultado/indicador/comentarios/comentarios.service';
// tslint:disable-next-line:max-line-length
import { ResultadoFuenteVerificacionDocumentoService } from '../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/documentos/fuentes_verificacion_documentos.service';
import { ResultadoFuenteVerificacionService } from '../../providers/proyecto/objetivo_especifico/resultado/indicador/fuente_verificacion/resultado_fuente_verificacion.service';
import { ResultadoMedidaService } from '../../providers/proyecto/objetivo_especifico/resultado/indicador/medida/resultado_medida.service';
import { ResultadoIndicadorService } from '../../providers/proyecto/objetivo_especifico/resultado/indicador/resultado_indicador.service';
import { ResultadoService } from '../../providers/proyecto/objetivo_especifico/resultado/resultado.service';
import { PagoService } from '../../providers/proyecto/pagos/pago.service';
import { PartidaService } from '../../providers/proyecto/partida/partida.service';
import { PeriodoService } from '../../providers/proyecto/periodo/periodo.service';
import { PersonaService } from '../../providers/proyecto/persona/persona.service';
import { PresupuestoService } from '../../providers/proyecto/presupuesto/presupuesto.service';
import { ProyectoService } from '../../providers/proyecto/proyecto.service';
import { TipoPeriodoService } from '../../providers/proyecto/tipo_periodo/tipo_periodo.service';
import { ValidacionService } from '../../providers/proyecto/validaciones/validacion.service';
import { GanttModule } from '../ng2-gantt';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { Confirm2Component } from '../shared/confirm2/confirm.component';
import { DocumentosComponent } from '../shared/documentos/documento.component';
import { SharedModule } from '../shared/shared.module';
import { ActividadComponent } from './actividad/actividad.component';
import { ActividadDetailComponent } from './actividad/actividad_detail.component';
import { ActividadGlobalComponent } from './actividad/actividad_global.component';
import { AportacionesComponent } from './aportaciones/aportaciones.component';
import { BienComponent } from './bienes/bien.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { CronogramaDetailComponent } from './cronograma/cronograma_detail.component';
import { CuentasBancariasComponent } from './cuentas_bancarias/cuentas_bancarias.component';
import { DatosGeneralesComponent } from './datos_generales/datos_generales.component';
import { DocumentosListComponent } from './documentos/documentos_list.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EtapaComponent } from './etapa/etapa.component';
import { EtapaDetailComponent } from './etapa/etapa_detail.component';
import { FuenteVerificacionComponent } from './fuente_verificacion/fuente_verificacion.component';
import { FuenteVerificacionDetailComponent } from './fuente_verificacion/fuente_verificacion_detail.component';
import { GastosComponent } from './gastos/gastos.component';
import { GastosDetailComponent } from './gastos/gastos_detail.component';
import { HipotesisComponent } from './hipotesis/hipotesis.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { IndicadoresDetailComponent } from './indicadores/indicador_detail.component';
import { InformeComponent } from './informe/informe.component';
import { InformeDetailComponent } from './informe/informe_detail.component';
import { MedidasComponent } from './medidas/medidas.component';
import { MenuProyectoComponent } from './menu/menu_proyecto.component';
import { ModificacionesComponent } from './modificaciones/modificaciones.component';
import { ObjetivosEspecificosComponent } from './objetivos/objetivos_especificos/objetivos_especificos.component';
import { ObjetivosEspecificosListComponent } from './objetivos/objetivos_especificos/objetivos_especificos_list.component';
import { ObjetivosGeneralesComponent } from './objetivos/objetivos_generales/objetivos_generales.component';
import { OperacionBancariaComponent } from './operaciones_bancarias/operaciones_bancarias.component';
import { PagoComponent } from './pagos/pago.component';
import { PagoDetailComponent } from './pagos/pago_detail.component';
import { PartidaComponent } from './partidas/partidas.component';
import { PartidasDetailComponent } from './partidas/partidas_detail.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { PeriodoDetailComponent } from './periodo/periodo_detail.component';
import { PersonaComponent } from './persona/persona.component';
import { PresupuestoInicialComponent } from './presupuesto_inicial/presupuesto_inicial.component';
import { PresupuestoInicialDetailComponent } from './presupuesto_inicial/presupuesto_inicial_detail.component';
import { ProyectosComponent } from './proyectos.component';
import { ProyectoDetailComponent } from './proyecto_detail.component';
import { RecursoComponent } from './recursos/recursos.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ResumenCajaComponent } from './resumen/resumen_caja.component';
import { ResumenGastoComponent } from './resumen/resumen_gasto.component';
import { ResumenMatrizComponent } from './resumen/resumen_matriz.component';
import { ResumenPresupuestoComponent } from './resumen/resumen_presupuesto.component';
import { ResumenProveedorComponent } from './resumen/resumen_proveedor.component';
import { ResumenSeguimientoTecnicoComponent } from './resumen/resumen_seguimiento_tecnico.component';
import { ResumenTesoreriaComponent } from './resumen/resumen_tesoreria.component';
import { ValidacionEtapaComponent } from './validacion_etapas/validacion_etapa.component';


@NgModule({

  declarations: [
    ProyectosComponent,
    ProyectoDetailComponent,
    MenuProyectoComponent,
    DatosGeneralesComponent,
    ModificacionesComponent,
    AportacionesComponent,
    EntidadesComponent,
    HipotesisComponent,
    IndicadoresComponent,
    IndicadoresDetailComponent,
    ObjetivosGeneralesComponent,
    ObjetivosEspecificosComponent,
    ObjetivosEspecificosListComponent,
    FuenteVerificacionComponent,
    CuentasBancariasComponent,
    ResultadosComponent,
    ActividadComponent,
    ActividadDetailComponent,
    ActividadGlobalComponent,
    InformeComponent,
    InformeDetailComponent,
    CronogramaComponent,
    CronogramaDetailComponent,
    RecursoComponent,
    FuenteVerificacionDetailComponent,
    PartidaComponent,
    PeriodoComponent,
    PeriodoDetailComponent,
    PartidasDetailComponent,
    PresupuestoInicialComponent,
    PresupuestoInicialDetailComponent,
    EtapaDetailComponent,
    EtapaComponent,
    PersonaComponent,
    OperacionBancariaComponent,
    BienComponent,
    GastosComponent,
    GastosDetailComponent,
    ValidacionEtapaComponent,
    ComentariosComponent,
    MedidasComponent,
    DocumentosListComponent,
    ResumenMatrizComponent,
    ResumenPresupuestoComponent,
    ResumenGastoComponent,
    ResumenCajaComponent,
    ResumenTesoreriaComponent,
    ResumenProveedorComponent,
    ResumenSeguimientoTecnicoComponent,
    PagoComponent,
    PagoDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    GanttModule,
    PipesModule.forRoot(),
    SharedModule,
    RouterModule,
    LoadingModule
  ],
  providers: [
    ActividadGlobalService,
    ProyectoService,
    EntidadService,
    AportacionService,
    ModificacionService,
    CuentaBancariaService,
    ObjetivoService,
    ObjetivoEspecificoService,
    IndicadorService,
    OGFuenteVerificacionService,
    ActividadGlobalService,
    ActividadGlobalRecursoService,
    ObjetivoEspecificoIndicadorService,
    OEMedidaService,
    OGMedidaService,
    ObjetivoEspecificoHipotesisService,
    ResultadoService,
    ResultadoHipotesisService,
    ResultadoIndicadorService,
    ResultadoActividadService,
    ResultadoFuenteVerificacionService,
    ResultadoMedidaService,
    OEFuenteVerificacionService,
    ActividadRecursoService,
    PartidaService,
    PeriodoService,
    TipoPeriodoService,
    PresupuestoService,
    EtapaService,
    PersonaService,
    BienService,
    OperacionBancariaService,
    GastosService,
    GastosDocumentosService,
    ObjetivoFuenteVerificacionDocumentosService,
    ObjetivoEspecificoFuenteVerificacionDocumentoService,
    ResultadoFuenteVerificacionDocumentoService,
    DocumentosService,
    ValidacionService,
    InformeService,
    ResultadoComentariosService,
    ObjetivoGeneralComentariosService,
    ObjetivoEspecificoComentariosService,
    ObjetivoEspecificoIndicadorComentariosService,
    ResultadoIndicadorComentariosService,
    ResultadoActividadComentariosService,
    ExcelExportService,
    PagoService,
    DataProvider,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    Common
  ],
  exports: [],
  entryComponents: [ConfirmComponent, Confirm2Component,
    IndicadoresDetailComponent, ActividadDetailComponent,
    CronogramaDetailComponent, FuenteVerificacionDetailComponent,
    PartidasDetailComponent, PresupuestoInicialDetailComponent, DocumentosComponent,
    EtapaDetailComponent, PeriodoDetailComponent, InformeDetailComponent, GastosDetailComponent,
    ComentariosComponent, MedidasComponent, PagoDetailComponent]
})
export class ProyectosModule { }
