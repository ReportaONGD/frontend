
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { BankAccountFormatPipe } from '../pipes/bank_account_format.pipe';

@Directive({
    selector: '[appBankAccountFormat]'
  })
export class BankAccountFormatDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private baPipe: BankAccountFormatPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.baPipe.transform(this.el.value);
  }

  @HostListener('keydown', ['$event.target.value', '$event'])
  keyDown(value, event) {
    if (event.keyCode !== 46 && event.keyCode !== 8) {
      this.el.value = this.baPipe.transform(value); // opossite of transform
    }
  }
}
