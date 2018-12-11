import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    let type: any;
    // tslint:disable-next-line:forin
    for (const key in value) {
      let display = true;
      let item;
      type = typeof(value[key]);
      if (key === 'fecha_inicio' || key === 'fecha_fin') {
        type = 'Date';
      }
      if (key !== '__v') {
        if (key === '_id' || key === 'password' || key === 'empresa') {
          display = false;
        }

        if (type === 'object' && value[key]) {
          item = {
            key: value[key]._id,
            value: value[key].nombre
          };
        }
        keys.push({key: key, value: value[key], display: display, type: type, item: item});
      }
    }
    return keys;
  }
}
