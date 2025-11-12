import React, { useState } from 'react';
import { Menu, X, Coins, Zap, Sparkles } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { WalletButton } from './WalletButton';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'tokenomics', href: '#tokenomics' },
    { key: 'buy', href: '#buy' },
    { key: 'roadmap', href: '#roadmap' },
    { key: 'faq', href: '#faq' },
    { key: 'contacts', href: '#contacts' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-gray-900/95 backdrop-blur-2xl border-b border-cyan-500/40 shadow-2xl shadow-cyan-500/20" style={{ position: 'fixed' }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-purple-500/8 to-pink-500/8 animate-gradient-shift"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-500 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20 relative z-10">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4 group cursor-pointer relative">
            <div className="relative">
              {/* Multiple glow layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
              
              <div className="relative w-10 h-10 bg-gray-900/95 rounded-xl flex items-center justify-center border border-cyan-400/50 group-hover:border-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
                <img
                  src="/tvlp-logo.png"
                  alt="TVLP Logo"
                  className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg hidden items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                
                {/* Sparkle effect */}
                <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300">
                TVLP
              </span>
              <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
                True Value Protocol
              </span>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="relative px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group rounded-lg hover:bg-gray-800/50 border border-transparent hover:border-cyan-500/20"
              >
                <span className="relative z-10">{t(`nav.${item.key}`)}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-1/2 transition-all duration-300 rounded-full"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 relative z-[10000]">
            <LanguageSelector />
            <WalletButton />
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-800/50 bg-gray-900/95 backdrop-blur-2xl rounded-b-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            {/* Mobile menu background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium px-6 py-4 rounded-xl hover:bg-gray-800/60 border-l-4 border-transparent hover:border-cyan-400 backdrop-blur-sm mx-2"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800/50 px-6 relative">
              <LanguageSelector />
              <WalletButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};