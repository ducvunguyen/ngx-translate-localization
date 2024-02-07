
import { Component } from '@angular/core';
import {I18nService} from "translate-localization";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-translate-localization';
  constructor(private i18n : I18nService) {
    i18n.useDefaultLang();
  }
}
