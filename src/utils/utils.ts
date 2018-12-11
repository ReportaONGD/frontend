import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ParamsModel } from '../models/params.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Utils {
  static replace(text: string, replace_for: any, start_tag: string = ':', end_tag = ''): string {
    if (!replace_for) { return text; }

    let result = text;
    Object.entries<string>(replace_for).forEach(
      ([key, value]) =>
        result = result.replace(`${start_tag}${key}${end_tag}`, value)
    );
    return result;
  }

  static replaceOf(text: string, replace_for: Observable<ParamsModel>, start_tag: string = ':', end_tag = ''): string {
    if (!replace_for) { return text; }
    let result = text;
    replace_for.subscribe((p) => {
      // console.log('value:' + value);
      Object.entries(p).forEach(([key, value]) =>
        result = result.replace(`${start_tag}${key}${end_tag}`, value)
      );
    });
    return result;
  }

  static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const root = c.root;
      const date1 = root.get(dateField1);
      const date2 = root.get(dateField2);
      if (date1 !== null && date2 !== null && date1.value !== null && date2.value !== null) {
        if (new Date(date1.value.year, date1.value.month, date1.value.day) > new Date(date2.value.year, date2.value.month, date2.value.day)) {
          return validatorField;
        }
      }
      return null;
    };
  }

  // Por defecto activo
  static accionControles(form: FormGroup, controles, condicion = false) {
    const accion = condicion ? 'disable' : 'enable';
    const elementos = Object.keys(form.controls);
    elementos.forEach(key => {
      const existe = this.existeValor(controles, key, false);
      if (!existe) {
        if (condicion) {
          form.get(key).disable();
        } else {
          form.get(key).enable();
        }
      }
    });
  }

  // ValorVacio en caso de que este vacio que valor se devuelve
  // Por defecto devuelve falso = no encontrado
  static existeValor(elementos, valor, valorVacio = false) {
    let result = valorVacio;

    if (elementos.length > 0) {
      elementos.forEach((obj) => {
        if (obj === valor) {
          result = true;
        } else {
          result = false;
        }
      });
    }

    return result;
  }

  static formatMoney(amount, decimalCount = 2, decimal = ',', thousands = '.') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      // tslint:disable-next-line:radix
      const i = parseInt(amount = (Number.isInteger(amount) ? amount : Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
      const j = (i.length > 3) ? i.length % 3 : 0;

      const miles = (j ? i.substr(0, j) + thousands : '');
      const cientos = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands);
      // tslint:disable-next-line:radix
      const decimales = Number.isInteger(amount) ? '' : (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : '');
      // tslint:disable-next-line:max-line-length
      return negativeSign + miles + cientos + decimales;
    } catch (e) {
      console.log(e);
    }
  }

  // static dateLessThan(group: AbstractControl) {
  //   const f = group.get('fecha_fin');
  //   const t = group.get('fecha_inicio');
  //   if (f && t && f.value > t.value) {
  //     return { dates: 'Date from should be less than Date to' };
  //   }
  //   return null;
  // }

}
