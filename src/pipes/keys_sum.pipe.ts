import { Utils } from './../utils/utils';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'sumas'})
export class SumPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    const keys = [];
    let moneda = '';
    let valor = 0;
    items.forEach(element => {
      for (const key of Object.keys(element)) {
        if (typeof(element[key]) === 'number') {
          valor += element[key];
        } else {
          moneda = element[key];
        }
      }
    });
    keys.push({ key: filter, value: `${Utils.formatMoney(valor)} ${moneda}`});
    return keys;
  }
}
