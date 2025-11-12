import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,107,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_80%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/25 animate-pulse">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-500/20 to-pink-600/20 blur-3xl animate-pulse"></div>
              <h2 className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                {t('faq.title')}
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/30">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-semibold">Quick Answers</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/30">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 font-semibold">Expert Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ items */}
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-800/60 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 hover:bg-gray-750/60 border border-gray-700/50 hover:border-orange-500/50 shadow-2xl hover:shadow-orange-500/20 relative"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Question button */}
              <button
                onClick={() => toggleItem(index)}
                className="relative w-full px-8 py-8 text-left flex items-center justify-between focus:outline-none group-hover:bg-gray-700/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    openItems.includes(index) 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25' 
                      : 'bg-gray-700/50 group-hover:bg-gradient-to-r group-hover:from-orange-500/20 group-hover:to-red-600/20'
                  }`}>
                    <span className={`text-lg font-bold transition-colors duration-300 ${
                      openItems.includes(index) ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white pr-4 group-hover:text-orange-300 transition-colors duration-300">
                    {item.question}
                  </h3>
                </div>
                
                <div className={`p-3 rounded-2xl transition-all duration-300 ${
                  openItems.includes(index) 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25 rotate-180' 
                    : 'bg-gray-700/50 group-hover:bg-orange-500/20'
                }`}>
                  <ChevronDown className={`w-6 h-6 transition-all duration-300 ${
                    openItems.includes(index) ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'
                  }`} />
                </div>
              </button>
              
              {/* Answer content */}
              {openItems.includes(index) && (
                <div className="relative px-8 pb-8 animate-fade-in">
                  <div className="ml-16 pl-4 border-l-4 border-gradient-to-b from-orange-500 to-red-600">
                    <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/30 shadow-2xl shadow-orange-500/10 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">Still Have Questions?</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Our community is here to help! Join our Telegram group for instant support.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 hover:from-orange-400 hover:via-red-500 hover:to-pink-500 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/30 border border-orange-400/50">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};