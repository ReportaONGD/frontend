import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalizacionModel } from '../../../models/localizacion.model';
import { LocalizacionService } from '../../../providers/catalogos/localizacion.service';
import { Common } from '../../../providers/common/common';

@Component({
  selector: 'app-localizacion-form-component',
  templateUrl: './localizacion_form.component.html',
  styleUrls: ['../../proyectos/proyectos.component.css']
})
export class LocalizacionFormComponent implements OnInit {
  frmLocalizacion: FormGroup;
  localizacion: LocalizacionModel;
  localizaciones: LocalizacionModel[];
  isNew: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private localizacionService: LocalizacionService,
    public activeModal: NgbActiveModal,
    private common: Common) {
    this.isNew = false;
  }

  ngOnInit(): void {
    this.frmLocalizacion = this.formBuilder.group({
      valor: [this.localizacion.valor ? this.localizacion.valor : null, Validators.required]
    });
    this.localizacionService.all().subscribe(resp => {
      this.localizaciones = resp;
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
    if (this.comprobarSiExiste(this.frmLocalizacion.controls.valor.value)) {
      this.localizacionService.post(this.frmLocalizacion.value).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe el valor!', 'Error!', { timeOut: 3000 });
    }
  }

  update() {
    const localizacion = Object.assign(this.localizacion, this.frmLocalizacion.value);
    if (this.comprobarSiExiste(localizacion.valor)) {
      this.localizacionService.put(localizacion._id, localizacion).subscribe((resp) => {
        this.onClose(true);
      }, (err) => {
        this.common.handlerResponse(err.value || err);
      });
    } else {
      this.common.toastr.error('Ya existe el valor!', 'Error!', { timeOut: 3000 });
    }
  }

  comprobarSiExiste(valor) {
    const result = this.localizaciones.filter(cat => cat.valor.toLocaleLowerCase() === valor.toLocaleLowerCase());
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }

}
