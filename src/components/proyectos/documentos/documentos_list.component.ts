import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoModel } from '../../../models/documento.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { DocumentosService } from '../../../providers/proyecto/documentos/documento.service';


@Component({
  selector: 'app-documentos-list-component',
  templateUrl: './documentos_list.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [DocumentosService, Common],
  entryComponents: [Confirm2Component]
})
export class DocumentosListComponent implements OnInit {
  showForm = false;
  documentos: DocumentoModel[];
  documento: DocumentoModel;
  ids: ParamsModel;

  constructor(private common: Common,
    private modal: NgbModal,
    private service: DocumentosService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.ids = new ParamsModel({
          proyecto_id: params['id']
        });
        this.service.ids = this.ids;
      });
    }
    this.initialize();
  }

  initialize() {
    this.showForm = false;
    this.service.all().subscribe((resp) => {
      this.documentos = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  download(documento: DocumentoModel) {
    this.service.post_document(documento).subscribe((resp) => {
        this.downloadFile(resp);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
  }
  downloadFile(data: Response) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  openModalRemove(item: DocumentoModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Documentos';
    modalRef.componentInstance.message = `¿Desea eliminar el Documento ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item: DocumentoModel) {
    this.service.delete(item._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.documentos && this.documentos.length === 0;
  }
}
