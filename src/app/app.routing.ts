import { Routes } from '@angular/router';
import { CategoriaComponent } from '../components/catalogos/categorias/categoria.component';
import { CofinanciadorComponent } from '../components/catalogos/cofinanciadores/cofinanciador.component';
import { ContratoComponent } from '../components/catalogos/contratos/contrato.component';
import { ConvocatoriaComponent } from '../components/catalogos/convocatorias/convocatoria.component';
import { EstadosInformeComponent } from '../components/catalogos/estados_informe/estados_informe.component';
import { EstadosProyectoComponent } from '../components/catalogos/estados_proyecto/estados_proyecto.component';
import { FinanciadorComponent } from '../components/catalogos/financiador/financiador.component';
import { ImplementadorComponent } from '../components/catalogos/implementador/implementador.component';
import { LocalizacionComponent } from '../components/catalogos/localizaciones/localizacion.component';
import { TipoMovimientoComponent } from '../components/catalogos/tipos_movimiento/tipo_movimiento.component';
import { TipoPartidaComponent } from '../components/catalogos/tipos_partida/tipo_partida.component';
import { TipoPersonalComponent } from '../components/catalogos/tipos_personal/tipo_personal.component';
import { TipoValoracionComponent } from '../components/catalogos/tipos_valoracion/tipo_valoracion.component';
import { EmpresasComponent } from '../components/empresas/empresa.component';
import { HomeComponent } from '../components/home/home.component';
import { ImportacionExcelComponent } from '../components/importacion-excel/importacion-excel.component';
import { ProyectosGongComponent } from '../components/Integraciones/gong/proyectos.gong.component';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../components/not_found/not_found';
import { ActividadGlobalComponent } from '../components/proyectos/actividad/actividad_global.component';
import { BienComponent } from '../components/proyectos/bienes/bien.component';
import { CronogramaComponent } from '../components/proyectos/cronograma/cronograma.component';
import { CuentasBancariasComponent } from '../components/proyectos/cuentas_bancarias/cuentas_bancarias.component';
import { DatosGeneralesComponent } from '../components/proyectos/datos_generales/datos_generales.component';
import { DocumentosListComponent } from '../components/proyectos/documentos/documentos_list.component';
import { EtapaComponent } from '../components/proyectos/etapa/etapa.component';
import { GastosComponent } from '../components/proyectos/gastos/gastos.component';
import { GastosDetailComponent } from '../components/proyectos/gastos/gastos_detail.component';
import { InformeComponent } from '../components/proyectos/informe/informe.component';
import { InformeDetailComponent } from '../components/proyectos/informe/informe_detail.component';
import { ObjetivosEspecificosComponent } from '../components/proyectos/objetivos/objetivos_especificos/objetivos_especificos.component';
import { ObjetivosGeneralesComponent } from '../components/proyectos/objetivos/objetivos_generales/objetivos_generales.component';
import { OperacionBancariaComponent } from '../components/proyectos/operaciones_bancarias/operaciones_bancarias.component';
import { PartidaComponent } from '../components/proyectos/partidas/partidas.component';
import { PeriodoComponent } from '../components/proyectos/periodo/periodo.component';
import { PersonaComponent } from '../components/proyectos/persona/persona.component';
import { PresupuestoInicialComponent } from '../components/proyectos/presupuesto_inicial/presupuesto_inicial.component';
import { ProyectosComponent } from '../components/proyectos/proyectos.component';
import { ProyectoDetailComponent } from '../components/proyectos/proyecto_detail.component';
import { ResultadosComponent } from '../components/proyectos/resultados/resultados.component';
import { ResumenCajaComponent } from '../components/proyectos/resumen/resumen_caja.component';
import { ResumenGastoComponent } from '../components/proyectos/resumen/resumen_gasto.component';
import { ResumenMatrizComponent } from '../components/proyectos/resumen/resumen_matriz.component';
import { ResumenPresupuestoComponent } from '../components/proyectos/resumen/resumen_presupuesto.component';
import { ResumenProveedorComponent } from '../components/proyectos/resumen/resumen_proveedor.component';
import { ResumenSeguimientoTecnicoComponent } from '../components/proyectos/resumen/resumen_seguimiento_tecnico.component';
import { ResumenTesoreriaComponent } from '../components/proyectos/resumen/resumen_tesoreria.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { AuthGuard } from './auth_guard.provider';


// import { ProjectGuardProvider } from './project_guard.provider';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'contratos',
    component: ContratoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Contratos',
      endpoint: 'contrato'
    }
  },
  {
    path: 'convocatorias',
    component: ConvocatoriaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Convocatorias'
    }
  },
  {
    path: 'agente',
    component: FinanciadorComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Agentes'
    }
  },
  {
    path: 'financiador',
    component: FinanciadorComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Financiadores'
    }
  }, {
    path: 'implementador',
    component: ImplementadorComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Implementadores',
      endpoint: 'implementador'
    }
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Categorias',
    },
  },
  {
    path: 'proyectos',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProyectosComponent, pathMatch: 'full' },
      {
        path: 'new', component: ProyectoDetailComponent,
        children: [
          {
            path: '', component: ProyectoDetailComponent
          },
          {
            path: 'datos-generales',
            component: DatosGeneralesComponent,
            data: {
              title: 'Detalles del Proyecto',
            }
          },
        ]
      },
      {
        path: ':id',
        children: [
          {
            path: '', component: ProyectoDetailComponent
          },
          {
            path: 'edit', component: ProyectoDetailComponent,
            children: [
              {
                path: 'datos-generales',
                component: DatosGeneralesComponent,
                runGuardsAndResolvers: 'always',
                data: {
                  title: 'Detalles del Proyecto',
                }
              },
              {
                path: 'etapa',
                component: EtapaComponent,
                data: {
                  title: 'Etapas del Proyecto'
                }
              },
              {
                path: 'periodo',
                component: PeriodoComponent,
                data: {
                  title: 'Periodos del Proyecto'
                }
              },
              {
                path: 'cuentas-bancarias',
                component: CuentasBancariasComponent,
                data: {
                  title: 'Cuentas bancarias'
                }
                // ,children: [{
                //   path: ':cuenta_bancaria_id',
                //   children: [{
                //     path: 'operaciones-bancarias',
                //     component: OperacionBancariaComponent,
                //     data: {
                //       title: 'Detalles del Proyecto'
                //     }
                //   }]
                // }]
              },
              {
                path: 'operaciones-bancarias',
                component: OperacionBancariaComponent,
                data: {
                  title: 'Lista operaciones bancarias'
                }
              },
              {
                path: 'objetivos-generales',
                component: ObjetivosGeneralesComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Detalles del Proyecto'
                }
              },
              {
                path: 'objetivos-especificos',
                component: ObjetivosEspecificosComponent,
                data: {
                  title: 'Detalles del Proyecto'
                }
              },
              {
                path: 'resultados',
                component: ResultadosComponent,
                data: {
                  title: 'Detalles del Proyecto'
                }
              },
              {
                path: 'actividad-global',
                component: ActividadGlobalComponent,
                data: {
                  title: 'Detalles del Proyecto'
                }
              },
              {
                path: 'partidas',
                component: PartidaComponent,
                data: {
                  title: 'Partidas'
                }
              },
              {
                path: 'persona',
                component: PersonaComponent,
                data: {
                  title: 'Personal'
                }
              },
              {
                path: 'bien',
                component: BienComponent,
                data: {
                  title: 'Bienes'
                }
              },
              {
                path: 'informe',
                component: InformeComponent,
                data: {
                  title: 'Informes'
                },
                // children: [
                //   {
                //     path: ':informe_id/edit',
                //     component: InformeDetailComponent,
                //     data: {
                //       title: 'Detalle Informe'
                //     }
                //   },
                //   {
                //     path: 'new',
                //     component: InformeDetailComponent,
                //     data: {
                //       title: 'Detalle Informe'
                //     }
                //   },
                // ]
              },
              {
                path: 'informe/:informe_id/edit',
                component: InformeDetailComponent,
                data: {
                  title: 'Detalle Informe'
                }
              },
              {
                path: 'informe/new',
                component: InformeDetailComponent,
                data: {
                  title: 'Detalle Informe'
                }
              },
              {
                path: 'presupuesto-inicial',
                component: PresupuestoInicialComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Presupuesto Inicial',
                }
              },
              {
                path: 'gastos',
                component: GastosComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Gastos',
                }
              },
              {
                path: 'gastos/:gasto_id/edit',
                component: GastosDetailComponent,
                data: {
                  title: 'Gastos',
                }
              },
              {
                path: 'gastos/new',
                component: GastosDetailComponent,
                data: {
                  title: 'Gastos',
                }
              },
              {
                path: 'cronograma',
                component: CronogramaComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Cronograma',
                }
              },
              {
                path: 'resumen-matriz',
                component: ResumenMatrizComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Matriz',
                }
              },
              {
                path: 'resumen-presupuesto',
                component: ResumenPresupuestoComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Presupuesto',
                }
              },
              {
                path: 'resumen-gasto',
                component: ResumenGastoComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Gastos',
                }
              },
              {
                path: 'resumen-caja',
                component: ResumenCajaComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Operaciones Bancarias',
                }
              },
              {
                path: 'resumen-tesoreria',
                component: ResumenTesoreriaComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Tesoreria',
                }
              },
              {
                path: 'resumen-proveedor',
                component: ResumenProveedorComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Proveedores',
                }
              },
              {
                path: 'resumen-seguimiento-tecnico',
                component: ResumenSeguimientoTecnicoComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Resumen Seguimiento Tecnico',
                }
              },
              {
                path: 'documentos',
                component: DocumentosListComponent,
                // runGuardsAndResolvers: 'always',
                data: {
                  title: 'Documentos Asociados a Gastos y Fuentes de Verificación',
                }
              }
            ]
          }
        ]
      },
    ],
    data: {
      title: 'Listado de Proyectos',
      endpoint: 'proyecto'
    },
  },
  {
    path: 'importacion-excel',
    component: ImportacionExcelComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Importación de ficheros Excel',
      endpoint: 'proyecto'
    },
  },
  {
    path: 'gong',
    component: ProyectosGongComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Importación de Proyectos Gong',
    },
  },
  {
    path: 'localizaciones',
    component: LocalizacionComponent,
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    data: {
      title: 'Localización',
    }
  },
  {
    path: 'cofinanciadores',
    component: CofinanciadorComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Co-financiadores',
    }
  },
  {
    path: 'estados-informe',
    component: EstadosInformeComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Estados Informe'
    }
  },
  {
    path: 'estados-proyecto',
    component: EstadosProyectoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Estados Proyecto'
    }
  },
  {
    path: 'tipos-movimiento',
    component: TipoMovimientoComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Tipos de Movimiento',
    }
  },
  {
    path: 'tipos-partida',
    component: TipoPartidaComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Tipos de Partida',
    }
  },
  {
    path: 'tipos-personal',
    component: TipoPersonalComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Tipos de Personal',
    }
  },
  {
    path: 'tipos-valoracion',
    component: TipoValoracionComponent,
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always',
    data: {
      title: 'Tipos de Valoración',
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Usuarios',
    }
  },
  {
    path: 'empresas',
    component: EmpresasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Organizaciones',
    }
  }
  ,
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Página no encontrada'
    }
  },
  {
    path: '**',
    redirectTo: '/404',
    data: {
      title: 'Página no encontrada'
    }
  }
];

