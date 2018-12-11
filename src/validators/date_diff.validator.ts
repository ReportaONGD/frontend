import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbCumstonDateParserFormatter } from '../providers/dateStruct/dateParseFormatter';

export class DateDiffValidator {
  static dateLessThan(formGroup: string, dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    const formatter = new NgbCumstonDateParserFormatter();
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let date1;
      let date2;
      if (formGroup) {
        if (c.root.get(formGroup)) {
          if ((c.root.get(formGroup).get(dateField1) && c.root.get(formGroup).get(dateField2)) &&
            (c.root.get(formGroup).get(dateField1).value && c.root.get(formGroup).get(dateField2).value)) {
            const nbdD1 = c.root.get(formGroup).get(dateField1).value;
            const nbdD2 = c.root.get(formGroup).get(dateField2).value;
            date1 = new Date(nbdD1.year, nbdD1.month - 1, nbdD1.day);
            date2 = new Date(nbdD2.year, nbdD2.month - 1, nbdD2.day);
            if ((date1 !== null && date2 !== null) && date1 > date2) {
              return validatorField;
            }
            return null;
          } else {
            return null;
          }
        }

      } else {
        if ((c.root.get(dateField1) && c.root.get(dateField2))
          && (c.root.get(dateField1).value && c.root.get(dateField2).value)) {
          const nbdD1 = c.root.get(dateField1).value;
          const nbdD2 = c.root.get(dateField2).value;
          date1 = new Date(nbdD1.year, nbdD1.month - 1, nbdD1.day);
          date2 = new Date(nbdD2.year, nbdD2.month - 1, nbdD2.day);
          if ((date1 !== null && date2 !== null) && date1 > date2) {
            return validatorField;
          }
          return null;
        } else {
          return null;
        }
      }
    };
  }
}
