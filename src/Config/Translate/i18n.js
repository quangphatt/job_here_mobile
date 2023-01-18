import i18n from 'i18next';
import { initReactI18next, reactI18nextModule } from 'react-i18next';
import { en, vn } from './translation';

const languageDetector = {
  type: 'languageDetector',
  detect: () => 'vn',
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: {
        translations: en
      },
      vn: {
        translations: vn
      }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
