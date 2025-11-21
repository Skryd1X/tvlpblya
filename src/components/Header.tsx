// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { WalletButton } from "./WalletButton";
import { useLanguage } from "../hooks/useLanguage";

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Лочим скролл body, пока открыт бургер
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const prevOverflow = body.style.overflow;

    if (isMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = prevOverflow || "";
    };
  }, [isMenuOpen]);

  // Если раскрыто меню и экран растянули до десктопа — закрываем бургер
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "tokenomics", href: "#tokenomics" },
    { key: "buy", href: "#buy" },
    { key: "roadmap", href: "#roadmap" },
    { key: "faq", href: "#faq" },
    { key: "contacts", href: "#contacts" },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[10000] bg-gray-900/95 backdrop-blur-2xl border-b border-cyan-500/40 shadow-2xl shadow-cyan-500/20"
        style={{ paddingTop: "env(safe-area-inset-top)" }} // safe-area для iOS
      >
        {/* Градиентный фон внутри хедера */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/8 via-purple-500/8 to-pink-500/8 animate-gradient-shift" />

        {/* Тонкая сетка */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Частицы */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-500 rounded-full animate-bounce opacity-40" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-center justify-between h-16 sm:h-20">
            {/* Лого */}
            <button
              type="button"
              className="relative flex items-center space-x-4 group cursor-pointer"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300" />

                <div className="relative w-10 h-10 bg-gray-900/95 rounded-xl flex items-center justify-center border border-cyan-400/50 group-hover:border-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
                  <img
                    src="/tvlp-logo.png"
                    alt="TVLP Logo"
                    className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const fallback =
                        img.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-6 h-6 items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg">
                    <span className="text-white text-sm font-bold">T</span>
                  </div>

                  <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300">
                  TVLP
                </span>
                <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
                  True Value Protocol
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Десктоп навигация */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="relative px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group rounded-lg hover:bg-gray-800/50 border border-transparent hover:border-cyan-500/20"
                >
                  <span className="relative z-10">{t(`nav.${item.key}`)}</span>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="pointer-events-none absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-1/2 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Десктоп-кнопки */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              <WalletButton />
            </div>

            {/* Бургер */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              className="md:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню: полноэкранный оверлей под хедером */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden bg-gray-950">
          {/* Лёгкий градиент, фон остаётся плотным */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

          <div
            className="relative flex h-full flex-col pt-16 sm:pt-20"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            {/* ВЕСЬ контент меню скроллится сверху вниз */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 rounded-xl text-gray-200 hover:text-white transition-all duration-300 font-medium bg-gray-900/80 hover:bg-gray-800 border border-gray-800/80 hover:border-cyan-400"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}

              {/* Блок языка и кошелька — кошелёк справа, язык слева */}
              <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/95 px-4 py-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Interface
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  {/* Язык слева — всегда выше по z-index и отсекает клики к кошельку */}
                  <div
                    className="w-full sm:flex-1 relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LanguageSelector />
                  </div>
                  {/* Кошелёк справа */}
                  <div className="w-full sm:flex-1 relative z-10">
                    <WalletButton />
                  </div>
                </div>
              </div>

              {/* отступ снизу */}
              <div className="h-4" />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
