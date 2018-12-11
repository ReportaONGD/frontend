import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BienModel } from '../../../models/bien.model';
import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { BienService } from '../../../providers/proyecto/bien/bien.service';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';


@Component({
  selector: 'app-bienes-component',
  templateUrl: './bien.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [BienService, Common, NgbCumstonDateParserFormatter],
  entryComponents: [Confirm2Component]
})
export class BienComponent implements OnInit {
  frmBien: FormGroup;
  showForm = false;
  isNew = false;
  bienes: BienModel[];
  bien: BienModel;
  ids: ParamsModel;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private service: BienService,
    private route: ActivatedRoute,
    private ds: NgbCumstonDateParserFormatter
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
    this.frmBien = this.formBuilder.group({
        proveedor: ['', Validators.required],
        descripcion: ['', Validators.required],
        cantidad: [null, Validators.required],
        importe: [null, Validators.required],
        fecha: [null, Validators.required]
    });
    this.initialize();
  }

  initialize() {
    this.isNew = false;
    this.showForm = false;
    this.service.all().subscribe((resp) => {
      this.bienes = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  add() {
    this.bien = new BienModel();
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = true;
  }

  onSubmit() {
    if (this.isNew) {
      this.create();
    } else {
      this.edit();
    }
  }

  onEdit(item) {
    this.bien = item;
    this.generateForm();
    this.showForm = !this.showForm;
    this.isNew = false;
  }

  openModalRemove(item): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Bienes';
    modalRef.componentInstance.message = `¿Desea eliminar el bien del proveedor ${item.proveedor}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  create() {
    const bien = new BienModel(this.frmBien.value);
    this.service.post(bien).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const bien = Object.assign(this.bien, this.frmBien.value);
    this.service.put(bien._id, bien).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(bien) {
    this.service.delete(bien._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.bienes && this.bienes.length === 0;
  }
  private generateForm() {
    this.frmBien.patchValue(this.bien);
  }
}
