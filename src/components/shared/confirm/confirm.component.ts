import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component ({
  selector: 'app-confirm',
  templateUrl: './confirm.html',
})
export class ConfirmComponent implements OnInit {
  @Input() activeModal: any;
  @Input() item: any = {};
  @Output() click = new EventEmitter();
  constructor() {
  }
  public ngOnInit(): void  {
  }
  delete(event: Event): void  {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit(this.item);
  }
  close(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.activeModal.close();
  }
}
