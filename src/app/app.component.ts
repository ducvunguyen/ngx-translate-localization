
import { Component } from '@angular/core';
import {I18nService, Lang, Language} from "translate-localization";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: Language<Lang>[] =  [
    {
      label: 'Tiếng việt',
      lang: 'vi',
      flag: 'assets/svgs/vietnam-flag-icon.svg'
    },
    {
      label: 'English',
      lang: 'en',
      flag: 'assets/svgs/united-kingdom-flag-icon.svg'
    },
  ];

  param = {name: 'ABC', job: "CDF"};

  constructor(private i18n : I18nService) {
    i18n.useDefaultLang();
  }

  handleChangeLang(lang: Lang){
    if (this.i18n.lang != lang)
      this.i18n.use(lang)
  }

  translate(){
    console.log(this.i18n.translate('users.message', this.param));
  }
}
