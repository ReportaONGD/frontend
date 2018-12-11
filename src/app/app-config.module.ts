import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<string>('app.config');

export class AppConfig  {
  apiEndpoint: string;
};

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
