import React from 'react';
import { Coins, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                TVLP
              </span>
            </div>

            <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              True Value Liquidity Protocol – revolutionizing DeFi with
              innovative tokenomics that demonstrate how minimal liquidity can
              create maximum value.
            </p>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <a
                href="mailto:info@tvlp.io"
                aria-label="Contact TVLP via email"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://t.me/TVLPCommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open TVLP Telegram community"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#tokenomics"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tokenomics
                </a>
              </li>
              <li>
                <a
                  href="#buy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Buy TVLP
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
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
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            © 2025 TVLP (True Value Liquidity Protocol). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
