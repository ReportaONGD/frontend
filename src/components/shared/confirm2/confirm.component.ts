import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm.html',
})
export class Confirm2Component implements OnInit {
  header: string;
  message: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  public ngOnInit(): void {
  }

  onClose(result) {
    this.activeModal.close(result);
  }

  onDismiss() {
    this.activeModal.close();
  }
}
