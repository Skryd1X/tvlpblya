import React from 'react';
import { ExternalLink, Copy, Coins, TrendingUp, PieChart, Shield } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Tokenomics: React.FC = () => {
  const { t } = useLanguage();
  
  const contractAddress = 'TXYZabcd1234567890abcdef...';
  const fullContractAddress = 'TXYZabcd1234567890abcdefghijklmnopqrstuvwxyz123456';

  const copyContract = () => {
    navigator.clipboard.writeText(fullContractAddress);
  };

  const tokenomicsData = [
    { 
      label: t('tokenomics.network'), 
      value: t('tokenomics.networkValue'),
      icon: Shield,
      color: 'text-green-400'
    },
    { 
      label: t('tokenomics.totalSupply'), 
      value: t('tokenomics.totalSupplyValue'),
      icon: Coins,
      color: 'text-blue-400'
    },
    { 
      label: t('tokenomics.currentPrice'), 
      value: '$184.00',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    { 
      label: t('tokenomics.liquidity'), 
      value: '$920,000',
      icon: PieChart,
      color: 'text-cyan-400'
    }
  ];

  const distribution = [
    { label: t('tokenomics.liquidityPool'), percentage: 40, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500' },
    { label: t('tokenomics.development'), percentage: 25, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500' },
    { label: t('tokenomics.marketing'), percentage: 20, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500' },
    { label: t('tokenomics.community'), percentage: 15, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-500' }
  ];

  return (
    <section id="tokenomics" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_80%)]"></div>
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-500 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-violet-500 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20">
              <PieChart className="w-7 h-7 text-white" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 via-pink-500/15 to-violet-600/15 blur-2xl"></div>
              <h2 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                {t('tokenomics.title')}
              </h2>
            </div>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('tokenomics.subtitle')}
          </p>
          
          {/* Decorative badges */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium text-sm">Audited Contract</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/20">
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-medium text-sm">Deflationary</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Token Information */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-violet-500/5"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Token Information</h3>
              </div>
              
              <div className="space-y-6">
                {tokenomicsData.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/20 hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600/50 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.label}</span>
                      </div>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                  </div>
                ))}
                
                <div className="group">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/20 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600/50 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                        <ExternalLink className="w-4 h-4 text-orange-400" />
                      </div>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{t('tokenomics.contract')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono text-sm">{contractAddress}</span>
                      <button
                        onClick={copyContract}
                        className="p-1.5 hover:bg-gray-600/50 rounded-lg transition-colors duration-300 group"
                        title="Copy full address"
                      >
                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://tronscan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25"
              >
                <span className="font-semibold">{t('tokenomics.viewOnTronscan')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enhanced Token Distribution */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20 shadow-xl hover:shadow-pink-500/10 transition-all duration-300 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-violet-500/5"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t('tokenomics.distribution')}</h3>
              </div>
              
              <div className="space-y-6">
                {distribution.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{item.label}</span>
                      <span className="text-white font-bold text-lg">{item.percentage}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${item.color} h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                          style={{ width: `${item.percentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pie Chart */}
              <div className="mt-12 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-yellow-500 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-6 bg-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">1M</div>
                        <div className="text-sm text-gray-400 font-medium">TVLP</div>
                      </div>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-yellow-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};