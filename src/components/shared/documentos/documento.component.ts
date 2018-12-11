import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoModel } from '../../../models/documento.model';
import { ParamsModel } from '../../../models/params.model';
import { DocumentosService } from '../../../providers/proyecto/documentos/documento.service';
import { Confirm2Component } from '../confirm2/confirm.component';
import { Common } from '../../../providers/common/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-documentos-component',
  templateUrl: './documento.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css'],
  providers: [Common, Confirm2Component]
})
export class DocumentosComponent implements OnInit {
  frmDocumento: FormGroup;
  title: string;
  item: any;
  file: any;
  service: any;
  showForm = false;
  fileName: string;
  documento: DocumentoModel;
  documentos: DocumentoModel[] = new Array<DocumentoModel>();
  ids: ParamsModel;

  constructor(private activeModal: NgbActiveModal,
    // private documentosService: DocumentosService,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private common: Common) {
  }

  public ngOnInit(): void {
    // this.service.ids = this.ids;
    this.showForm = false;

    this.frmDocumento = this.formBuilder.group({
      file: [null, Validators.required],
    });
    this.initialize();
  }

  initialize() {
    this.documentos = this.item.documentos;
    if (this.documentos == null) {
      this.documentos = new Array<DocumentoModel>();
    }
  }

  showAlert() {
    return this.documentos && this.documentos.length === 0;
  }

  add() {
    this.showForm = true;
    this.documento = new DocumentoModel();
  }
  cancel() {
    this.showForm = false;
  }

  close(result) {
    this.activeModal.close(result);
  }

  save() {
    this.service.post_document(this.documento, this.file).subscribe((resp) => {
      this.documentos.push(resp);
      this.close(true);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  fileInputChange(fileInput: any) {
    // const reader = new FileReader();
    if (fileInput.target.files && fileInput.target.files[0]) {
      // reader.readAsDataURL(fileInput.target.files[0]);
      // reader.onload = (e: any) => {
      //   this.fileName = fileInput.target.files[0].name;
      // };
      this.file = fileInput.target.files[0];
      this.fileName = fileInput.target.files[0].name;
      this.documento = new DocumentoModel({
        fecha: new Date().toLocaleDateString(),
        nombre: this.fileName,
        ruta: ''
      });
    }
  }

  download(documento: DocumentoModel) {
    this.service.download(documento).subscribe((resp) => {
      this.downloadFile(documento, resp);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  downloadFile(documento: DocumentoModel, data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const name = (documento.nombre.split('.'))[0] + '_' + moment(new Date()).format('DD/MM/YYYY');
    saveAs(blob, name);
  }

  openModalRemove(item: DocumentoModel, index: number): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Documentos';
    modalRef.componentInstance.message = `¿Desea eliminar el Documento ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item, index);
      }
    });
  }

  delete(item: DocumentoModel, index: number) {
    this.service.delete(item._id).subscribe((resp) => {
      this.documentos.splice(index);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
