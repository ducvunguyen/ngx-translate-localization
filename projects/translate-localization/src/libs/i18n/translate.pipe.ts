import {Inject, Pipe, PipeTransform} from '@angular/core';
import {I18nService} from "./i18n.service";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(I18nService) private i18nService: I18nService) {
  }
  transform(value: string): unknown {
    let keys = value.split('.'),
      result: any = this.i18nService.instance();

    keys.forEach(key => {
      result = result[key];
    });
    return result;
  }
}
