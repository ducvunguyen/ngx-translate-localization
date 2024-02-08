import {Lang} from "./type";

export interface II18nConfig<T> {
  folders: string[],
  keyLocal?: string,
  defaultLanguage: Lang,
  languages: {
    label: string,
    lang: T,
    flag: string
  }[]
}

