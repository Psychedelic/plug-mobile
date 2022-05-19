import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../translations/en';

const resources = {
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
