import React from 'react';
import { Sparkles, TrendingUp, Wallet } from 'lucide-react';
import { TokenStats } from '../TokenStats';
import { InteractiveLogo } from '../InteractiveLogo';
import { TradingWidget } from '../TradingWidget';
import { useLanguage } from '../../hooks/useLanguage';
import { useWallet } from '../../hooks/useWallet';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { connectWallet } = useWallet();

  const handleScrollToTrading = () => {
    const target = document.getElementById('buy'); // <section id="buy">
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Main gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        aria-hidden="true"
      >
        {/* Multiple gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles (motion-safe for iOS/macOS) */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/4 top-1/4 h-3 w-3 rounded-full bg-cyan-400 opacity-80 shadow-lg shadow-cyan-400/50 motion-safe:animate-bounce" />
        <div className="absolute right-1/4 top-3/4 h-2 w-2 rounded-full bg-purple-500 opacity-60 shadow-lg shadow-purple-500/50 motion-safe:animate-ping" />
        <div className="absolute left-3/4 top-1/2 h-4 w-4 rounded-full bg-pink-500 opacity-70 shadow-lg shadow-pink-500/50 motion-safe:animate-pulse" />
        <div className="absolute right-1/3 top-1/6 h-1.5 w-1.5 rounded-full bg-blue-400 opacity-50 shadow-lg shadow-blue-400/50 motion-safe:animate-bounce" />
        <div className="absolute bottom-1/4 left-1/6 h-2.5 w-2.5 rounded-full bg-green-400 opacity-60 shadow-lg shadow-green-400/50 motion-safe:animate-ping" />
      </div>

      {/* Animated grid pattern (with reduced-motion fallback) */}
      <div
        className="tvlp-grid-anim absolute inset-0 opacity-10"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="mb-12 text-center sm:mb-16">
          <InteractiveLogo />

          {/* Title */}
          <div className="relative mb-6 sm:mb-8">
            <h1 className="relative mb-4 text-5xl font-bold text-white sm:text-7xl md:text-8xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl motion-safe:animate-pulse">
                TVLP
              </span>
            </h1>
            {/* Glow effect behind title */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-20 motion-safe:animate-pulse" />
          </div>

          <h2 className="mb-3 text-xl font-medium bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg sm:text-2xl md:text-3xl">
            {t('hero.title')}
          </h2>

          <p className="mx-auto mb-4 max-w-3xl text-base font-normal text-cyan-300 drop-shadow-lg sm:text-lg md:text-xl">
            {t('hero.subtitle')}
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-gray-400 sm:mb-12 sm:text-base">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:mb-16">
            <button
              type="button"
              onClick={handleScrollToTrading}
              className="group relative flex items-center space-x-3 overflow-hidden rounded-2xl border border-cyan-400/50 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 sm:px-10 sm:py-5 sm:text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>{t('hero.buyButton')}</span>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-white/20 -skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <button
              type="button"
              onClick={connectWallet}
              className="group flex items-center space-x-3 rounded-2xl border border-gray-600/50 bg-gray-800/50 px-8 py-4 text-base font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:border-purple-400/60 sm:px-10 sm:py-5 sm:text-lg"
            >
              <Wallet className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>{t('wallet.connect')}</span>
            </button>
          </div>
        </div>

        {/* Trading hub */}
        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-2">
          <div className="lg:col-span-2 mb-8 text-center md:mb-12">
            <div className="mb-4 flex items-center justify-center space-x-4 sm:mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 shadow-2xl shadow-emerald-500/25 motion-safe:animate-pulse">
                <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                {t('hero.tradingHubTitle')}
              </h3>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-lg">
              {t('hero.tradingHubSubtitle')}
            </p>

            {/* Decorative separator */}
            <div className="mt-6 flex items-center justify-center space-x-4 sm:mt-8">
              <div className="flex-1 max-w-[8rem] h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              <div className="flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="text-xs font-semibold text-emerald-400 sm:text-sm">
                  {t('hero.tradingHubBadge')}
                </span>
              </div>
              <div className="flex-1 max-w-[8rem] h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>

          <TokenStats />
          <TradingWidget />
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tvlp-grid-anim div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
