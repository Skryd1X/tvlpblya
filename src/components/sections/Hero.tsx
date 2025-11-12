import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import { TokenStats } from '../TokenStats';
import { InteractiveLogo } from '../InteractiveLogo';
import { TradingWidget } from '../TradingWidget';
import { useLanguage } from '../../hooks/useLanguage';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Multiple gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60 shadow-lg shadow-purple-500/50"></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-pink-500 rounded-full animate-pulse opacity-70 shadow-lg shadow-pink-500/50"></div>
        <div className="absolute top-1/6 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-50 shadow-lg shadow-blue-400/50"></div>
        <div className="absolute bottom-1/4 left-1/6 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-60 shadow-lg shadow-green-400/50"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <InteractiveLogo />
          
          {/* Enhanced title with multiple effects */}
          <div className="relative mb-8">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                TVLP
              </span>
            </h1>
            {/* Glow effect behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-20 animate-pulse"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            {t('hero.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-cyan-300 mb-6 max-w-3xl mx-auto font-normal drop-shadow-lg">
            {t('hero.subtitle')}
          </p>
          
          <p className="text-base text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="group relative flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/30 border border-cyan-400/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6" />
                <span>{t('hero.buyButton')}</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button className="group flex items-center space-x-3 px-10 py-5 bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl font-medium text-white text-lg transition-all duration-300 border border-gray-600/50 hover:border-purple-400/60 shadow-lg backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>

        {/* Enhanced token stats and trading widget */}
        <div className="grid lg:grid-cols-2 gap-8 mt-20">
          {/* Section header for trading area */}
          <div className="lg:col-span-2 text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Trading Hub
              </h3>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Real-time market data and instant trading interface for TVLP tokens
            </p>
            
            {/* Decorative separator */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-32"></div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">Live Trading</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32"></div>
            </div>
          </div>
          
          <TokenStats />
          <TradingWidget />
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  );
};