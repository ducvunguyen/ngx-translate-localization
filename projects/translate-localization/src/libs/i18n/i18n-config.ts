import {Lang} from "./type";

export interface II18nConfig {
  folders: string[],
  keyLocal?: string,
  defaultLanguage: Lang,
}

export interface Language<T> {
  label: string,
  lang: T,
  flag: string
}
