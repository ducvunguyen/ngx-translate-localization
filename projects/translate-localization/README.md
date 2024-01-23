# TranslateLocalization

  install: npm i @ngneat/transloco

## Guide Basic

<h4> 
  Create file i18n-config.ts 
</h4>

[//]: # (note)
* <small>const CONFIG_I18N : II18nConfig<T_Lang> ={ folders: ['root'] } then folder structure.</small>

```ss
📦src
 ┣ 📂app
 ┣ ...
 📦assets
 ┣ 📂i18n
 ┣ ┣ 📜vi.json
 ┣ ┣ 📜en.json
```
  
    import {II18nConfig, T_Lang} from "translate-localization";

    const CONFIG_I18N : II18nConfig<T_Lang> ={
      folders: ['root'],
      defaultLanguage: 'vi',
      languages: [{
          label: 'Tiếng việt',
          lang: 'vi',
          flag: 'assets/svgs/vietnam-flag-icon.svg'
        },
        {
          label: 'English',
          lang: 'en',
          flag: 'assets/svgs/united-kingdom-flag-icon.svg'
        },
      ]
    }
    export default CONFIG_I18N

<br/>  
<h4>
  app.module.ts. 
</h4>

    import CONFIG_I18N from "./core/configs/i18n-config";
    import {I18nModule} from "translate-localization";

    @NgModule({
    declarations: [
      AppComponent,
      TestDialogComponent
    ],
    imports: [
      I18nModule.forRoot(CONFIG_I18N)
    ],
    providers: providerRoot,
    bootstrap: [AppComponent]
    })
    export class AppModule { }


<br/>  
<h4>
  app.component.ts
</h4>

    import {I18nService} from "translate-localization";
    
    @Component({
      selector: 'app-root',
      template: `
        <p>
          <span>
            {{'title' | asyncTranslate | async}} // recommand asyncTranslate
          </span>
          Or
          <span >
          {{'title' | translate }}
          </span>
        </p>
      `
    })
    export class AppComponent {
    
      constructor(private i18nService : I18nService) {
        i18nService.useDefaultLang();
      }
    }


## Guide advanced

* If you load folders 
<small>const CONFIG_I18N : II18nConfig<T_Lang> ={ folders: ['root', 'buttons', 'users'] } then folder structure. You can ignore root folders: ['buttons', 'users'] </small>

```
📦src
 ┣ 📂app
 ┣ ...
 📦assets
 ┣ 📂i18n
 ┣ ┣ 📂buttons
 ┣ ┣ ┣📜vi.json
 ┣ ┣ ┣📜en.json
 ┣ ┣ 📜vi.json
 ┣ ┣ 📜en.json
```

    template: `
      <p>
        <span>
          {{'buttons.title' | asyncTranslate | async}} // recommand asyncTranslate
        </span>
        <span>
          {{'users.title' | asyncTranslate | async}} // recommand asyncTranslate
        </span>
        Or
        <span >
          {{'title' | translate }}
        </span>
      </p> `

## API

[//]: (note)
* I18nService
  * lang: this.i18.lang => value en or vi any language.
  * translate(value): this.i18.translate('buttons.title') => get value form json.
  * useDefaultLang(): this.i18.useDefaultLang() => Init language in app.component.
  * use(lang): this.i18.use() => change language.
* pipe
  * asyncTranslate: async translate lang
  * translate: translate lang (need load page when you choose other lang).
