import {Inject, Pipe, PipeTransform} from '@angular/core';
import {I18nService} from "./i18n.service";
import {HashMap} from "./type";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {
  }
  transform(value: string, params?: HashMap) {
    return this.i18n.translate(value, params);
  }
}
