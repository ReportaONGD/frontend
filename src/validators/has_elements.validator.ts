import { AbstractControl, ValidatorFn } from '@angular/forms';

export class HasElementsValidator {
  static hasLenght(field: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.root.get(field)) {
        const array = c.root.get(field).value;
        if (array !== null && array.length > 0) {
            return null;
        }
        return validatorField;
      } else {
        return validatorField;
      }
    };
  }
}
