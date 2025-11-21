import React, { useState } from 'react';
import {
  Wallet,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  Star,
  Sparkles,
  ShoppingCart,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { SiteModal } from '../ui/SiteModal';

export const Buy: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);

  const steps = [
    {
      icon: Wallet,
      title: t('buy.step1'),
      description: t('buy.step1Text'),
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      hoverColor: 'hover:border-pink-400/60',
    },
    {
      icon: ArrowRight,
      title: t('buy.step2'),
      description: t('buy.step2Text'),
      color: 'from-rose-400 to-purple-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      hoverColor: 'hover:border-rose-400/60',
    },
    {
      icon: CheckCircle,
      title: t('buy.step3'),
      description: t('buy.step3Text'),
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-400/60',
    },
  ];

  const securityFeatures = [
    { icon: Shield, text: t('buy.security.secure'), color: 'text-pink-400' },
    { icon: Zap, text: t('buy.security.instant'), color: 'text-rose-400' },
    { icon: CheckCircle, text: t('buy.security.noFees'), color: 'text-purple-400' },
  ];

  const quickAmounts = [100, 500, 1000, 5000];
  const tvlpPrice = 184;

  const instructionsLines = t('buy.instructionsText').split('\n');

  return (
    <section
      id="buy"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Animated particles (respect reduced motion) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-2 w-2 rounded-full bg-pink-400 opacity-60 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1.5 w-1.5 rounded-full bg-purple-500 opacity-50 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-3 w-3 rounded-full bg-rose-500 opacity-40 motion-safe:animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 h-2.5 w-2.5 rounded-full bg-violet-400 opacity-50 motion-safe:animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 shadow-2xl shadow-pink-500/25 motion-safe:animate-pulse">
              <ShoppingCart className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-400/20 via-rose-500/20 to-purple-600/20 motion-safe:animate-pulse" />
              <h2 className="relative bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                {t('buy.title')}
              </h2>
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-300 sm:text-xl">
            {t('buy.subtitle')}
          </p>

          {/* Decorative elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2">
              <TrendingUp className="h-5 w-5 text-pink-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-pink-400">
                {t('buy.badgeInstant')}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
              <Shield className="h-5 w-5 text-purple-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-purple-400">
                {t('buy.badgeSecure')}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced steps */}
        <div className="mb-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border ${step.borderColor} ${step.hoverColor} bg-gray-800/60 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl sm:p-8`}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Background gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                aria-hidden="true"
              />

              {/* Animated corner accent */}
              <div
                className={`pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-bl-2xl bg-gradient-to-br ${step.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center space-x-6">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} shadow-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <step.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-pink-300 sm:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {step.description}
                </p>

                {/* Step number */}
                <div
                  className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-800 bg-gradient-to-r ${step.color} shadow-lg`}
                >
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>

                {/* Hover indicator */}
                <div className="mt-6 flex translate-y-2 items-center space-x-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${step.color} motion-safe:animate-pulse`}
                  />
                  <span className="text-sm font-semibold text-pink-400">
                    {t('buy.readyToProceed')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced trading interface */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-pink-500/30 bg-gray-800/40 p-6 shadow-2xl shadow-pink-500/10 backdrop-blur-xl sm:p-8 lg:p-12">
          {/* Background effects */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-purple-500/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-gradient-to-tl from-purple-500/20 to-transparent blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl shadow-pink-500/25">
                  <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {t('buy.tradeTitle')}
                </h3>
              </div>
              <p className="text-lg text-gray-300">
                {t('buy.currentPriceLabel')}{' '}
                <span className="text-xl font-bold text-pink-400">
                  ${tvlpPrice.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Quick buy amounts */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {quickAmounts.map((amount) => (
                <div
                  key={amount}
                  className="cursor-pointer rounded-2xl border border-gray-600/30 bg-gray-700/30 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30 hover:bg-gray-600/30 sm:p-6"
                >
                  <div className="mb-2 text-xl font-bold text-white transition-colors duration-300 sm:text-2xl hover:text-pink-400">
                    ${amount}
                  </div>
                  <div className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                    ≈ {(amount / tvlpPrice).toFixed(3)} TVLP
                  </div>
                </div>
              ))}
            </div>

            {/* Main buy button - no browser alert, only site modal */}
            <button
              type="button"
              onClick={() => setIsCtaModalOpen(true)}
              className="group relative mb-8 flex w-full transform items-center justify-center space-x-3 overflow-hidden rounded-2xl border border-pink-400/50 bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 py-4 text-lg font-bold text-white shadow-2xl shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-pink-400 hover:via-rose-500 hover:to-purple-500 sm:py-5 sm:text-xl"
            >
              <Wallet className="h-6 w-6" aria-hidden="true" />
              <span>{t('buy.ctaButtonMain')}</span>
              <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            {/* Security features */}
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 rounded-2xl border border-gray-600/20 bg-gray-700/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30"
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} aria-hidden="true" />
                  <span className="font-semibold text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced instructions */}
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gray-800/40 p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-xl sm:p-8">
          {/* Background effects */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-2xl shadow-purple-500/25">
                <Star className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {t('buy.instructions')}
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {instructionsLines.map((line, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-2xl border border-gray-600/20 bg-gray-700/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-sm font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  <span className="flex-1 pt-1.5 leading-relaxed text-gray-300">
                    {line.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA modal instead of browser alert (iOS/macOS friendly) */}
      <SiteModal
        isOpen={isCtaModalOpen}
        title={t('buy.modal.connectTitle')}
        onClose={() => setIsCtaModalOpen(false)}
        footer={
          <button
            type="button"
            onClick={() => setIsCtaModalOpen(false)}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('buy.modal.connectOk')}
          </button>
        }
      >
        <p className="text-sm text-slate-100">
          {t('buy.modal.connectText')}
        </p>
        <p className="mt-2 text-xs text-slate-300">
          {t('buy.modal.connectHint')}
        </p>
      </SiteModal>
    </section>
  );
};
