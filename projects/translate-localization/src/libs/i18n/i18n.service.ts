import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, forkJoin, Observable, of} from "rxjs";

import TOKEN_I18N_CONFIG from "./token-i18n";

import {II18nConfig} from "./i18n-config";
import {T_Apis, T_Lang} from "./type";

import {ComponentStore} from "../store/component-store";

import {getLangLocal, setLangLocal} from "./utils";

const state = {};

@Injectable()
export class I18nService extends ComponentStore<any>{
  private _lang = new BehaviorSubject<T_Lang>(getLangLocal({key: this.config.keyLocal}) || this.config.defaultLanguage);
  private _lang$ = this._lang.asObservable();
  constructor(private http: HttpClient,
              @Inject(TOKEN_I18N_CONFIG)
              public config: II18nConfig<T_Lang>) {
    super(state);
  }

  private getTranslate(value: string, dataSource: any){
    let keys = value.split('.'), result = dataSource;
    keys.forEach(key => result = result[key]);
    return result;
  }

  private readFileJsonI18n = (folder: string, lang: T_Lang) =>
    this.http.get(`assets/i18n${folder != '' ? '/' + folder : ''}/${lang}.json`)
      .pipe(catchError(err => of(err)));

  get lang(): T_Lang {
    return this._lang.getValue();
  }

  get asyncLang(){
    return this._lang$;
  }

  instance(key?: string){
    if (key)
      return this.get()[key];
    return this.get();
  }

  translate(value: string){
    return this.getTranslate(value, this.instance());
  }

  asyncTranslate(key: string){
    return new Observable((observable => {
      this.data.subscribe(data => {
        observable.next(this.getTranslate(key, data));
      });
    }))
  }

   useDefaultLang(){
      this.use(this.lang);
  }


  use(lang: T_Lang){
    const apis: T_Apis = {};

    this._lang.next(lang)
    setLangLocal(lang, this.config.keyLocal);

    this.config.folders.forEach(folder =>
      apis[folder] = this.readFileJsonI18n(folder === 'root' ? '' : folder, lang));

    apis['root'] = this.readFileJsonI18n('', lang);
    forkJoin(apis).subscribe(res => {
      const root = res['root'];
      delete res['root'];
      this.patchState({...res, ...root});
    });
  }

}
