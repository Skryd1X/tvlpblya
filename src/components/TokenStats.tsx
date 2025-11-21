import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  DollarSign,
  Activity,
  Droplets,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
} from 'lucide-react';
import { useTokenData } from '../hooks/useTokenData';
import { useLanguage } from '../hooks/useLanguage';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: Date;
  address: string;
}

export const TokenStats: React.FC = () => {
  const { tokenData, isLoading, error, refetch } = useTokenData();
  const { t } = useLanguage();

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);

  // Учитываем prefers-reduced-motion (важно для iOS/macOS и вообще для мобильных)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsReducedMotion(e.matches);
    };

    update(mq);

    if ('addEventListener' in mq) {
      mq.addEventListener('change', update as any);
      return () => mq.removeEventListener('change', update as any);
    } else {
      // старые Safari
      // @ts-ignore
      mq.addListener(update);
      return () => {
        // @ts-ignore
        mq.removeListener(update);
      };
    }
  }, []);

  // Генерация "лайв" транзакций (адаптирована под reduced motion)
  React.useEffect(() => {
    let timeoutId: number | undefined;

    const generateTransaction = (): Transaction => {
      const types: ('buy' | 'sell')[] = ['buy', 'sell'];
      const type = types[Math.random() > 0.6 ? 0 : 1]; // 60% buy, 40% sell
      const amount = Math.random() * 50 + 1; // 1–51 TVLP
      const priceVariation = (Math.random() - 0.5) * 4; // ±$2
      const price = 184 + priceVariation;

      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type,
        amount: Number(amount.toFixed(3)),
        price: Number(price.toFixed(2)),
        timestamp: new Date(),
        address: 'T' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      };
    };

    const addTransaction = () => {
      const newTransaction = generateTransaction();
      setTransactions((prev) => [newTransaction, ...prev.slice(0, 4)]); // максимум 5
    };

    // начальные транзакции
    const initialTransactions = Array.from({ length: 3 }, generateTransaction);
    setTransactions(initialTransactions);

    if (isReducedMotion) {
      // при reduced motion — без бесконечной генерации
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 2000; // 3–5 секунд
      timeoutId = window.setTimeout(() => {
        addTransaction();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isReducedMotion]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatVolume = (volume: number) => `$${(volume / 1000).toFixed(1)}K`;
  const formatChange = (change: number) =>
    `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;

  if (error) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 text-center border border-red-500/30 shadow-2xl shadow-red-500/10">
        <p className="mb-4 text-lg text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="mx-auto flex items-center space-x-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-105 hover:bg-red-700"
        >
          <RefreshCw className="h-5 w-5" />
          <span>{t('common.retry')}</span>
        </button>
      </div>
    );
  }

  // Безопасные значения, если tokenData ещё грузится/пустой
  const change24h = tokenData?.change24h ?? 0;
  const volume24h = tokenData?.volume24h ?? 0;
  const liquidity = tokenData?.liquidity ?? 0;

  const stats = [
    {
      icon: DollarSign,
      label: t('hero.currentPrice'),
      value: formatPrice(184), // фиксированная цена $184
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      icon: change24h >= 0 ? TrendingUp : TrendingDown,
      label: t('hero.change24h'),
      value: formatChange(change24h),
      color: change24h >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: change24h >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      borderColor: change24h >= 0 ? 'border-green-500/30' : 'border-red-500/30',
    },
    {
      icon: Activity,
      label: t('hero.volume'),
      value: formatVolume(volume24h),
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Droplets,
      label: t('hero.liquidity'),
      value: formatVolume(liquidity),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gray-800/40 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
      {/* Background effects (не перехватывают клики) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h3 className="text-lg font-bold text-white sm:text-2xl">
            {t('stats.liveMarketData') /* добавь переводы в словарь */}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
            <span className="text-xs font-medium text-green-400 sm:text-sm">
              {t('stats.live')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-6`}
            >
              <div className="mb-3 flex items-center space-x-3">
                <div className={`rounded-xl border ${stat.borderColor} ${stat.bgColor} p-2`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-center justify-center">
                {isLoading ? (
                  <div className="h-8 w-20 rounded-lg bg-gray-700/50 animate-pulse" />
                ) : (
                  <span className={`text-2xl font-bold ${stat.color} drop-shadow-lg`}>
                    {stat.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Доп. инфо о рынке */}
        <div className="mt-6 border-t border-gray-700/50 pt-4 sm:mt-8 sm:pt-6">
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div className="flex justify-between">
              <span className="text-gray-400">
                {t('stats.marketCap')}
              </span>
              <span className="font-semibold text-white">$184M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">
                {t('stats.network')}
              </span>
              <span className="font-semibold text-green-400">
                {t('stats.networkValue') /* например: 'Tron (TRC-20)' */}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Лента Live-транзакций */}
      <div className="mt-6 border-t border-gray-700/50 pt-4 sm:mt-8 sm:pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="flex items-center space-x-2 text-base font-bold text-white sm:text-lg">
            <Clock className="h-5 w-5 text-cyan-400" />
            <span>{t('stats.liveTransactions')}</span>
          </h4>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
            <span className="text-xs font-medium text-green-400 sm:text-sm">
              {t('stats.active')}
            </span>
          </div>
        </div>

        <div className="max-h-64 space-y-3 overflow-hidden">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between rounded-xl border p-3 transition-all duration-500 ${
                index === 0 ? 'animate-slide-up' : ''
              } ${
                tx.type === 'buy'
                  ? 'bg-green-500/10 border-green-500/30 hover:border-green-400/50'
                  : 'bg-red-500/10 border-red-500/30 hover:border-red-400/50'
              }`}
              style={{
                opacity: Math.max(0.3, 1 - index * 0.2),
                transform: `scale(${Math.max(0.95, 1 - index * 0.02)})`,
              }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    tx.type === 'buy'
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                >
                  {tx.type === 'buy' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-400" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-bold ${
                        tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {tx.type.toUpperCase()}
                    </span>
                    <span className="font-semibold text-white">
                      {tx.amount} TVLP
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{tx.address}...</span>
                    <span>•</span>
                    <span>
                      {tx.timestamp.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-white">
                  ${tx.price}
                </div>
                <div className="text-xs text-gray-400">
                  {(tx.amount * tx.price).toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div
            className="py-8 text-center text-gray-500"
            aria-live="polite"
          >
            <Activity className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p>{t('stats.waitingTransactions')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
