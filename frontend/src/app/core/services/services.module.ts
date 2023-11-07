import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from './app-config/app-config.service';

export function loadEnvironment(config: AppConfigService) {
  return () => config.loadEnvironment();
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ServicesModule {
  constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        // service
        AppConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: loadEnvironment,
          deps: [AppConfigService],
          multi: true,
        },
      ],
    };
  }
}
