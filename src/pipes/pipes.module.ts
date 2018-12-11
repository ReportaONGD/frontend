import { NgModule } from '@angular/core';
// PROVIDERS
import { AppFilterPipe } from './app_filter.pipe';
import { BankAccountFormatPipe } from './bank_account_format.pipe';
import { EmbededObjectFilterByNombrePipe } from './embeded_object_filter_by_nombre.pipe';
import { ExclusiomnFilterPipe } from './excluision_filter.pipe';
import { GroupByPipe } from './group_by.pipe';
import { KeysPipe } from './keys_filter.pipe';
import { SumPipe } from './keys_sum.pipe';

@NgModule({
  declarations: [
    AppFilterPipe,
    EmbededObjectFilterByNombrePipe,
    KeysPipe,
    SumPipe,
    BankAccountFormatPipe,
    GroupByPipe,
    ExclusiomnFilterPipe
  ],
  exports: [
    AppFilterPipe,
    EmbededObjectFilterByNombrePipe,
    KeysPipe,
    BankAccountFormatPipe,
    SumPipe,
    ExclusiomnFilterPipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
