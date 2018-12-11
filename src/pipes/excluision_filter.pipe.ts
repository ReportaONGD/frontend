import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'app_exclusion_filter',
  pure: false
})
export class ExclusiomnFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(model: any, filter: any): boolean {
    return model._id !== filter;
  }
}
