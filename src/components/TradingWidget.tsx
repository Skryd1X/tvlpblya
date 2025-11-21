import React, { useState } from 'react';
import { ArrowDown, Wallet, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';
import { SiteModal } from './ui/SiteModal';

type ModalType =
  | 'none'
  | 'wallet-required'
  | 'no-permission'
  | 'invalid-amount'
  | 'confirm'
  | 'success'
  | 'error';

interface PendingSwap {
  fromAmount: string;
  toAmount: string;
  fromToken: string;
  toToken: string;
}

export const TradingWidget: React.FC = () => {
  const { t } = useLanguage();
  const { wallet, hasManagementPermission, approveToken, signMessage } = useWallet();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState<'USDT' | 'TVLP'>('USDT');
  const [toToken, setToToken] = useState<'USDT' | 'TVLP'>('TVLP');
  const [isSwapping, setIsSwapping] = useState(false);

  const [modal, setModal] = useState<ModalType>('none');
  const [pendingSwap, setPendingSwap] = useState<PendingSwap | null>(null);
  const [lastSwap, setLastSwap] = useState<PendingSwap | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tvlpPrice = 184; // $184 per TVLP

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const numeric = Number(value.replace(',', '.'));

    if (value && !isNaN(numeric) && numeric > 0) {
      if (fromToken === 'USDT' && toToken === 'TVLP') {
        setToAmount((numeric / tvlpPrice).toFixed(6));
      } else if (fromToken === 'TVLP' && toToken === 'USDT') {
        setToAmount((numeric * tvlpPrice).toFixed(2));
      } else {
        setToAmount('');
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

  const handleSwapClick = () => {
    const numeric = Number(fromAmount.replace(',', '.'));

    if (!wallet.connected) {
      setModal('wallet-required');
      return;
    }

    if (!hasManagementPermission) {
      setModal('no-permission');
      return;
    }

    if (!fromAmount || isNaN(numeric) || numeric <= 0) {
      setModal('invalid-amount');
      return;
    }

    if (!toAmount) {
      setModal('invalid-amount');
      return;
    }

    const swap: PendingSwap = {
      fromAmount,
      toAmount,
      fromToken,
      toToken,
    };

    setPendingSwap(swap);
    setModal('confirm');
  };

  const executeSwap = async () => {
    if (!pendingSwap) return;

    setIsSwapping(true);
    setErrorMessage(null);

    try {
      const swapMessage = `Swap ${pendingSwap.fromAmount} ${pendingSwap.fromToken} for ${pendingSwap.toAmount} ${pendingSwap.toToken}`;
      await signMessage(swapMessage);

      setLastSwap(pendingSwap);
      setFromAmount('');
      setToAmount('');
      setPendingSwap(null);
      setModal('success');
    } catch (error) {
      console.error('Swap failed:', error);
      setErrorMessage(t('trading.modal.errorGeneric'));
      setModal('error');
    } finally {
      setIsSwapping(false);
    }
  };

  const closeModal = () => {
    setModal('none');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gray-800/40 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-8">
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h3 className="flex items-center space-x-2 text-lg font-bold text-white sm:text-2xl">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span>{t('trading.instantSwapTitle')}</span>
          </h3>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 sm:text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>${tvlpPrice.toLocaleString()}/TVLP</span>
          </div>
        </div>

        {/* From Token */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            {t('trading.from')}
          </label>
          <div className="rounded-2xl border border-gray-700/50 bg-gray-900/60 p-4 transition-all duration-300 hover:border-cyan-500/50">
            <div className="flex items-center justify-between">
              <input
                type="number"
                inputMode="decimal"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.00"
                className="mr-4 flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder:text-gray-500"
              />
              <div className="flex items-center space-x-2 rounded-xl bg-gray-800/80 px-3 py-2">
                {fromToken === 'USDT' ? (
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white">
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                      alt="USDT"
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <span className="text-xs font-bold text-white">$</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 bg-gray-900">
                    <img
                      src="/tvlp-logo.png"
                      alt="TVLP"
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600">
                      <span className="text-xs font-bold text-white">T</span>
                    </div>
                  </div>
                )}
                <span className="font-bold text-white">{fromToken}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
              <span>
                {t('trading.balance')}:{' '}
                {wallet.connected ? wallet.balance.toFixed(2) : '0.00'} {fromToken}
              </span>
              {wallet.connected && (
                <button
                  type="button"
                  onClick={() => handleFromAmountChange(wallet.balance.toString())}
                  className="rounded bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 hover:text-cyan-300"
                >
                  {t('trading.max')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button (token flip) */}
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={handleSwapTokens}
            className="transform rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-110 hover:from-cyan-400 hover:to-purple-500"
          >
            <ArrowDown className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* To Token */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            {t('trading.to')}
          </label>
          <div className="rounded-2xl border border-gray-700/50 bg-gray-900/60 p-4 transition-all duration-300 hover:border-purple-500/50">
            <div className="flex items-center justify-between">
              <input
                type="number"
                readOnly
                value={toAmount}
                placeholder="0.00"
                className="mr-4 flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder:text-gray-500"
              />
              <div className="flex items-center space-x-2 rounded-xl bg-gray-800/80 px-3 py-2">
                {toToken === 'TVLP' ? (
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 bg-gray-900">
                    <img
                      src="/tvlp-logo.png"
                      alt="TVLP"
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600">
                      <span className="text-xs font-bold text-white">T</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white">
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                      alt="USDT"
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <span className="text-xs font-bold text-white">$</span>
                    </div>
                  </div>
                )}
                <span className="font-bold text-white">{toToken}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {t('trading.balance')}: 0.00 {toToken}
            </div>
          </div>
        </div>

        {/* Swap Details */}
        <div className="mb-6 rounded-2xl border border-gray-700/30 bg-gray-900/40 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('trading.exchangeRate')}</span>
            <span className="font-bold text-cyan-400">
              1 TVLP = ${tvlpPrice}
            </span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('trading.networkFee')}</span>
            <span className="font-bold text-green-400">~$2.50</span>
          </div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('trading.slippage')}</span>
            <span className="font-bold text-yellow-400">0.5%</span>
          </div>
          <div className="border-t border-gray-700/50 pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t('trading.youWillReceive')}</span>
              <span className="font-bold text-white">
                {toAmount ? `${toAmount} TVLP` : '0.00 TVLP'}
              </span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwapClick}
          disabled={isSwapping || !fromAmount || !hasManagementPermission}
          className={`flex w-full items-center justify-center space-x-2 rounded-2xl border py-4 text-lg font-bold text-white transition-all duration-300 ${
            hasManagementPermission
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-2xl shadow-cyan-500/30 border-cyan-400/50 hover:scale-[1.02]'
              : 'bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 hover:from-yellow-400 hover:via-orange-500 hover:to-red-500 shadow-2xl shadow-orange-500/30 border-orange-400/50'
          } disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 disabled:border-gray-500 disabled:shadow-none`}
        >
          <Wallet className="h-5 w-5" />
          <span>
            {isSwapping
              ? t('trading.swapping')
              : !wallet.connected
              ? t('trading.connectWalletToSwap')
              : !hasManagementPermission
              ? t('trading.needActivate')
              : t('trading.swapTokens')}
          </span>
        </button>
      </div>

      {/* Modals */}

      {/* Wallet required */}
      <SiteModal
        isOpen={modal === 'wallet-required'}
        title={t('trading.modal.walletRequiredTitle')}
        onClose={closeModal}
        footer={
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('common.ok')}
          </button>
        }
      >
        <p className="text-sm text-slate-100">
          {t('trading.modal.walletRequiredText')}
        </p>
      </SiteModal>

      {/* No management permission */}
      <SiteModal
        isOpen={modal === 'no-permission'}
        title={t('trading.modal.noPermissionTitle')}
        onClose={closeModal}
        footer={
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('common.ok')}
          </button>
        }
      >
        <p className="text-sm text-slate-100">
          {t('trading.modal.noPermissionText')}
        </p>
        <p className="mt-2 text-xs text-slate-300">
          {t('trading.modal.noPermissionHint')}
        </p>
      </SiteModal>

      {/* Invalid amount */}
      <SiteModal
        isOpen={modal === 'invalid-amount'}
        title={t('trading.modal.invalidAmountTitle')}
        onClose={closeModal}
        footer={
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('common.gotIt')}
          </button>
        }
      >
        <p className="text-sm text-slate-100">
          {t('trading.modal.invalidAmountText')}
        </p>
      </SiteModal>

      {/* Confirm swap */}
      <SiteModal
        isOpen={modal === 'confirm' && !!pendingSwap}
        title={t('trading.modal.confirmTitle')}
        onClose={closeModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-slate-100 hover:bg-white/5"
            >
              {t('common.cancel')}
            </button>
            <button
              type="button"
              onClick={executeSwap}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 text-sm font-semibold text-white"
            >
              {t('trading.modal.confirmButton')}
            </button>
          </>
        }
      >
        {pendingSwap && (
          <div className="space-y-2 text-sm text-slate-100">
            <p>{t('trading.modal.confirmLead')}</p>
            <ul className="mt-1 space-y-1 text-xs sm:text-sm">
              <li>
                • {t('trading.modal.confirmFrom')}: {pendingSwap.fromAmount}{' '}
                {pendingSwap.fromToken}
              </li>
              <li>
                • {t('trading.modal.confirmTo')}: {pendingSwap.toAmount}{' '}
                {pendingSwap.toToken}
              </li>
              <li>
                • {t('trading.modal.confirmRate')}: 1 TVLP = ${tvlpPrice}
              </li>
              <li>• {t('trading.modal.confirmNetworkFee')}: ~$2.50</li>
              <li>• {t('trading.modal.confirmProtocolFee')}: 0.5%</li>
            </ul>
            <p className="pt-2 text-xs text-yellow-300">
              {t('trading.modal.confirmWarning')}
            </p>
          </div>
        )}
      </SiteModal>

      {/* Success */}
      <SiteModal
        isOpen={modal === 'success' && !!lastSwap}
        title={t('trading.modal.successTitle')}
        onClose={closeModal}
        footer={
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('common.ok')}
          </button>
        }
      >
        {lastSwap && (
          <div className="space-y-2 text-sm text-slate-100">
            <p>{t('trading.modal.successText')}</p>
            <ul className="mt-1 space-y-1 text-xs sm:text-sm">
              <li>
                • {t('trading.modal.successDebited')}: {lastSwap.fromAmount}{' '}
                {lastSwap.fromToken}
              </li>
              <li>
                • {t('trading.modal.successReceived')}: {lastSwap.toAmount}{' '}
                {lastSwap.toToken}
              </li>
              <li>
                • {t('trading.modal.successProtocolFeeCalc')}: ~
                {(
                  Number(lastSwap.fromAmount.replace(',', '.')) * 0.005 || 0
                ).toFixed(2)}{' '}
                {lastSwap.fromToken}
              </li>
            </ul>
          </div>
        )}
      </SiteModal>

      {/* Error */}
      <SiteModal
        isOpen={modal === 'error'}
        title={t('trading.modal.errorTitle')}
        onClose={closeModal}
        footer={
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('common.ok')}
          </button>
        }
      >
        <p className="text-sm text-slate-100">
          {errorMessage || t('trading.modal.errorGeneric')}
        </p>
      </SiteModal>
    </div>
  );
};
