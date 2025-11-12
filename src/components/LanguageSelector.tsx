import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { languages } from '../data/languages';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/30 hover:border-cyan-500/30 backdrop-blur-sm group"
      >
        <span className="text-lg" dangerouslySetInnerHTML={{ __html: currentLang.flag }}></span>
        <ChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-cyan-400 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700/50 overflow-hidden min-w-[80px]" style={{ zIndex: 2147483647 }}>
          {/* Dropdown background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
          
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
              className={`relative w-full flex items-center justify-center px-3 py-2 text-left hover:bg-gray-700/60 transition-all duration-300 group ${
                currentLanguage === language.code ? 'bg-gray-700/40' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm" dangerouslySetInnerHTML={{ __html: language.flag }}></span>
                <span className="text-gray-300 group-hover:text-white text-sm">{language.name}</span>
              </div>
              
              {/* Selection indicator */}
              {currentLanguage === language.code && (
                <div className="absolute right-1.5 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse"></div>
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};