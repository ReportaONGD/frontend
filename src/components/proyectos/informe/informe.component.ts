import { ProyectoModel } from './../../../models/proyecto.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ANIMATION_TYPES } from 'ngx-loading';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as XLSX from 'xlsx/types';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { InformeModel } from '../../../models/informe.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { ExcelExportService } from '../../../providers/proyecto/excel_export/excel_export.service';
import { InformeService } from '../../../providers/proyecto/informe/informe.service';
import { PeriodoService } from '../../../providers/proyecto/periodo/periodo.service';
import { ProyectoService } from '../../../providers/proyecto/proyecto.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { InformeDetailComponent } from './informe_detail.component';


@Component({
  selector: 'app-informe-component',
  templateUrl: './informe.component.html',
  providers: [InformeService, ExcelExportService, PeriodoService, Common],
  entryComponents: [InformeDetailComponent]
})
export class InformeComponent implements OnInit {
  ds: NgbCumstonDateParserFormatter = new NgbCumstonDateParserFormatter();
  ids: ParamsModel;
  informes: InformeModel[] = [];
  proyecto: ProyectoModel;
  showAlertPeriodo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subvencion = 0;
  isEjecucion = false;
  config: any;
  wb: XLSX.WorkBook;
  isLoadingI = false;
  constructor(
    private modal: NgbModal,
    private service: InformeService,
    private common: Common,
    private route: ActivatedRoute,
    private periodoProvider: PeriodoService,
    private router: Router,
    private excelImportService: ExcelExportService,
    private proyectoService: ProyectoService
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

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = {
          proyecto_id: params['id']
        };
        this.service.ids = this.ids;
        this.proyectoService.ids = this.ids;
        this.excelImportService.ids = this.ids;
      });
    }
    this.loadPeriodos();
    this.initialize();
  }

  showAlert() {
    return this.informes && this.informes.length === 0;
  }

  initialize(): void {
    this.service.all().subscribe((resp) => {
      this.informes = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    }, () => {
      this.isLoadingI = false;
    });

    this.proyectoService.get(this.ids.proyecto_id).subscribe((resp) => {
      this.proyecto = resp;
      this.isEjecucion = this.proyecto.validateProjectState();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  editInforme(item): void {
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'informe', item._id, 'edit']);
  }

  addInforme(): void {
    // this.openModal(new InformeModel(), true);
    this.router.navigate(['/proyectos', this.ids.proyecto_id, 'edit', 'informe', 'new']);
  }

  onDelete(item): void {
    this.openModalConfirm(item);
  }

  /* goTo(informe: InformeModel) {
    this.router.navigate(['/proyectos', informe.proyecto_id, 'edit', 'datos-generales']);
  } */

  // openModal(informe, isNew = false): void {
  //   const modalRef = this.modal.open(InformeDetailComponent);
  //   const text = isNew ? 'Nuevo' : 'Edición';
  //   modalRef.componentInstance.title = `${text} Informe`;
  //   modalRef.componentInstance.ids = this.ids;
  //   modalRef.componentInstance.informe = informe;
  //   modalRef.componentInstance.isNew = isNew;
  //   modalRef.result.then((result) => {
  //     if (result) {
  //       this.initialize();
  //     }
  //   });
  // }

  exportToExcel(informe: InformeModel) {
    this.isLoadingI = true;
    this.excelImportService.excel_import(informe).subscribe((resp) => {
      console.log('OK!!!!!');
      this.isLoadingI = false;
      this.common.toastr.success('Archivo exportado!', 'Success!', { timeOut: 3000 });
      this.downloadFile(informe, resp);
    }, (err) => {
      this.isLoadingI = false;
      this.common.handlerResponse(err.value || err);
    });
  }


  downloadFile(informe: InformeModel, data: Blob) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const name = informe.nombre + '_' + moment(new Date()).format('DD/MM/YYYY');
    saveAs(blob, name);
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
  }


  private openModalConfirm(informe): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Informe';
    modalRef.componentInstance.message = `¿Desea eliminar la Informe ${informe.nombre}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.delete(informe);
      }
    });
  }

  private delete(item): void {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private loadPeriodos() {
    this.periodoProvider.ids = this.ids;
    this.periodoProvider.all().subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.showAlertPeriodo.next(false);
      } else {
        this.showAlertPeriodo.next(true);
      }
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private goTo(informe) {
    this.router.navigate(['proyectos', informe.proyecto_padre_id.id, 'edit', 'datos-generales']);
  }

  // private readExcel(proyecto: ProyectoModel) {
  //   this.service.get_document().subscribe((resp) => {
  //     const blob = new Blob([resp]);
  //     const reader: FileReader = new FileReader();
  //     reader.onload = async (e: any) => {
  //       /* read workbook */
  //       this.wb = XLSX.read(e.target.result, {
  //         type: 'binary',
  //         //  raw: true,
  //         cellStyles: true,
  //         //  cellFormula: true,
  //         //  cellHTML: true,
  //       });
  //       /* grab first sheet */
  //       this.wb.SheetNames.forEach((wSheet) => {
  //         const wsname: string = wSheet;
  //         const sheet = this.wb.Sheets[wsname];
  //         const data = <XLSX.SheetAOAOpts>(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
  //         this.setSheet(wsname, proyecto, sheet);
  //       });
  //       // XLSX.writeFile(this.wb, 'test.xlsx', {type: 'binary', bookSST: true, bookType: 'xlsx'});
  //       // const wbout = XLSX.write(this.wb, { type: 'array', bookType: 'xlsx', bookSST: false });
  //       // saveAs(
  //       //   new Blob([wbout],
  //       //     { type: 'application/octet-stream' }
  //       //   ), 'test1.xlsx');
  //     };
  //     reader.readAsBinaryString(blob);
  //   });
  // }

  // private setSheet(wsname: string, project: ProyectoModel, sheet: any) {
  //   if (wsname.indexOf('Datos Generales') > -1) {
  //     this.setDatosGenerales(sheet, project, wsname);
  //   }
  // }
  // private setDatosGenerales(sheet: any, project: ProyectoModel, wsname: string) {
  //   const config: ExcelConfig = new ExcelConfig();
  //   Object.keys(config.DESCRIPCION).forEach((key) => {
  //     if (config.DESCRIPCION[key].indexOf('-') === -1) {
  //       if (sheet.hasOwnProperty(config.DESCRIPCION[key])) {
  //         sheet[config.DESCRIPCION[key]].s = {
  //           patternType: 'solid',
  //           fgColor: { rgb: 'red' },
  //           bgColor: { green: 'green' }
  //         };
  //         if (key === 'auditoria') {
  //           sheet[config.DESCRIPCION[key]].v = project[key] === false ? 'no' : 'si';
  //         } else if (key === 'entidad') {
  //           let entidades = '';
  //           project.entidades.forEach((e) => {
  //             entidades += e.nombre + ', ';
  //           });
  //           entidades = entidades.substr(0, entidades.length - 2);
  //           sheet[config.DESCRIPCION[key]].v = entidades;
  //         } else if (key === 'pais') {
  //           let paises = '';
  //           project.pais.forEach((p) => {
  //             paises += p.valor + ', ';
  //           });
  //           paises = paises.substr(0, paises.length - 2);
  //           sheet[config.DESCRIPCION[key]].v = paises;
  //         } else if (key === 'modificaciones') {
  //           const column_name = 'B';
  //           let column_number = 35;
  //           project.modificaciones.forEach((m) => {
  //             const column = column_name + column_number.toString();
  //             sheet[column].v = m.descripcion + ', ' + m.fecha;
  //             column_number++;
  //           });
  //         } else if (key === 'aportacion_financiador') {
  //           project.cuentas_bancarias.forEach((cb) => {
  //             const result = cb.operaciones_bancarias.filter(ob => ob.tipo_movimiento.valor.indexOf('Subvencion') > -1);
  //             if (result && result.length > 0) {
  //               this.subvencion += result[0].importe;
  //             }
  //           });
  //           sheet[config.DESCRIPCION[key]].v = this.subvencion;
  //         } else if (key === 'subvencion_ejecutada') {
  //           let gastos = 0;
  //           project.cuentas_bancarias.forEach((cb) => {
  //             const result = cb.operaciones_bancarias.filter((ob) => {
  //               if (!ob.tipo_movimiento.es_entrada) {
  //                 gastos += ob.importe;
  //               }
  //             });
  //           });
  //           sheet[config.DESCRIPCION[key]].v = this.subvencion - gastos;
  //         } else {
  //           sheet[config.DESCRIPCION[key]].v = project[key];
  //         }
  //       }
  //     } else {
  //       if (key === 'aportacion') {
  //         const column_name_nombre = 'B';
  //         const column_name_cuantia = 'C';
  //         let column_number = 20;
  //         for (let i = 0; i < project.presupuestos.length; i++) {
  //           const column_financiador = column_name_nombre + column_number.toString();
  //           const column_cuantia = column_name_cuantia + column_number.toString();
  //           if (!sheet[column_financiador]) {
  //             this.addCellToSheet(sheet, column_financiador, project.presupuestos[i].financiador.nombre);
  //           } else {
  //             sheet[column_financiador].v = project.presupuestos[i].financiador.nombre;
  //           }
  //           if (!sheet[column_cuantia]) {
  //             this.addCellToSheet(sheet, column_cuantia, project.presupuestos[i].importe);
  //           } else {
  //             sheet[column_cuantia].v = project.presupuestos[i].importe;
  //           }
  //           column_number++;
  //         }
  //       }
  //     }
  //   });
  // }
  // private addCellToSheet(worksheet, address, value) {
  //   /* cell object */
  //   const cell = { t: '?', v: value, w: value };
  //   /* assign type */
  //   if (typeof value === 'string') {  // string
  //     cell.t = 's';
  //   } else if (typeof value === 'number') { // number
  //     cell.t = 'n';
  //   } else if (value === true || value === false) { // boolean
  //     cell.t = 'b';
  //   } else if (value instanceof Date) {
  //     cell.t = 'd';
  //   } else {
  //     throw new Error('cannot store value');
  //   }
  //   /* add to worksheet, overwriting a cell if it exists */
  //   worksheet[address] = cell;
  //   /* find the cell range */
  //   const range = XLSX.utils.decode_range(worksheet['!ref']);
  //   const addr = XLSX.utils.decode_cell(address);
  //   /* extend the range to include the new cell */
  //   if (range.s.c > addr.c) { range.s.c = addr.c; }
  //   if (range.s.r > addr.r) { range.s.r = addr.r; }
  //   if (range.e.c < addr.c) { range.e.c = addr.c; }
  //   if (range.e.r < addr.r) { range.e.r = addr.r; }
  //   /* update range */
  //   worksheet['!ref'] = XLSX.utils.encode_range(range);
  // }
}
