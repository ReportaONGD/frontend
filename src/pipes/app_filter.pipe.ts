import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'app_filter',
  pure: false
})
export class AppFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  /**
   * Configuración del filtro.
   *
   * @param {model} model el model a comparar con el filtro.
   * @param {model} filter The filter to apply.
   * @return {boolean} True si el model satisface el filtro, false si no.
   */
  applyFilter(model: any, filter: any): boolean {
    for (const field in filter) {
      if (filter[field] !== null && filter[field] !== '') {
        if (model[field] !== null && model[field] !== '') {
          return this.applyFilterProxy(model[field], filter[field]);
        }
      }
    }
    return true;
  }

  applyFilterProxy(field, filter): boolean {
    if (typeof field === 'string') {
      return this.applyFilterString(field, filter);
    } else if (typeof field === 'number') {
      return this.applyFilterNumber(field, filter);
    } else if (typeof field === 'boolean') {
      return this.applyFilterBoolean(field, filter);
    } else if (typeof field === 'object') {
      return this.applyFilterObject(field, filter);
    }
  }

  applyFilterString(field, filter): boolean {
    return (field.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }

  applyFilterNumber(field, filter): boolean {
    return (field === filter);
  }

  applyFilterBoolean(field, filter): boolean {
    if (typeof filter === 'string') {
      return field.toString() === filter;
    }else {
      return (field === filter);
    }
  }

  applyFilterObject(field, filter): boolean {
    return true;
  }
}
