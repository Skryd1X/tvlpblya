// src/utils/tron.ts
export type TronStatus = "no-tronlink" | "not-ready" | "ok";

declare global {
  interface Window {
    tronWeb?: any;
    tronLink?: any;
  }
}

/**
 * Ждём TronWeb от TronLink, максимум timeout мс.
 */
export async function waitForTronWeb(timeout = 10000): Promise<TronStatus> {
  if (typeof window === "undefined") return "no-tronlink";

  const hasTron = !!window.tronLink || !!window.tronWeb;
  if (!hasTron) return "no-tronlink";

  const started = Date.now();

  return new Promise<TronStatus>((resolve) => {
    const check = () => {
      const tw = window.tronWeb;

      if (tw && tw.ready && tw.defaultAddress?.base58) {
        resolve("ok");
        return;
      }

      if (Date.now() - started > timeout) {
        resolve("not-ready");
        return;
      }

      setTimeout(check, 200);
    };

    // Явно просим доступ к аккаунту, если TronLink поддерживает request
    if (window.tronLink?.request) {
      window.tronLink
        .request({ method: "tron_requestAccounts" })
        .catch(() => {})
        .finally(check);
    } else {
      check();
    }
  });
}

/**
 * Информация о текущем кошельке (для текста в модалке).
 */
export function getTronInfo() {
  if (typeof window === "undefined" || !window.tronWeb) return null;
  const tw = window.tronWeb;

  const networkHost = tw.fullNode?.host || "";
  const network = networkHost.includes("nile")
    ? "Nile Testnet"
    : "Tron Mainnet";

  return {
    address: tw.defaultAddress?.base58 || "",
    network,
  };
}
