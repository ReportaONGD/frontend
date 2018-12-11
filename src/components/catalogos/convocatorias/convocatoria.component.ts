import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConvocatoriaModel } from '../../../models/convocatoria.model';
import { ConvocatoriaService } from '../../../providers/catalogos/convocatoria.service';
import { Common } from '../../../providers/common/common';
import { Confirm2Component } from '../../shared/confirm2/confirm.component';
import { ConvocatoriaFormComponent } from './convocatoria_form.component';


@Component({
    selector: 'app-convocatoria-component',
    templateUrl: './convocatoria.component.html',
    providers: [ConvocatoriaService, Common],
    entryComponents: [ConvocatoriaFormComponent]
})
export class ConvocatoriaComponent implements OnInit {
    convocatorias: ConvocatoriaModel[];
    filter: ConvocatoriaModel = new ConvocatoriaModel();
    constructor(
        private modal: NgbModal,
        private service: ConvocatoriaService,
        private common: Common) {
        this.convocatorias = new Array<ConvocatoriaModel>();
    }

    ngOnInit() {
        this.initialize();
    }

    showAlert() {
        return this.convocatorias && this.convocatorias.length === 0;
    }

    initialize(): void {
        this.service.all().subscribe(resp => {
            this.convocatorias = resp;
        }, (err) => {
            this.common.handlerResponse(err.value || err);
        });
    }

    onEdit(item): void {
        this.openModal(item);
    }

    onNew(): void {
        this.openModal(new ConvocatoriaModel(), true);
    }

    onDelete(item): void {
        this.openModalConfirm(item);
    }

    private delete(item): void {
        this.service.delete(item._id).subscribe((resp) => {
            this.initialize();
        }, (err) => {
            this.common.handlerResponse(err.value || err);
        });
    }

    private openModal(convocatoria, isNew = false): void {
        const modalRef = this.modal.open(ConvocatoriaFormComponent);
        const text = isNew ? 'Nuevo' : 'Edición';
        modalRef.componentInstance.title = `${text} Convocatoria`;
        modalRef.componentInstance.convocatoria = convocatoria;
        modalRef.componentInstance.isNew = isNew;
        modalRef.result.then((result) => {
            if (result) {
                this.initialize();
            }
        });
    }

    private openModalConfirm(convocatoria): void {
        const modalRef = this.modal.open(Confirm2Component);
        modalRef.componentInstance.title = 'Eliminar Financiador';
        modalRef.componentInstance.message = `¿Desea eliminar el Financiador ${convocatoria.nombre}?`;

        modalRef.result.then((result) => {
            if (result) {
                this.delete(convocatoria);
            }
        });
    }
}
