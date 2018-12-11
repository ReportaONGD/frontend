import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedidaModel } from '../../../models/medida.model';
import { ParamsModel } from '../../../models/params.model';
import { BaseServiceInterface } from '../../../providers/base/base.service';
import { Common } from '../../../providers/common/common';
import { NgbCumstonDateParserFormatter } from '../../../providers/dateStruct/dateParseFormatter';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';



@Component({
  selector: 'app-medidas-component',
  templateUrl: './medidas.component.html',
  styleUrls: ['../proyectos.component.css'],
  providers: [Common],
  entryComponents: [Confirm2Component]
})
export class MedidasComponent implements OnInit {
  frmMedida: FormGroup;
  medida: MedidaModel;
  medidas: MedidaModel[];
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
    this.initForm();
  }

  /**
   * Metodo para controlar el alta de una medida
   */
  addNew() {
    this.isNew = !this.isNew;
    this.medida = new MedidaModel();
  }

  /**
   * Evento submit del formulario de alta/edicion de una medida
   */
  onSubmit() {
    if (!this.medida._id) {
      this.create();
    } else {
      this.edit();
    }
    this.isNew = !this.isNew;
    this.medida = new MedidaModel();
  }

  /**
   * Peticion a servidor para la creacion de una medida
   */
  create() {
    this.service.post(new MedidaModel(this.frmMedida.value)).subscribe((resp) => {
      this.ngOnInit();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Peticion a servidor para la edicion de una medida
   */
  edit() {
    const medida = new MedidaModel(Object.assign(this.medida, this.frmMedida.value));
    this.service.put(medida._id, medida).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.ngOnInit();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
  * Peticion a servidor para la eliminacion de una medida
  * @param medida medida a eliminar
  */
  delete(medida) {
    this.service.delete(medida._id).subscribe((resp) => {
      this.ngOnInit();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  /**
   * Abre un modal de confirmación para la eliminación de una medida
   * @param item entidad a eliminar
   */
  openModalRemove(item: MedidaModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Medida';
    modalRef.componentInstance.message = `¿Desea eliminar el Comentario ${item.valor}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }

  /**
  * Habilita la edición de una medida
  * @param item medida a editar
  */
  onEdit(item) {
    this.medida = item;
    this.generateForm();
    // HAY que mirar esto
    // this.dateStructMod = this.pd.parse(this.medida.fecha);
    this.isNew = !this.isNew;
    this.isEdit = true;
  }

  showAlert() {
    return this.medidas && this.medidas.length === 0;
  }

  /**
   * Cancela la edicion de una medida
   */
  cancel() {
    this.medida = new MedidaModel();
    this.isNew = false;
    this.initForm();
  }
  close() {
    this.activeModal.close();
  }
  /**
  * Obtiene todas las modificaciones de un proyecto
  */
  private all() {
    this.service.all().subscribe((resp) => {
      this.medidas = resp;
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  private initForm() {
    this.frmMedida = this.formBuilder.group({
      valor: [null, Validators.required],
      comentario: [''],
      fecha: [null, Validators.required],
    });
  }

  private generateForm() {
    this.frmMedida.patchValue(this.medida);
  }
}
