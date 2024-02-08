# TranslateLocalization

  Install: npm i translate-localization

## Guide basic

[//]: # (note)

```
📦src
 ┣ 📂app
 ┣  ...
 📦assets
 ┣ 📂i18n
 ┣ ┣ 📜vi.json
 ┣ ┣ 📜en.json
```
  <h4>app.module.ts.</h4>

  <small>
    Note: Root is a basic setup that reads language files in the assets/i18n folder. You can ignore root and can set up another 
    folder in the i18n folder ( <b>asset/i18n/users and assets/i18n/buttons </b> )
    for example ['users', 'buttons'] then the language file of you will be reading from the users and buttons folder.
  </small>

    import {II18nConfig, Lang} from "translate-localization";
    import {I18nModule} from "translate-localization";

    const CONFIG_I18N : II18nConfig<Lang> ={
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

<br/>
<h4> Change language </h4>

    import {I18nService, Lang} from "translate-localization";

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

      constructor(private i18: I18nService) {}

      handleChangeLang(lang: Lang){
        if (this.i18.lang != lang)
          this.i18.use(lang)
      }
    }


## Guide advanced
If you load multiple folders then your array is
['root', 'buttons', 'users'] and you can ignore root : ['buttons', 'users'].

    const CONFIG_I18N : II18nConfig<Lang> ={
      folders: ['root', 'buttons', 'users'], // load file langauges in i18n
      defaultLanguage: 'vi',
      languages: [...]
    }

```
📦src
 ┣ 📂app
 ┣  ...
 📦assets
 ┣  📂i18n
 ┣  ┣  📂buttons
 ┣  ┣  ┣ 📜 vi.json
 ┣  ┣  ┣ 📜 en.json
 ┣  ┣  📂users
 ┣  ┣  ┣ 📜 vi.json
 ┣  ┣  ┣ 📜 en.json
 ┣  ┣  📜 vi.json
 ┣  ┣  📜 en.json
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

<br/>
<h4> translate(): Returns the language for which you defined the key in the json file. </h4>

```
📦assets
┣  📂i18n
┣  ┣  📂buttons
┣  ┣  ┣ 📜 vi.json
┣  ┣  ┣ 📜 en.json
```

    constructor(private i18: I18nService) {}

    ngOnInit(){
      console.log(this.i18.translate('buttons.button_add'))
    }
<br/>
<h4>lang: This property get current value your country (vi or en ...)</h4>

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
  * use(lang: Lang): Change language. (Lang: 'en' | 'fr' | 'de' | 'es' | 'af' | 'sq'....)
* pipe
  * asyncTranslate: async translate lang
  * translate: translate lang (need load page when you choose other lang).
