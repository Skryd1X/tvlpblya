import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,107,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Animated particles (motion-safe for iOS/macOS) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-2 w-2 rounded-full bg-orange-400 opacity-60 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1.5 w-1.5 rounded-full bg-pink-500 opacity-50 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-3 w-3 rounded-full bg-red-500 opacity-40 motion-safe:animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-50 motion-safe:animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 shadow-2xl shadow-orange-500/25 motion-safe:animate-pulse">
              <HelpCircle className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-400/20 via-red-500/20 to-pink-600/20 motion-safe:animate-pulse" />
              <h2 className="relative bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                {t('faq.title')}
              </h2>
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-300 sm:text-xl">
            {t('faq.subtitle')}
          </p>

          {/* Decorative elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
              <Sparkles
                className="h-5 w-5 text-orange-400"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-orange-400">
                {t('faq.badgeQuick')} {/* e.g. "Quick Answers" */}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2">
              <HelpCircle
                className="h-5 w-5 text-pink-400"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-pink-400">
                {t('faq.badgeExpert')} {/* e.g. "Expert Support" */}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ items */}
        <div className="space-y-6">
          {faqItems.map((item, index) => {
            const isOpen = openItems.includes(index);
            const contentId = `faq-item-${index}`;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gray-800/60 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-orange-500/50 hover:bg-gray-700/60 hover:shadow-orange-500/20"
              >
                {/* Background gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="relative flex w-full items-center justify-between px-6 py-6 text-left transition-all duration-300 focus:outline-none sm:px-8 sm:py-8 group-hover:bg-gray-700/30"
                >
                  <div className="flex flex-1 items-center space-x-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25'
                          : 'bg-gray-700/50 group-hover:bg-gradient-to-r group-hover:from-orange-500/20 group-hover:to-red-600/20'
                      }`}
                    >
                      <span
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isOpen
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-orange-400'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="pr-4 text-base font-bold text-white transition-colors duration-300 sm:text-xl group-hover:text-orange-300">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`rounded-2xl p-3 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25'
                        : 'bg-gray-700/50 group-hover:bg-orange-500/20'
                    }`}
                  >
                    <ChevronDown
                      className={`h-6 w-6 transition-all duration-300 ${
                        isOpen
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-orange-400'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Answer content */}
                {isOpen && (
                  <div
                    id={contentId}
                    className="relative px-6 pb-6 sm:px-8 sm:pb-8 motion-safe:animate-fade-in"
                  >
                    <div className="ml-14 border-l-4 border-orange-500 pl-4 sm:ml-16">
                      <p className="text-base leading-relaxed text-gray-300 transition-colors duration-300 sm:text-lg group-hover:text-gray-200">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}

                {/* Decorative corner accent */}
                <div
                  className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-3xl bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-orange-500/30 bg-gray-800/40 p-6 shadow-2xl shadow-orange-500/10 backdrop-blur-xl sm:p-8">
            {/* Background effects */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center space-x-3">
                <Sparkles
                  className="h-8 w-8 text-orange-400 motion-safe:animate-pulse"
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {t('faq.moreTitle')} {/* e.g. "Still Have Questions?" */}
                </h3>
              </div>
              <p className="mb-6 text-sm text-gray-400 sm:text-base">
                {t('faq.moreText')}
              </p>
              <button
                type="button"
                className="transform rounded-2xl border border-orange-400/50 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 px-8 py-3 text-base font-bold text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:from-orange-400 hover:via-red-500 hover:to-pink-500 sm:px-8 sm:py-4 sm:text-lg"
              >
                {t('faq.moreCta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
