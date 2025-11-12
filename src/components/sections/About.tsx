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
      iconBg: 'bg-cyan-500'
    },
    {
      icon: Lightbulb,
      title: t('about.concept'),
      description: t('about.conceptText'),
      color: 'from-blue-400 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      hoverColor: 'hover:border-blue-400/60',
      iconBg: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: t('about.innovation'),
      description: t('about.innovationText'),
      color: 'from-purple-400 to-violet-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-400/60',
      iconBg: 'bg-purple-500'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_80%)]"></div>
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-600/15 blur-2xl"></div>
              <h2 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {t('about.title')}
              </h2>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('about.subtitle')}
          </p>
          
          {/* Decorative badges */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium text-sm">Innovation First</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Proven Technology</span>
            </div>
          </div>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 transform hover:scale-[1.02] border ${feature.borderColor} ${feature.hoverColor} shadow-xl hover:shadow-2xl relative overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-8 transition-opacity duration-300`}></div>
              
              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-2xl group-hover:opacity-15 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Enhanced icon */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover indicator */}
                <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}></div>
                  <span className="text-cyan-400 text-sm font-semibold">Learn more</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">Ready to Get Started?</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Join thousands of users who trust TVLP for their DeFi needs.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                Explore TVLP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};