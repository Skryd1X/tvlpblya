// Simple helpers for mobile & wallet detection

export const isMobile = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ''
  );
};

export const hasInjectedProvider = () => {
  if (typeof window === 'undefined') return false;

  const w = window as any;
  // tronLink / tronWeb for Tron, ethereum for EVM wallets
  return Boolean(
    w?.tronLink ||
      w?.tronWeb || // presence of tronWeb is enough for "injected"
      w?.ethereum
  );
};

/**
 * Soft attempt to open TronLink mobile app with current page URL.
 * If nothing happens within ~1.2s, redirect user to TronLink website.
 */
export function openTronLinkDeeplink() {
  if (typeof window === 'undefined') return;

  const url = encodeURIComponent(window.location.href);
  const deeplinks = [
    `tronlink://open_url?url=${url}`,
    `tronlinkoutside://open_url?url=${url}`,
    `tronlink://open?url=${url}`,
  ];

  const start = Date.now();

  // Try the first deeplink; if app is not installed, nothing will happen
  window.location.href = deeplinks[0];

  setTimeout(() => {
    // If we are still here after ~1.2s, fallback to TronLink website
    if (Date.now() - start < 1300) {
      window.location.href = 'https://www.tronlink.org/';
    }
  }, 1200);
}
