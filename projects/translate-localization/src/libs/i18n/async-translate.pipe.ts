import { Pipe, PipeTransform } from '@angular/core';
import {map, Observable} from "rxjs";
import {I18nService} from "./i18n.service";

@Pipe({
  name: 'asyncTranslate'
})
export class AsyncTranslatePipe implements PipeTransform {

  constructor(private i18: I18nService) {
  }
  transform(value: string) {
    const keys = value.split('.');
    return this.i18.data.pipe(map(data => {
      let result = data;
      keys.forEach(key => result = result[key]);
      return result
    }))
  }
}
