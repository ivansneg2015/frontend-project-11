import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initializeLocalization = () => {
  const i18nInstance = i18n.createInstance();

  i18nInstance
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    });

  return i18nInstance;
};

export default initializeLocalization();
