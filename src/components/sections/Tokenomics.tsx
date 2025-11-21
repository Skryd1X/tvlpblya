import React from 'react';
import {
  ExternalLink,
  Copy,
  Coins,
  TrendingUp,
  PieChart,
  Shield,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Tokenomics: React.FC = () => {
  const { t } = useLanguage();

  const shortContractAddress = 'TXYZabcd1234567890abcdef...';
  const fullContractAddress =
    'TXYZabcd1234567890abcdefghijklmnopqrstuvwxyz123456';

  const copyContract = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullContractAddress);
        return;
      }

      // Fallback для старых браузеров (или ограничений iOS WebView)
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = fullContractAddress;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textarea);
        }
      }
    } catch (e) {
      console.error('Copy contract address failed:', e);
    }
  };

  const tokenomicsData = [
    {
      label: t('tokenomics.network'),
      value: t('tokenomics.networkValue'),
      icon: Shield,
      color: 'text-green-400',
    },
    {
      label: t('tokenomics.totalSupply'),
      value: t('tokenomics.totalSupplyValue'),
      icon: Coins,
      color: 'text-blue-400',
    },
    {
      label: t('tokenomics.currentPrice'),
      value: '$184.00',
      icon: TrendingUp,
      color: 'text-purple-400',
    },
    {
      label: t('tokenomics.liquidity'),
      value: '$920,000',
      icon: PieChart,
      color: 'text-cyan-400',
    },
  ];

  const distribution = [
    {
      label: t('tokenomics.liquidityPool'),
      percentage: 40,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500',
    },
    {
      label: t('tokenomics.development'),
      percentage: 25,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-500',
    },
    {
      label: t('tokenomics.marketing'),
      percentage: 20,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500',
    },
    {
      label: t('tokenomics.community'),
      percentage: 15,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500',
    },
  ];

  return (
    <section
      id="tokenomics"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24"
    >
      {/* Enhanced background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_80%)]"
        aria-hidden="true"
      />

      {/* Subtle animated particles (motion-safe for iOS/macOS) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/6 top-1/4 h-1.5 w-1.5 rounded-full bg-purple-400 opacity-40 motion-safe:animate-pulse" />
        <div className="absolute right-1/4 top-3/4 h-1 w-1 rounded-full bg-pink-500 opacity-30 motion-safe:animate-bounce" />
        <div className="absolute right-1/6 top-1/2 h-2 w-2 rounded-full bg-violet-500 opacity-20 motion-safe:animate-ping" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 shadow-xl shadow-purple-500/20">
              <PieChart className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-400/15 via-pink-500/15 to-violet-600/15 blur-2xl" />
              <h2 className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-violet-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
                {t('tokenomics.title')}
              </h2>
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            {t('tokenomics.subtitle')}
          </p>

          {/* Decorative badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
              <Shield className="h-4 w-4 text-purple-400" aria-hidden="true" />
              <span className="text-sm font-medium text-purple-400">
                Audited Contract
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2">
              <TrendingUp
                className="h-4 w-4 text-pink-400"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-pink-400">
                Deflationary
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Token Information */}
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gray-800/40 p-6 shadow-xl transition-all duration-300 hover:shadow-purple-500/10 backdrop-blur-sm sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-violet-500/5"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-gradient-to-br from-purple-500/10 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-center space-x-3 sm:mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                  <Coins className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Token Information
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {tokenomicsData.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between rounded-xl border border-gray-600/20 bg-gray-700/30 p-3 text-sm transition-all duration-300 hover:border-purple-500/30 sm:p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-600/50 transition-colors duration-300 group-hover:bg-purple-500/20">
                          <item.icon
                            className={`h-4 w-4 ${item.color}`}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-bold text-white">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Contract address */}
                <div className="group">
                  <div className="flex items-center justify-between rounded-xl border border-gray-600/20 bg-gray-700/30 p-3 text-sm transition-all duration-300 hover:border-purple-500/30 sm:p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-600/50 transition-colors duration-300 group-hover:bg-purple-500/20">
                        <ExternalLink
                          className="h-4 w-4 text-orange-400"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                        {t('tokenomics.contract')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className="font-mono text-xs text-white sm:text-sm"
                        title={fullContractAddress}
                      >
                        {shortContractAddress}
                      </span>
                      <button
                        type="button"
                        onClick={copyContract}
                        className="group rounded-lg p-1.5 transition-colors duration-300 hover:bg-gray-600/50"
                        title={t('tokenomics.copyContract') ?? 'Copy address'}
                        aria-label={t('tokenomics.copyContract') ?? 'Copy address'}
                      >
                        <Copy className="h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-purple-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://tronscan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-purple-500 hover:to-pink-500 sm:mt-8"
              >
                <span>{t('tokenomics.viewOnTronscan')}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Token Distribution */}
          <div className="relative overflow-hidden rounded-2xl border border-pink-500/20 bg-gray-800/40 p-6 shadow-xl transition-all duration-300 hover:shadow-pink-500/10 backdrop-blur-sm sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-violet-500/5"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-gradient-to-br from-pink-500/10 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-center space-x-3 sm:mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
                  <PieChart className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {t('tokenomics.distribution')}
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {distribution.map((item, index) => (
                  <div key={index} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-white sm:text-base">
                        {item.label}
                      </span>
                      <span className="text-lg font-bold text-white">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-3 w-full rounded-full bg-gray-700/50 sm:h-4">
                        <div
                          className={`relative h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg transition-all duration-1000 ease-out sm:h-4`}
                          style={{ width: `${item.percentage}%` }}
                        >
                          <div className="pointer-events-none absolute inset-0 bg-white/20 motion-safe:animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Animated pie chart (motion-safe) */}
              <div className="mt-10 flex justify-center sm:mt-12">
                <div className="relative">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-2xl sm:h-48 sm:w-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-yellow-500 motion-safe:animate-spin-slow" />
                    <div className="absolute inset-6 flex items-center justify-center rounded-full bg-gray-800 backdrop-blur-sm sm:inset-7">
                      <div className="text-center">
                        <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
                          1M
                        </div>
                        <div className="text-xs font-medium text-gray-400 sm:text-sm">
                          TVLP
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-yellow-500 blur-xl opacity-30 motion-safe:animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
