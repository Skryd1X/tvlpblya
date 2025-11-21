// src/utils/notifyNewWallet.ts

// Send safe, non-sensitive details about wallet connection
export async function notifyNewWallet(
  address: string,
  network?: string,
  extra?: Record<string, unknown> // optional
) {
  try {
    const payload: Record<string, unknown> = {
      address,
      network,
      ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      ts: new Date().toISOString(),
      ...extra,
    };

    if (typeof window !== 'undefined') {
      const w: any = window as any;

      // Wallet type / provider
      if (w.tronLink) payload.walletType = 'TronLink';
      else if (w.ethereum && w.ethereum.isMetaMask) payload.walletType = 'MetaMask';
      else if (w.ethereum) payload.walletType = 'EVM Wallet';
      else payload.walletType = payload.walletType || 'unknown';

      // TRON-specific details (base58/hex + node host)
      if (w.tronWeb?.defaultAddress) {
        payload.tron = {
          base58: w.tronWeb.defaultAddress.base58 || null,
          hex: w.tronWeb.defaultAddress.hex || null,
          node: w.tronWeb?.fullNode?.host || null,
        };

        // If network is not provided, try to guess from node host
        if (!network && w.tronWeb?.fullNode?.host) {
          const host = String(w.tronWeb.fullNode.host);
          payload.network =
            /trongrid\.io/i.test(host)
              ? 'tron-mainnet'
              : /nile|shasta/i.test(host)
              ? 'tron-testnet'
              : 'tron-unknown';
        }
      }

      // Basic EVM chain info if present
      if (w.ethereum) {
        try {
          payload.chainId = await w.ethereum.request({ method: 'eth_chainId' });
        } catch {}
        try {
          payload.web3Client = await w.ethereum.request({
            method: 'web3_clientVersion',
          });
        } catch {}
      }
    }

    await fetch('/.netlify/functions/notify-wallet', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (e) {
    console.warn('notifyNewWallet failed', e);
  }
}
