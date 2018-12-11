import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class NgbCumstonDateParserFormatter extends NgbDateParserFormatter {
  private momentFormat  = 'DD/MM/YYYY';
  constructor() {
    super();
  }

  parse(date: string): NgbDateStruct {
    if (!date) {
      return null;
    }
    const d = moment(date, this.momentFormat);
    return d.isValid() ? {
      year: d.year(),
      month: d.month() + 1,
      day: d.date()
    } : null;
  }

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const d = moment({
      year: date.year,
      month: date.month - 1,
      date: date.day
    });
    return d.isValid() ? d.format(this.momentFormat) : '';
  }
}
