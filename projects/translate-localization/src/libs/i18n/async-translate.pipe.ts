import { Pipe, PipeTransform } from '@angular/core';
import {map, Observable} from "rxjs";
import {I18nService} from "./i18n.service";
import {HashMap} from "./type";

@Pipe({
  name: 'asyncTranslate'
})
export class AsyncTranslatePipe implements PipeTransform {

  constructor(private i18n: I18nService) {}
  transform(value: string, params?: HashMap) {
    return new Observable(subscriber => {
      this.i18n.data.subscribe(() => {
        const result = this.i18n.translate(value, params);
        subscriber.next(result);
      });
    })
  }
}
