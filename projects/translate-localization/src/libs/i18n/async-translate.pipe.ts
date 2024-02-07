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
    return new Observable(subscriber => {
      this.i18.data.subscribe(data => {
        let result = data;
        if (result)
          subscriber.next(value);

        keys.forEach(key => {
          if (key in result)
            result = result[key];

        });
        subscriber.next(result);
      });
    })
  }
}
