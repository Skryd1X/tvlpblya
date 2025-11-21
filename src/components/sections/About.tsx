import React from 'react';
import { Target, Lightbulb, Zap, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Target,
      title: t('about.mission'),
      description: t('about.missionText'),
      color: 'from-cyan-400 to-blue-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      hoverColor: 'hover:border-cyan-400/60',
      iconBg: 'bg-cyan-500',
    },
    {
      icon: Lightbulb,
      title: t('about.concept'),
      description: t('about.conceptText'),
      color: 'from-blue-400 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      hoverColor: 'hover:border-blue-400/60',
      iconBg: 'bg-blue-500',
    },
    {
      icon: Zap,
      title: t('about.innovation'),
      description: t('about.innovationText'),
      color: 'from-purple-400 to-violet-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-400/60',
      iconBg: 'bg-purple-500',
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Subtle animated particles (respect reduced motion via Tailwind motion-safe) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-40 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 opacity-30 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-2 w-2 rounded-full bg-purple-500 opacity-20 motion-safe:animate-ping" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-xl shadow-cyan-500/20">
              <Target className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-600/15" />
              <h2 className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
                {t('about.title')}
              </h2>
            </div>
          </div>
          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-gray-300 sm:text-lg">
            {t('about.subtitle')}
          </p>

          {/* Decorative badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <span className="text-sm font-medium text-cyan-400">
                {t('about.badgeInnovation')}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
              <Shield className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-400">
                {t('about.badgeTech')}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border ${feature.borderColor} ${feature.hoverColor} bg-gray-800/60 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl sm:p-8`}
            >
              {/* Background gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                aria-hidden="true"
              />

              {/* Animated corner accent */}
              <div
                className={`pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-gradient-to-br ${feature.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Enhanced icon */}
                <div className="mb-6 flex items-center space-x-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-xl">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-base">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center space-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${feature.color} motion-safe:animate-pulse`}
                  />
                  <span className="text-sm font-semibold text-cyan-400">
                    {t('about.learnMore')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center sm:mt-16">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/20 bg-gray-800/40 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            {/* Background effects */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center space-x-3">
                <Sparkles
                  className="h-6 w-6 text-cyan-400 motion-safe:animate-pulse"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {t('about.ctaTitle')}
                </h3>
              </div>
              <p className="mb-6 text-sm text-gray-400 sm:text-base">
                {t('about.ctaText')}
              </p>
              <button
                type="button"
                className="transform rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 sm:px-8 sm:text-base"
              >
                {t('about.ctaButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
