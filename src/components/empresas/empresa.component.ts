import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { EmpresaModel } from '../../models/empresa.model';
import { Common } from '../../providers/common/common';
import { EmpresaService } from '../../providers/empresa/empresa.service';
import { AlertComponent, IAlert } from '../shared/alert/alert.component';
import { Confirm2Component } from '../shared/confirm2/confirm.component';


@Component({
  selector: 'app-empresas-component',
  templateUrl: './empresa.component.html',
  styleUrls: ['../proyectos/proyectos.component.css'],
  providers: [EmpresaService, Common],
  entryComponents: [Confirm2Component]
})
export class EmpresasComponent implements OnInit {
  frmCompany: FormGroup;
  empresa: EmpresaModel;
  empresas: EmpresaModel[];
  isNewCompany = false;
  isEdit = false;
  alert: IAlert;
  alertComponent = new AlertComponent();
  showAlert = false;
  navigationSubscription: Subscription;
  empresaId: string;
  constructor(private common: Common,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private service: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    this.initialize();
    this.frmCompany = this.formBuilder.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion_fiscal: ['', Validators.required],
      tfno: ['', Validators.required]
    });
  }
  // initialize() {
  //   this.service.all().subscribe((resp) => {
  //     if (resp.length === 0) {
  //       this.showAlert = true;
  //       this.alert = this.alertComponent.getAlert(2);
  //     } else {
  //       this.showAlert = false;
  //       this.empresas = resp;
  //     }
  //   }, (err) => {
  //     this.common.handlerResponse(err.value || err);
  //   });
  // }
  initialize() {
    this.empresaId = JSON.parse(sessionStorage.getItem('user')).empresa;
    this.service.get(this.empresaId).subscribe((resp) => {
      this.empresa = resp;
      this.frmCompany.patchValue(this.empresa);
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
  addNewCompany() {
    this.empresa = new EmpresaModel();
    // this.frmCompany.patchValue(new EmpresaModel());
    this.isNewCompany = !this.isNewCompany;
    this.showAlert = false;
  }

  onSubmit() {
    if (!this.empresa._id) {
      this.create();
    } else {
      this.edit();
    }
    this.isNewCompany = !this.isNewCompany;
    this.empresa = new EmpresaModel();
  }
  editCompany(item) {
    this.empresa = item;
    this.isNewCompany = !this.isNewCompany;
    this.frmCompany.patchValue(item);
    this.isEdit = true;
  }
  openModalRemove(item: EmpresaModel): void {
    const modalRef = this.modal.open(Confirm2Component);
    modalRef.componentInstance.title = 'Eliminar Empresa';
    modalRef.componentInstance.message = `¿Desea eliminar empresa ${item.nombre}?`;
    modalRef.result.then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  create() {
    this.service.post(this.frmCompany.value).subscribe((resp) => {
      this.common.toastr.success('Organizacion creada!', 'Success!', { timeOut: 3000 });
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  edit() {
    const company = Object.assign(this.empresa, this.frmCompany.value);
    this.service.put(company._id, company).subscribe((resp) => {
      this.isEdit = !this.isEdit;
      this.common.toastr.success('Organizacion guardada!', 'Success!', { timeOut: 3000 });
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }

  delete(company) {
    this.service.delete(company._id).subscribe((resp) => {
      this.initialize();
    }, (err) => {
      this.common.handlerResponse(err.value || err);
    });
  }
}
