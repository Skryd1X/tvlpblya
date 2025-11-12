import { useState, useEffect } from 'react';
import { Translation } from '../types';

// Import translations
import enTranslations from '../data/translations/en.json';
import frTranslations from '../data/translations/fr.json';
import deTranslations from '../data/translations/de.json';

const translations: Record<string, Translation> = {
  en: enTranslations,
  fr: frTranslations,
  de: deTranslations
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('tvlp-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode: string) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('tvlp-language', languageCode);
      // Force re-render by updating state immediately
      window.location.reload();
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
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
    t
  };
};