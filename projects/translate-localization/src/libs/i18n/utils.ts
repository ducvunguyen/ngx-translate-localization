import {Lang} from "./type";

const defaultKey = 'lang';
function getLangLocal({key = defaultKey}: { key?: string }) : Lang | null {
  return (localStorage.getItem(key) as Lang) || null;
}
const setLangLocal = (value: string, key = defaultKey) =>
  localStorage.setItem(key, value)

const removeLangLocal = (key = defaultKey) => localStorage.removeItem(key);

export {
  getLangLocal,
  setLangLocal,
  removeLangLocal
}
