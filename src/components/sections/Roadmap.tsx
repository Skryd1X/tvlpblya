import React from 'react';
import {
  Calendar,
  Rocket,
  Globe,
  Users,
  Handshake,
  CheckCircle,
  Clock,
  Star,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Roadmap: React.FC = () => {
  const { t } = useLanguage();

  const roadmapItems = [
    {
      quarter: t('roadmap.q3_2025'),
      title: t('roadmap.q3_2025_title'),
      description: t('roadmap.q3_2025_text'),
      icon: Rocket,
      completed: true,
      color: 'from-green-400 to-emerald-600',
      bgGlow: 'shadow-green-500/20',
      borderColor: 'border-green-500/30',
    },
    {
      quarter: t('roadmap.q4_2025'),
      title: t('roadmap.q4_2025_title'),
      description: t('roadmap.q4_2025_text'),
      icon: Globe,
      completed: true,
      color: 'from-blue-400 to-cyan-600',
      bgGlow: 'shadow-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      quarter: t('roadmap.q1_2026'),
      title: t('roadmap.q1_2026_title'),
      description: t('roadmap.q1_2026_text'),
      icon: Calendar,
      completed: false,
      color: 'from-purple-400 to-violet-600',
      bgGlow: 'shadow-purple-500/20',
      borderColor: 'border-purple-500/30',
    },
    {
      quarter: t('roadmap.q2_2026'),
      title: t('roadmap.q2_2026_title'),
      description: t('roadmap.q2_2026_text'),
      icon: Users,
      completed: false,
      color: 'from-orange-400 to-red-600',
      bgGlow: 'shadow-orange-500/20',
      borderColor: 'border-orange-500/30',
    },
    {
      quarter: t('roadmap.q3_2026'),
      title: t('roadmap.q3_2026_title'),
      description: t('roadmap.q3_2026_text'),
      icon: Handshake,
      completed: false,
      color: 'from-pink-400 to-rose-600',
      bgGlow: 'shadow-pink-500/20',
      borderColor: 'border-pink-500/30',
    },
    {
      quarter: t('roadmap.q4_2026'),
      title: t('roadmap.q4_2026_title'),
      description: t('roadmap.q4_2026_text'),
      icon: Star,
      completed: false,
      color: 'from-yellow-400 to-amber-600',
      bgGlow: 'shadow-yellow-500/20',
      borderColor: 'border-yellow-500/30',
    },
  ];

  const completedCount = roadmapItems.filter((i) => i.completed).length;
  const upcomingCount = roadmapItems.length - completedCount;

  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Animated particles (motion-safe for iOS/macOS) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-2 w-2 rounded-full bg-cyan-400 opacity-60 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1.5 w-1.5 rounded-full bg-purple-500 opacity-50 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-3 w-3 rounded-full bg-pink-500 opacity-40 motion-safe:animate-ping" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-6 flex items-center justify-center space-x-3 sm:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/25">
              <Star className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              {t('roadmap.title')}
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-400 sm:text-xl">
            {t('roadmap.subtitle')}
          </p>

          {/* Progress indicator (dynamic counts) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-green-400">
                {completedCount} {t('roadmap.completed')}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
              <Clock className="h-5 w-5 text-blue-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-blue-400">
                {upcomingCount} {t('roadmap.upcoming')}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 md:block">
            <div className="h-full w-full rounded-full bg-gradient-to-b from-green-500 via-blue-500 via-purple-500 via-orange-500 to-pink-500 opacity-30" />
            <div className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-b from-green-500 via-blue-500 to-transparent motion-safe:animate-pulse" />
          </div>

          <div className="space-y-14 sm:space-y-16">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl border ${item.borderColor} bg-gray-800/60 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl sm:p-8 ${item.bgGlow}`}
                  >
                    {/* Background gradient overlay */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                      aria-hidden="true"
                    />
                    {/* Corner accent */}
                    <div
                      className={`pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-3xl bg-gradient-to-br ${item.color} opacity-10`}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      {/* Quarter & status */}
                      <div className="mb-4 flex items-center justify-between sm:mb-6">
                        <div
                          className={`rounded-2xl bg-gradient-to-r ${item.color} px-4 py-2 text-xs font-bold text-white shadow-lg sm:text-sm`}
                        >
                          {item.quarter}
                        </div>
                        {item.completed && (
                          <div className="flex items-center space-x-2 rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1">
                            <CheckCircle
                              className="h-4 w-4 text-green-400"
                              aria-hidden="true"
                            />
                            <span className="text-xs font-semibold text-green-400 sm:text-sm">
                              {t('roadmap.completed')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title & description */}
                      <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-lg">
                        {item.description}
                      </p>

                      {/* Progress bar for completed items */}
                      {item.completed && (
                        <div className="mt-5 sm:mt-6">
                          <div className="h-2 w-full rounded-full bg-gray-700/50">
                            <div
                              className={`h-2 w-full rounded-full bg-gradient-to-r ${item.color} motion-safe:animate-pulse`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-20 my-6 md:my-0">
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r ${item.color} shadow-2xl ${item.bgGlow} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-20 sm:w-20`}
                  >
                    {/* Icon glow */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${item.color} blur-xl opacity-50 motion-safe:animate-pulse`}
                      aria-hidden="true"
                    />
                    <item.icon
                      className="relative z-10 h-8 w-8 text-white drop-shadow-lg sm:h-10 sm:w-10"
                      aria-hidden="true"
                    />

                    {/* Completion indicator */}
                    {item.completed && (
                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-900 bg-green-500 shadow-lg">
                        <CheckCircle
                          className="h-4 w-4 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  {/* Pulsing rings (motion-safe) */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${item.borderColor} opacity-20 motion-safe:animate-ping`}
                    aria-hidden="true"
                  />
                  <div
                    className={`pointer-events-none absolute -inset-2 rounded-3xl border ${item.borderColor} opacity-10 motion-safe:animate-pulse`}
                    aria-hidden="true"
                  />
                </div>

                {/* Spacer for layout balance */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center sm:mt-20">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-gray-800/40 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-8">
            <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
              {t('roadmap.ctaTitle')}
            </h3>
            <p className="mb-6 text-sm text-gray-400 sm:text-base">
              {t('roadmap.ctaText')}
            </p>
            <button
              type="button"
              className="transform rounded-2xl border border-cyan-400/50 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 sm:px-8 sm:py-4 sm:text-lg"
            >
              {t('roadmap.ctaButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
