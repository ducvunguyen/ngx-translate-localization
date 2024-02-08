import {II18nConfig, Lang} from "translate-localization";

const CONFIG_I18N : II18nConfig<Lang> ={
  folders: ['users', 'buttons'],
  defaultLanguage: 'vi',
  languages: [
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
}

export default CONFIG_I18N
