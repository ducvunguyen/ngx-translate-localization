# TranslateLocalization

  Install: npm i @ngneat/transloco

## Guide basic

[//]: # (note)
If ['root'] => <small>const CONFIG_I18N : II18nConfig<T_Lang> ={ folders: ['root'] } read file lang in folder i18n.</small>

```
📦src
 ┣ 📂app
 ┣ ...
 📦assets
 ┣ 📂i18n
 ┣ ┣ 📜vi.json
 ┣ ┣ 📜en.json
```
  <h4>app.module.ts.</h4>

    import {II18nConfig, T_Lang} from "translate-localization";
    import {I18nModule} from "translate-localization";

    const CONFIG_I18N : II18nConfig<T_Lang> ={
      folders: ['root'], // load file langauges in i18n
      defaultLanguage: 'vi',
      languages: [{
        label: 'Tiếng việt',
        lang: 'vi',
        flag: 'assets/svgs/vietnam-flag-icon.svg' //icon language
      },
      {
        label: 'English',
        lang: 'en',
        flag: 'assets/svgs/united-kingdom-flag-icon.svg'
      }]
    }

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

## Change language
    import {I18nService, T_Lang} from "translate-localization";
    import CONFIG_I18N from "core/configs/i18n-config";
    import animations, {AnimationState} from "./animation";

    @Component({
      selector: 'app-index',
      template: `
          <button (click)="handleChangeLang(item.lang)" *ngFor="let item of languages" >
            <img [src]="item.flag" alt="" style="width: 12px; height: 12px" />
            {{item.label}}
          </button>
      `
      changeDetection: ChangeDetectionStrategy.OnPush,
    })

    export class IndexComponent {
      // readonly languages = CONFIG_I18N.languages;
      readonly languages = [{
          label: 'Tiếng việt',
          lang: 'vi',
          flag: 'assets/svgs/vietnam-flag-icon.svg' //icon language
        },
        {
          label: 'English',
          lang: 'en',
          flag: 'assets/svgs/united-kingdom-flag-icon.svg'
        }
      ]

      constructor(@Inject(GLOBAL_STATE)
                  private i18: I18nService) {}

      handleChangeLang(lang: T_Lang){
        if (this.i18.lang != lang)
          this.i18.use(lang)
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

## translate(): Returns the language for which you defined the key in the json file.
    constructor(private i18: I18nService) {}

    ngOnInit(){
      console.log(this.i18.translate('users.button_add'))
    }

## lang: <small> get current your country (vi or en ...);</small>
    constructor(private i18: I18nService) {}
    ngOnInit(){
      console.log(this.i18.lang)
    }

## API

[//]: (note)
* I18nService
  * lang: The return value is the national language. ('en' | 'fr' | 'de' | 'es' | 'af' | 'sq'....)
  * translate(key: string): Return language and use in file your.ts;
  * useDefaultLang(): Init language in app.component.
  * use(lang: T_Lang): Change language. (T_Lang: 'en' | 'fr' | 'de' | 'es' | 'af' | 'sq'....)
* pipe
  * asyncTranslate: async translate lang
  * translate: translate lang (need load page when you choose other lang).
