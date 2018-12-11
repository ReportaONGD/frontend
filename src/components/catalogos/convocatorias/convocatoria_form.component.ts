import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConvocatoriaModel } from '../../../models/convocatoria.model';
import { ConvocatoriaService } from '../../../providers/catalogos/convocatoria.service';
import { Common } from '../../../providers/common/common';

@Component({
    selector: 'app-convocatoria-form-component',
    styleUrls: ['../../proyectos/proyectos.component.css'],
    templateUrl: './convocatoria_form.component.html'
})
export class ConvocatoriaFormComponent implements OnInit {
    frmConvocatoria: FormGroup;
    convocatoria: ConvocatoriaModel;
    convocatorias: ConvocatoriaModel[];
    isNew: boolean;
    title: string;
    constructor(
        private formBuilder: FormBuilder,
        private service: ConvocatoriaService,
        public activeModal: NgbActiveModal,
        private common: Common) {
        this.isNew = false;
        this.frmConvocatoria = this.formBuilder.group({
            codigo: ['', Validators.required],
            nombre: ['', Validators.required],
            financiador: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        if (!this.isNew) {
            this.frmConvocatoria.patchValue(this.convocatoria);
        }
        this.service.all().subscribe(resp => {
            this.convocatorias = resp;
        }, (err) => {
            this.common.handlerResponse(err.value || err);
        });
    }

    onSubmit() {
        if (this.isNew) {
            this.create();
        } else {
            this.update();
        }
    }

    onClose(result?: boolean) {
        if (result) {
            this.activeModal.close(true);
        } else {
            this.activeModal.close();
        }
    }

    create() {
        if (this.comprobarSiExiste(this.frmConvocatoria.controls.codigo.value)) {
            this.service.post(this.frmConvocatoria.value).subscribe((resp) => {
                this.onClose(true);
            }, (err) => {
                this.common.handlerResponse(err.value || err);
            });
        } else {
            this.common.toastr.error('Ya existe una convocatoria con ese código!', 'Error!', { timeOut: 3000 });
        }
    }

    update() {
        const convocatoria = Object.assign(this.convocatoria, this.frmConvocatoria.value);
        if (this.comprobarSiExiste(convocatoria.codigo)) {
            this.service.put(convocatoria._id, convocatoria).subscribe((resp) => {
                this.onClose(true);
            }, (err) => {
                this.common.handlerResponse(err.value || err);
            });
        } else {
            this.common.toastr.error('Ya existe una convocatoria con ese código!', 'Error!', { timeOut: 3000 });
        }
    }

    comprobarSiExiste(valor) {
        const result = this.convocatorias.filter(cat => cat.codigo.toLocaleLowerCase() === valor.toLocaleLowerCase());
        if (result && result.length > 0) {
            return false;
        }
        return true;
    }
}
