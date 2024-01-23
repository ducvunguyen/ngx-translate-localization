import {T_Lang} from "./type";

export interface II18nConfig<T> {
  folders: string[],
  keyLocal?: string,
  defaultLanguage: T_Lang,
  languages: {
    label: string,
    lang: T,
    flag: string
  }[]
}

