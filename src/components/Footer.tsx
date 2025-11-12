import React from 'react';
import { Coins, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TVLP</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              True Value Liquidity Protocol - Revolutionizing DeFi with innovative tokenomics 
              that prove minimal liquidity can create maximum value.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:info@tvlp.io"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="https://t.me/TVLPCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#tokenomics" className="text-gray-400 hover:text-white transition-colors">Tokenomics</a></li>
              <li><a href="#buy" className="text-gray-400 hover:text-white transition-colors">Buy TVLP</a></li>
              <li><a href="#roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://sunswap.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SunSwap
                </a>
              </li>
              <li>
                <a 
                  href="https://tronscan.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TronScan
                </a>
              </li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contacts" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 TVLP (True Value Liquidity Protocol). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};