// src/context/LanguageContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "../i18n";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

// Контекст без дефолтного значения, чтобы не было тихих багов
const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    // SSR / iOS / приватные режимы — аккуратно с window/localStorage
    if (typeof window === "undefined") return "en";

    try {
      const saved = window.localStorage.getItem("tvlp-lang") as Lang | null;
      if (saved === "en" || saved === "fr" || saved === "de") {
        return saved;
      }
      return "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem("tvlp-lang", lang);
    } catch {
      // игнорируем ошибки storage (особенно в Safari / приватном режиме)
    }

    // Доп бонус для iOS/macOS и SEO: выставляем <html lang="...">
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = (): LangCtx => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // если где-то забудем обернуть в LanguageProvider — сразу увидим ошибку,
    // а не «залипший» английский язык
    throw new Error("useLang must be used inside <LanguageProvider>");
  }
  return ctx;
};
