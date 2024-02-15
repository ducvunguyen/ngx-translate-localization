import {Observable} from "rxjs";

type Lang = 'en' | 'fr' | 'de' | 'es' | 'af' | 'sq' | 'am' | 'ar' | 'hy' | 'az' | 'eu' | 'be' | 'bn' | 'bs' | 'bg' | 'ca' | 'ceb' | 'ny' | 'zh' | 'co' | 'hr' | 'cs' | 'da' | 'nl' | 'eo' | 'et' | 'tl' | 'fi' | 'fy' | 'gl' | 'ka' | 'el' | 'gu' | 'ht' | 'ha' | 'haw' | 'iw' | 'hi' | 'hmn' | 'hu' | 'is' | 'ig' | 'id' | 'ga' | 'it' | 'ja' | 'jw' | 'kn' | 'kk' | 'km' | 'ko' | 'ku' | 'ky' | 'lo' | 'la' | 'lv' | 'lt' | 'lb' | 'mk' | 'mg' | 'ms' | 'ml' | 'mt' | 'mi' | 'mr' | 'mn' | 'my' | 'ne' | 'no' | 'or' | 'ps' | 'fa' | 'pl' | 'pt' | 'pa' | 'ro' | 'sm' | 'gd' | 'sr' | 'st' | 'sn' | 'sd' | 'si' | 'sk' | 'sl' | 'so' | 'su' | 'sw' | 'sv' | 'tg' | 'ta' | 'te' | 'th' | 'tr' | 'uk' | 'ur' | 'ug' | 'uz' | 'vi' | 'cy' | 'xh' | 'yi' | 'yo' | 'zu';

type Api = { [key: string]:  | Observable<string | object | any> };

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type HashMap<T = any> = Record<string, T>;

export { Lang, Api, HashMap };

