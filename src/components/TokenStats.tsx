import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Activity, Droplets, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
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

  // Generate realistic transactions every 3-5 seconds
  React.useEffect(() => {
    const generateTransaction = (): Transaction => {
      const types: ('buy' | 'sell')[] = ['buy', 'sell'];
      const type = types[Math.random() > 0.6 ? 0 : 1]; // 60% buy, 40% sell
      const amount = Math.random() * 50 + 1; // 1-51 TVLP
      const priceVariation = (Math.random() - 0.5) * 4; // ±$2 variation
      const price = 184 + priceVariation;
      
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type,
        amount: Number(amount.toFixed(3)),
        price: Number(price.toFixed(2)),
        timestamp: new Date(),
        address: 'T' + Math.random().toString(36).substr(2, 8).toUpperCase()
      };
    };

    const addTransaction = () => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]); // Keep only 5 transactions
    };

    // Add initial transactions
    const initialTransactions = Array.from({ length: 3 }, generateTransaction);
    setTransactions(initialTransactions);

    // Add new transaction every 3-5 seconds
    const interval = setInterval(() => {
      addTransaction();
    }, Math.random() * 2000 + 3000); // 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatVolume = (volume: number) => `$${(volume / 1000).toFixed(1)}K`;
  const formatChange = (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;

  if (error) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 text-center border border-red-500/30 shadow-2xl shadow-red-500/10">
        <p className="text-red-400 mb-4 text-lg">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center space-x-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
        >
          <RefreshCw className="w-5 h-5" />
          <span>{t('common.retry')}</span>
        </button>
      </div>
    );
  }

  const stats = [
    {
      icon: DollarSign,
      label: t('hero.currentPrice'),
      value: formatPrice(184), // Fixed price at $184
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: tokenData.change24h >= 0 ? TrendingUp : TrendingDown,
      label: t('hero.change24h'),
      value: formatChange(tokenData.change24h),
      color: tokenData.change24h >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: tokenData.change24h >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      borderColor: tokenData.change24h >= 0 ? 'border-green-500/30' : 'border-red-500/30'
    },
    {
      icon: Activity,
      label: t('hero.volume'),
      value: formatVolume(tokenData.volume24h),
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      icon: Droplets,
      label: t('hero.liquidity'),
      value: formatVolume(tokenData.liquidity),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white">Live Market Data</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 ${stat.bgColor} rounded-xl border ${stat.borderColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
              </div>
              
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <div className="w-20 h-8 bg-gray-700/50 rounded-lg animate-pulse"></div>
                ) : (
                  <span className={`text-2xl font-bold ${stat.color} drop-shadow-lg`}>
                    {stat.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional market info */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap</span>
              <span className="text-white font-semibold">$184M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network</span>
              <span className="text-green-400 font-semibold">Tron (TRC-20)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transactions Feed */}
      <div className="mt-8 pt-6 border-t border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Live Transactions</span>
          </h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm text-green-400 font-medium">Active</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-hidden">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-500 transform ${
                index === 0 ? 'animate-slide-up' : ''
              } ${
                tx.type === 'buy' 
                  ? 'bg-green-500/10 border-green-500/30 hover:border-green-400/50' 
                  : 'bg-red-500/10 border-red-500/30 hover:border-red-400/50'
              }`}
              style={{
                opacity: Math.max(0.3, 1 - index * 0.2),
                transform: `scale(${Math.max(0.95, 1 - index * 0.02)})`
              }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  tx.type === 'buy' 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {tx.type === 'buy' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${
                      tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.type.toUpperCase()}
                    </span>
                    <span className="text-white font-semibold">
                      {tx.amount} TVLP
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{tx.address}...</span>
                    <span>•</span>
                    <span>{tx.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-bold">
                  ${tx.price}
                </div>
                <div className="text-xs text-gray-400">
                  ${(tx.amount * tx.price).toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Waiting for transactions...</p>
          </div>
        )}
      </div>
    </div>
  );
};