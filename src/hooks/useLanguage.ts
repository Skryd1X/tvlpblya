// src/hooks/useLanguage.ts
import { useLang } from '../context/LanguageContext';
import type { Lang } from '../i18n';
import type { Translation } from '../types';

// Import translations
import enTranslations from '../data/translations/en.json';
import frTranslations from '../data/translations/fr.json';
import deTranslations from '../data/translations/de.json';

const translations: Record<Lang, Translation> = {
  en: enTranslations,
  fr: frTranslations,
  de: deTranslations,
};

export const useLanguage = () => {
  const { lang, setLang } = useLang();
  const currentLanguage = lang;

  // меняем язык просто через контекст
  const changeLanguage = (languageCode: Lang) => {
    setLang(languageCode);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // fallback на английский
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            // если нигде нет — вернём сам ключ, чтобы сразу увидеть, что он отсутствует
            return key;
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
};
