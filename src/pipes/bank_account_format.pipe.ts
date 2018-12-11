import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'bank-account-format-pipe'})
export class BankAccountFormatPipe implements PipeTransform {
  private BANK_ACCOUNT_SEPARATOR = '-';
  transform(value: string): string {
    let bank_account = '';
    if (value.length === 4 || value.length === 9 || value.length === 14 || value.length === 17) {
      bank_account = value + this.BANK_ACCOUNT_SEPARATOR;
    } else {
      bank_account = value;
    }
    return bank_account;
  }
}
