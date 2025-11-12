import React from 'react';
import { Calendar, Rocket, Globe, Users, Handshake, CheckCircle, Clock, Star } from 'lucide-react';
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
      borderColor: 'border-green-500/30'
    },
    {
      quarter: t('roadmap.q4_2025'),
      title: t('roadmap.q4_2025_title'),
      description: t('roadmap.q4_2025_text'),
      icon: Globe,
      completed: true,
      color: 'from-blue-400 to-cyan-600',
      bgGlow: 'shadow-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      quarter: t('roadmap.q1_2026'),
      title: t('roadmap.q1_2026_title'),
      description: t('roadmap.q1_2026_text'),
      icon: Calendar,
      completed: false,
      color: 'from-purple-400 to-violet-600',
      bgGlow: 'shadow-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      quarter: t('roadmap.q2_2026'),
      title: t('roadmap.q2_2026_title'),
      description: t('roadmap.q2_2026_text'),
      icon: Users,
      completed: false,
      color: 'from-orange-400 to-red-600',
      bgGlow: 'shadow-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      quarter: t('roadmap.q3_2026'),
      title: t('roadmap.q3_2026_title'),
      description: t('roadmap.q3_2026_text'),
      icon: Handshake,
      completed: false,
      color: 'from-pink-400 to-rose-600',
      bgGlow: 'shadow-pink-500/20',
      borderColor: 'border-pink-500/30'
    },
    {
      quarter: 'Q4 2026',
      title: 'Major Exchange Listings',
      description: 'Centralized exchange listings on major platforms including Binance, Coinbase, and other tier-1 exchanges for global accessibility and institutional adoption',
      icon: Star,
      completed: false,
      color: 'from-yellow-400 to-amber-600',
      bgGlow: 'shadow-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_80%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('roadmap.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('roadmap.subtitle')}
          </p>
          
          {/* Progress indicator */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">2 Completed</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">3 Upcoming</span>
            </div>
          </div>
        </div>

        {/* Enhanced timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden md:block">
            <div className="w-full h-full bg-gradient-to-b from-green-500 via-blue-500 via-purple-500 via-orange-500 to-pink-500 rounded-full opacity-30"></div>
            <div className="absolute inset-0 w-full bg-gradient-to-b from-green-500 via-blue-500 to-transparent rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col group`}
              >
                {/* Enhanced content card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border ${item.borderColor} ${item.bgGlow} shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group-hover:border-opacity-60`}>
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Animated corner accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-3xl`}></div>
                    
                    <div className="relative z-10">
                      {/* Quarter badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`px-4 py-2 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${item.color} shadow-lg`}>
                          {item.quarter}
                        </div>
                        {item.completed && (
                          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-semibold">Completed</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Title and description */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-lg">
                        {item.description}
                      </p>
                      
                      {/* Progress bar for completed items */}
                      {item.completed && (
                        <div className="mt-6">
                          <div className="w-full bg-gray-700/50 rounded-full h-2">
                            <div className={`h-2 bg-gradient-to-r ${item.color} rounded-full animate-pulse`} style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced icon */}
                <div className="relative z-20 my-8 md:my-0">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-r ${item.color} shadow-2xl ${item.bgGlow} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden`}>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-xl opacity-50 animate-pulse`}></div>
                    <item.icon className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                    
                    {/* Completion indicator */}
                    {item.completed && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Pulsing rings */}
                  <div className={`absolute inset-0 rounded-3xl border-2 ${item.borderColor} animate-ping opacity-20`}></div>
                  <div className={`absolute -inset-2 rounded-3xl border ${item.borderColor} animate-pulse opacity-10`}></div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Journey</h3>
            <p className="text-gray-400 mb-6">
              Be part of the TVLP revolution and help shape the future of DeFi innovation.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};