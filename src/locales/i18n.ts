import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import ko from "./ko/translation.json";
import vi from "./vi/translation.json";
import zh from "./zh/translation.json";
import ja from "./ja/translation.json";


const defaultLanguage = "vi";
const resources = {
  en: { translation: en },
  ko: { translation: ko },
  vi: { translation: vi },
  zh: { translation: zh },
  ja: { translation: ja },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;