import React, { useState } from 'react';
import { Wallet, ArrowRight, CheckCircle, Shield, Zap, TrendingUp, Star, Sparkles, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Buy: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Wallet,
      title: t('buy.step1'),
      description: t('buy.step1Text'),
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      hoverColor: 'hover:border-pink-400/60'
    },
    {
      icon: ArrowRight,
      title: t('buy.step2'),
      description: t('buy.step2Text'),
      color: 'from-rose-400 to-purple-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      hoverColor: 'hover:border-rose-400/60'
    },
    {
      icon: CheckCircle,
      title: t('buy.step3'),
      description: t('buy.step3Text'),
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-400/60'
    }
  ];

  return (
    <section id="buy" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.05),transparent_80%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-rose-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-violet-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/25 animate-pulse">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-500/20 to-purple-600/20 blur-3xl animate-pulse"></div>
              <h2 className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                {t('buy.title')}
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {t('buy.subtitle')}
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/30">
              <TrendingUp className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 font-semibold">Instant Trading</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">Secure Platform</span>
            </div>
          </div>
        </div>

        {/* Enhanced steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 transform hover:scale-[1.02] border ${step.borderColor} ${step.hoverColor} shadow-2xl hover:shadow-3xl relative overflow-hidden`}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-10 h-10 bg-gradient-to-br ${step.color} opacity-10 rounded-bl-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-lg">
                  {step.description}
                </p>
                
                {/* Step number */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                
                {/* Hover indicator */}
                <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full animate-pulse`}></div>
                  <span className="text-pink-400 text-sm font-semibold">Ready to proceed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced trading interface */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-12 border border-pink-500/30 shadow-2xl shadow-pink-500/10 relative overflow-hidden mb-16">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/25">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Buy TVLP Instantly</h3>
              </div>
              <p className="text-gray-300 text-lg">Current Price: <span className="text-pink-400 font-bold text-xl">$184.00</span></p>
            </div>

            {/* Quick buy amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[100, 500, 1000, 5000].map((amount, index) => (
                <div
                  key={amount}
                  className="bg-gray-700/30 hover:bg-gray-600/30 rounded-2xl p-6 border border-gray-600/30 hover:border-pink-500/30 transition-all duration-300 group backdrop-blur-sm cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300 mb-2">
                      ${amount}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      ≈ {(amount / 184).toFixed(3)} TVLP
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main buy button */}
            <button 
              onClick={() => alert('🚀 Подключите кошелек и активируйте торговлю в правом верхнем углу!')}
              className="w-full py-5 bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 hover:from-pink-400 hover:via-rose-500 hover:to-purple-500 rounded-2xl font-bold text-white text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl shadow-pink-500/30 border border-pink-400/50 flex items-center justify-center space-x-3 relative overflow-hidden group mb-8"
            >
              <Wallet className="w-6 h-6" />
              <span>🚀 Start Trading TVLP</span>
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Security features */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, text: 'Secure & Audited', color: 'text-pink-400' },
                { icon: Zap, text: 'Instant Settlement', color: 'text-rose-400' },
                { icon: CheckCircle, text: 'No Hidden Fees', color: 'text-purple-400' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 p-4 bg-gray-700/20 rounded-2xl border border-gray-600/20 hover:border-pink-500/30 transition-all duration-300 backdrop-blur-sm">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-gray-300 font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced instructions */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('buy.instructions')}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {t('buy.instructionsText').split('\n').map((line, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-700/20 rounded-2xl border border-gray-600/20 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold mt-1 shadow-lg">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-gray-300 pt-1.5 leading-relaxed">{line.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};