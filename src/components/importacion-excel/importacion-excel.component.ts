import {Component} from '@angular/core';
// import * as XLSX from 'xlsx/types';
import { ProyectoModel } from '../../models/proyecto.model';
import { ANIMATION_TYPES } from 'ngx-loading';
import { ImportExcelService } from '../../providers/import_excel/import_excel.service';
import { Common } from '../../providers/common/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-import-excel-component',
  templateUrl: './importacion-excel.component.html',
  providers: [ImportExcelService, Common]
})

export class ImportacionExcelComponent {
  response_string: string;
  fileName: string;
  dataExcel: Array<any>;
  data: any;
  config: any;
  isLoading = false;
  spinnerVisible = false;
  project: ProyectoModel = new ProyectoModel();
  file: any;
  constructor(private service: ImportExcelService,
    private router: Router,
    private toastr: ToastrService,
    private common: Common) {
    this.dataExcel = new Array<any>();
    this.config = {
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'red',
      secondaryColour: 'blue',
      tertiaryColour: 'green'
    };
  }
  fileInputChange(evt: any) {
    this.spinnerVisible = true;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      this.spinnerVisible = false;
      throw new Error('Cannot use multiple files');
    }
    this.fileName = target.files[0].name;
    this.file = target.files[0];
  }

  importToExcel() {
    if (this.file) {
      this.isLoading = true;
      this.service.post_document(this.file).subscribe((resp) => {
        console.log('OK!!!!!');
        this.isLoading = false;
        this.common.toastr.success('Proyecto importado!', 'Success!', { timeOut: 3000 });
        this.router.navigate(['/proyectos']);
      }, (err) => {
        this.isLoading = false;
        if (err.value.error.error) {
          this.common.toastr.info(err.value.error.error, 'Info!', { timeOut: 3000 });
        } else {
          this.common.handlerResponse(err.value || err);
        }
      });
    } else {
      this.common.toastr.error('Seleccione un archivo', 'Error', { timeOut: 3000 });
    }
  }
}
