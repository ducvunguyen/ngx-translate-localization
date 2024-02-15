import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import {I18nService} from "./i18n.service";
import {II18nConfig} from "./i18n-config";
import { AsyncTranslatePipe } from './async-translate.pipe';
import TOKEN_I18N_CONFIG from "./token-i18n";
@NgModule({
  declarations: [
    TranslatePipe,
    AsyncTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe,
    AsyncTranslatePipe
  ]
})
export class I18nModule {
  static forRoot(config: II18nConfig): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        I18nService,
        {
          provide: TOKEN_I18N_CONFIG,
          useValue: config,
        }
      ]
    }
  }
}
