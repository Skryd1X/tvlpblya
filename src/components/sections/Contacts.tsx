import React from 'react';
import {
  Mail,
  MessageCircle,
  Users,
  Phone,
  Globe,
  Heart,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Contacts: React.FC = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      title: t('contacts.email'),
      value: 'info@tvlp.io',
      href: 'mailto:info@tvlp.io',
      description: t('contacts.emailDescription'),
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      hoverColor: 'hover:border-emerald-400/60',
    },
    {
      icon: MessageCircle,
      title: t('contacts.telegram'),
      value: '@TVLPCommunity',
      href: 'https://t.me/TVLPCommunity',
      description: t('contacts.telegramDescription'),
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      hoverColor: 'hover:border-teal-400/60',
    },
  ];

  const communityStats = [
    {
      icon: Users,
      text: t('contacts.statMembers'),
      color: 'text-emerald-400',
    },
    {
      icon: MessageCircle,
      text: t('contacts.statDiscussions'),
      color: 'text-teal-400',
    },
    {
      icon: Heart,
      text: t('contacts.statSupport'),
      color: 'text-cyan-400',
    },
  ];

  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Animated particles (motion-safe for iOS/macOS reduced motion) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-2 w-2 rounded-full bg-emerald-400 opacity-60 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1.5 w-1.5 rounded-full bg-teal-500 opacity-50 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-3 w-3 rounded-full bg-cyan-500 opacity-40 motion-safe:animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 h-2.5 w-2.5 rounded-full bg-green-400 opacity-50 motion-safe:animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 shadow-2xl shadow-emerald-500/25 motion-safe:animate-pulse">
              <Phone className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-cyan-600/20 motion-safe:animate-pulse" />
              <h2 className="relative bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                {t('contacts.title')}
              </h2>
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-300 sm:text-xl">
            {t('contacts.subtitle')}
          </p>

          {/* Decorative elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <Globe className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-emerald-400">
                {t('contacts.badgeGlobal')}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2">
              <Heart className="h-5 w-5 text-teal-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-teal-400">
                {t('contacts.badgeSupport')}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced contact methods */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border ${method.borderColor} ${method.hoverColor} bg-gray-800/60 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl sm:p-8`}
              aria-label={`${method.title}: ${method.value}`}
            >
              {/* Background gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${method.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                aria-hidden="true"
              />

              {/* Animated corner accent */}
              <div
                className={`pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-3xl bg-gradient-to-br ${method.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center space-x-6">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${method.color} shadow-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <method.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-2xl">
                      {method.title}
                    </h3>
                    <p className="text-lg font-bold text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">
                      {method.value}
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {method.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex translate-y-2 items-center space-x-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${method.color} motion-safe:animate-pulse`}
                  />
                  <span className="text-sm font-semibold text-emerald-400">
                    {t('contacts.clickToConnect')}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Enhanced community section */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gray-800/40 p-8 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-12">
          {/* Background effects */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-gradient-to-tl from-teal-500/20 to-transparent blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-center space-x-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/25 motion-safe:animate-pulse">
                <Users className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {t('contacts.communityTitle')}
              </h3>
            </div>

            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
              {t('contacts.community')}
            </p>

            <div className="mb-8 grid gap-4 md:grid-cols-3 md:gap-6">
              {communityStats.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 rounded-2xl border border-gray-600/30 bg-gray-700/30 p-4 transition-all duration-300 hover:border-emerald-500/30"
                >
                  <feature.icon
                    className={`h-6 w-6 ${feature.color}`}
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
              {t('contacts.support')}
            </p>

            <button
              type="button"
              className="transform rounded-2xl border border-emerald-400/50 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 px-8 py-3 text-base font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:via-teal-500 hover:to-cyan-500 sm:px-10 sm:py-4 sm:text-lg"
            >
              {t('contacts.joinCta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
