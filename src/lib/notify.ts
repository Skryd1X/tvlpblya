// Отправляем максимум безопасных деталей о подключении кошелька
export async function notifyNewWallet(
  address: string,
  network?: string,
  extra?: Record<string, unknown> // опционально
) {
  try {
    const payload: Record<string, unknown> = {
      address,
      network,
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      ts: new Date().toISOString(),
      ...extra,
    };

    // Попробуем определить провайдер/сеть
    if (typeof window !== "undefined") {
      const w: any = window as any;

      // Тип/провайдер
      if (w.tronLink) payload.walletType = "TronLink";
      else if (w.ethereum && w.ethereum.isMetaMask) payload.walletType = "MetaMask";
      else if (w.ethereum) payload.walletType = "EVM Wallet";
      else payload.walletType = payload.walletType || "unknown";

      // TRON детали (base58/hex + узел)
      if (w.tronWeb?.defaultAddress) {
        payload.tron = {
          base58: w.tronWeb.defaultAddress.base58 || null,
          hex: w.tronWeb.defaultAddress.hex || null,
          node: w.tronWeb?.fullNode?.host || null,
        };
        // если сеть не указана — угадаем по host
        if (!network && w.tronWeb?.fullNode?.host) {
          const host = String(w.tronWeb.fullNode.host);
          payload.network = /trongrid\.io/i.test(host) ? "tron-mainnet"
                          : /nile|shasta/i.test(host) ? "tron-testnet"
                          : "tron-unknown";
        }
      }

      // EVM chainId/клиент, если есть
      if (w.ethereum) {
        try { payload.chainId = await w.ethereum.request({ method: "eth_chainId" }); } catch {}
        try { payload.web3Client = await w.ethereum.request({ method: "web3_clientVersion" }); } catch {}
      }
    }

    await fetch("/.netlify/functions/notify-wallet", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (e) {
    console.warn("notifyNewWallet failed", e);
  }
}
