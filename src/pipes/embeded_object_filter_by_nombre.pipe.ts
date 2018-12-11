import { Pipe, PipeTransform } from '@angular/core';
import { AppFilterPipe } from './app_filter.pipe';



@Pipe({
  name: 'embeded_object_filter_by_nombre',
  pure: false
})
export class EmbededObjectFilterByNombrePipe extends AppFilterPipe implements PipeTransform {
  applyFilterObject(field, filter): boolean {
    const nombre = (field ? field.nombre : '');
    return this.applyFilterString(nombre, filter);
  }
}
