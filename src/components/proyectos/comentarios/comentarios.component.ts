import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ParamsModel } from '../../../models/params.model';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { ComentarioModel } from '../../../models/comentario.model';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';


@Component({
  selector: 'app-comentarios-component',
  templateUrl: './comentarios.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common],
  entryComponents: [Confirm2Component]
})
export class ComentariosComponent implements OnInit {
  frmComentario: FormGroup;
  comentario: ComentarioModel;
  comentarios: ComentarioModel[];
  isNew = false;
  isEdit = false;
  service: BaseServiceInterface;
  ids: ParamsModel;
  constructor(private common: Common,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private ds: NgbCumstonDateParserFormatter
  ) {
  }

  ngOnInit() {
    this.service.ids = this.ids;
    this.all();
    this.frmComentario = this.formBuilder.group({
        texto: ['' ? this.comentario.texto : null, Validators.required],
        fecha: [null ? this.comentario.fecha : null, Validators.required],
      });
  }
  /**
   * Metodo para controlar el alta de una comentario
   */
  addNew() {
    this.isNew = !this.isNew;
    this.comentario = new ComentarioModel();
  }

  /**
   * Evento submit del formulario de alta/edicion de una comentario
   */
  onSubmit() {
    if (!this.comentario._id) {
      this.create();
    } else {
      this.edit();
    }
    this.isNew = !this.isNew;
    this.comentario = new ComentarioModel();
  }

  /**
   * Peticion a servidor para la creacion de una comentario
   */
  create() {
    this.service.post(new ComentarioModel(this.frmComentario.value)).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la edicion de una comentario
   */
  edit() {
    const comentario = new ComentarioModel(Object.assign(this.comentario, this.frmComentario.value));
    this.service.put(comentario._id, comentario).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
  * Peticion a servidor para la eliminacion de una comentario
  * @param comentario comentario a eliminar
  */
  delete(comentario) {
    this.service.delete(comentario._id).subscribe((resp) => {
      this.all();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  showAlert() {
    return this.comentarios && this.comentarios.length === 0;
  }

  /**
   * Abre un modal de confirmación para la eliminación de una comentario
   * @param item entidad a eliminar
   */
  openModalRemove(item: ComentarioModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Comentario';
    modalRef.componentInstance.message = `¿Desea eliminar el Comentario ${item.texto}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  /**
  * Habilita la edición de una comentario
  * @param item comentario a editar
  */
  onEdit(item) {
    this.comentario = item;
    this.generateForm();
    // HAY que mirar esto
    // this.dateStructMod = this.pd.parse(this.comentario.fecha);
    this.isNew = !this.isNew;
    this.isEdit = true;
  }

  /**
   * Cancela la edicion de una comentario
   */
  cancel() {
    this.comentario = new ComentarioModel();
    this.isNew = false;
  }
  close() {
    this.activeModal.close();
  }
  /**
  * Obtiene todas las modificaciones de un proyecto
  */
  all() {
    this.service.all().subscribe((resp) => {
      this.comentarios = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private generateForm() {
    this.frmComentario.patchValue(this.comentario);
  }
}
