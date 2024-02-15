# TranslateLocalization

  Install: npm i translate-localization@0.0.5

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
  <h4>en.json</h4>

    {
      "form_user": {
        "name" : "Name user",
        "email": "Email user",
        "exp_Job": "Exp job",
        "name_job" : "Name Job",
        "name_company": "Name company",
        "position": "Position",
        "income": "Income",
        "other_job" : "Other job",
        "list_address": "List address",
        "introduce": "introduce",
        "level": "level",
        "list_tech": "List tech",
        "info": "Info CV"
      },
      "title": "Form user",
      "info": "Information user",
      "button_add": "Add",
      "required": "Required",
      "minlength_4": "Lest 4 chat",
      "maxlength_8": "Not more 8 chat",
      "email": "Required email",
      "message": "Do you want to delete this {{name}} and {{job}}?"
    }

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
      defaultLanguage: 'vi'
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

      //Lang: 'en' | 'fr' | 'de' | 'es' | 'af' | 'sq' | 'am' | 'ar' | 'hy' | 'az' | 'eu' | 'be' | 'bn' | 'bs' | 'bg' | 'ca' | 'ceb' | 'ny' | 'zh' | 'co' | 'hr' | 'cs' | 'da' | 'nl' | 'eo' | 'et' | 'tl' | 'fi' | 'fy' | 'gl' | 'ka' | 'el' | 'gu' | 'ht' | 'ha' | 'haw' | 'iw' | 'hi' | 'hmn' | 'hu' | 'is' | 'ig' | 'id' | 'ga' | 'it' | 'ja' | 'jw' | 'kn' | 'kk' | 'km' | 'ko' | 'ku' | 'ky' | 'lo' | 'la' | 'lv' | 'lt' | 'lb' | 'mk' | 'mg' | 'ms' | 'ml' | 'mt' | 'mi' | 'mr' | 'mn' | 'my' | 'ne' | 'no' | 'or' | 'ps' | 'fa' | 'pl' | 'pt' | 'pa' | 'ro' | 'sm' | 'gd' | 'sr' | 'st' | 'sn' | 'sd' | 'si' | 'sk' | 'sl' | 'so' | 'su' | 'sw' | 'sv' | 'tg' | 'ta' | 'te' | 'th' | 'tr' | 'uk' | 'ur' | 'ug' | 'uz' | 'vi' | 'cy' | 'xh' | 'yi' | 'yo' | 'zu'
      readonly languages: Language<Lang>[] =  [
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

    const CONFIG_I18N : II18nConfig ={
      folders: ['root', 'buttons', 'users'], // load file langauges in i18n
      defaultLanguage: 'vi', // default language
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
      </p> `

<br/>
<h4> translate():  </h4> <small>Returns the language for which you defined the key in the json file.</small>

```
📦assets
┣  📂i18n
┣  ┣  📂buttons
┣  ┣  ┣ 📜 vi.json
┣  ┣  ┣ 📜 en.json
```
    //en.json
    {
      "button_add": "Add",
      "message": "Do you want to delete this {{name}} and {{job}}?"
    } 
    
    //app.component.ts
    constructor(private i18: I18nService) {}

    ngOnInit(){
      console.log(this.i18.translate('buttons.button_add')) output >> Add

      console.log(this.i18.translate('buttons.message', {name: 'ABC', job: 'CDF'})) output >> Do you want to delete this ABC and CDF?
    }

<br/>
<h4>lang: </h4> <small>This property get current value your country (vi or en ...)</small>

    constructor(private i18: I18nService) {}
    ngOnInit(){
      console.log(this.i18.lang) // output vi or en ...
    }

<br/>
<h4>Pipe asyncTranslate</h4>

     //en.json
    {
      "button_add": "Add",
      "message": "Do you want to delete this {{name}} and {{job}}?"
    } 

    <div>
      {{'users.message' | asyncTranslate: param | async}} output >> Do you want to delete this ABC and CDF?

      {{'users.button_add' | asyncTranslate}} output >> Add
    </div>


## API

[//]: (note)
* I18nService
  * lang: The return value is the national language. ('en' | 'fr' | 'de' | 'es' | 'af' | 'sq'....)
  * translate(key: string, params): Return language and use in file your.ts;
  * useDefaultLang(): Init language in app.component.
  * use(lang: Lang): Change language. (Lang: 'en' | 'fr' | 'de' | 'es' | 'af' | 'sq'....)
* pipe
  * asyncTranslate: async translate lang

