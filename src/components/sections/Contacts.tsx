import React from 'react';
import { Mail, MessageCircle, Users, Phone, Globe, Heart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Contacts: React.FC = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      title: t('contacts.email'),
      value: 'info@tvlp.io',
      href: 'mailto:info@tvlp.io',
      description: 'For official inquiries and support',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      hoverColor: 'hover:border-emerald-400/60'
    },
    {
      icon: MessageCircle,
      title: t('contacts.telegram'),
      value: '@TVLPCommunity',
      href: 'https://t.me/TVLPCommunity',
      description: 'Join our active community chat',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      hoverColor: 'hover:border-teal-400/60'
    }
  ];

  return (
    <section id="contacts" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_80%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-cyan-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-cyan-600/20 blur-3xl animate-pulse"></div>
              <h2 className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-2xl">
                {t('contacts.title')}
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {t('contacts.subtitle')}
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Global Community</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-teal-500/10 rounded-full border border-teal-500/30">
              <Heart className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced contact methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 transform hover:scale-[1.02] border ${method.borderColor} ${method.hoverColor} shadow-2xl hover:shadow-3xl relative overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${method.color} opacity-10 rounded-bl-3xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-emerald-400 font-bold text-lg group-hover:text-emerald-300 transition-colors duration-300">
                      {method.value}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-lg">
                  {method.description}
                </p>
                
                {/* Hover indicator */}
                <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`w-2 h-2 bg-gradient-to-r ${method.color} rounded-full animate-pulse`}></div>
                  <span className="text-emerald-400 text-sm font-semibold">Click to connect</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Enhanced community section */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-12 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-teal-500/20 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Join Our Community</h3>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
              {t('contacts.community')}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Users, text: '10,000+ Members', color: 'text-emerald-400' },
                { icon: MessageCircle, text: 'Active Discussions', color: 'text-teal-400' },
                { icon: Heart, text: 'Friendly Support', color: 'text-cyan-400' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 p-4 bg-gray-700/30 rounded-2xl border border-gray-600/30 hover:border-emerald-500/30 transition-all duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  <span className="text-gray-300 font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              {t('contacts.support')}
            </p>
            
            <button className="px-10 py-4 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:via-teal-500 hover:to-cyan-500 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-500/30 border border-emerald-400/50">
              Join Community Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};