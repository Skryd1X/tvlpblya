// src/components/LanguageSelector.tsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { languages } from "../data/languages";

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const active =
    languages.find((l) => l.code === currentLanguage) ?? languages[0];

  // Закрытие по клику вне и по Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="relative inline-block w-full max-w-[190px] z-30"
    >
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-700/70 bg-gray-900 px-3 py-2 text-sm font-medium text-gray-100 shadow-sm hover:border-cyan-400 hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
      >
        <span className="flex items-center gap-2">
          <span className="text-base">{active.flag}</span>
          <span className="text-xs uppercase tracking-widest">
            {active.code.toUpperCase()}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 opacity-80" />
      </button>

      {isOpen && (
        <div
          className="
            absolute left-0 top-full mt-2
            z-40
            w-44 overflow-hidden rounded-xl
            border border-cyan-500/40 bg-gray-950
            shadow-2xl shadow-black/70
          "
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className="
                  flex w-full items-center justify-between
                  px-3 py-2 text-sm text-gray-200
                  hover:bg-gray-800
                "
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-xs uppercase tracking-widest">
                    {lang.code.toUpperCase()}
                  </span>
                </span>
                {lang.code === active.code && (
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
