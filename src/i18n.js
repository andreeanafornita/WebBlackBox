import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './translating/en/translationen.json';
import translationRO from './translating/ro/translationro.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ro: {
    translation: translationRO,
  },
};

// Get the saved language from localStorage, or default to 'en'
const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources,
    lng: savedLanguage, // Use the saved language or fallback to 'en'
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
