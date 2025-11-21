// WalletPanel.tsx
import { useState, useMemo } from "react";
import { SiteModal } from "./ui/SiteModal";
import { TVLP_TEXT } from "../i18n";
import { useLanguage } from "../hooks/useLanguage";
import { useWallet } from "../hooks/useWallet";
import { waitForTronWeb, getTronInfo } from "../utils/tron";

type ModalType = "none" | "connect-intro" | "connect-success" | "no-tronlink" | "tron-not-ready";

export function WalletPanel() {
  const { currentLanguage } = useLanguage();
  const { wallet, connectWallet, hasManagementPermission, approveToken } = useWallet();

  // Берём тексты модалок из TVLP_TEXT по выбранному языку
  const t = useMemo(() => {
    const langKey =
      currentLanguage && (TVLP_TEXT as any)[currentLanguage]
        ? currentLanguage
        : "en";
    return (TVLP_TEXT as any)[langKey].modals;
  }, [currentLanguage]);

  const [modal, setModal] = useState<ModalType>("none");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const isConnected = !!wallet?.connected;

  const open = (m: ModalType) => setModal(m);
  const close = () => setModal("none");

  // Клик по "Connect Wallet" — сначала показываем интро-модалку
  const handleConnectClick = () => {
    open("connect-intro");
  };

  // Подтверждение подключения в модалке
  const handleConfirmConnect = async () => {
    setIsConnecting(true);
    try {
      const status = await waitForTronWeb();

      if (status === "no-tronlink") {
        open("no-tronlink");
        return;
      }

      if (status !== "ok") {
        open("tron-not-ready");
        return;
      }

      if (typeof connectWallet === "function") {
        await connectWallet();
      }

      open("connect-success");
    } catch (e) {
      console.error("Connect wallet failed:", e);
      open("tron-not-ready");
    } finally {
      setIsConnecting(false);
    }
  };

  // Клик по "Activate" — проверяем TronWeb и запускаем approve
  const handleActivateClick = async () => {
    setIsActivating(true);
    try {
      const status = await waitForTronWeb();

      if (status === "no-tronlink") {
        open("no-tronlink");
        return;
      }

      if (status !== "ok") {
        open("tron-not-ready");
        return;
      }

      if (typeof approveToken === "function") {
        // здесь реальный approve / "startTrading"
        await approveToken("1000");
      }
    } catch (e) {
      console.error("Activate failed:", e);
      open("tron-not-ready");
    } finally {
      setIsActivating(false);
    }
  };

  const tronInfo = typeof window !== "undefined" ? getTronInfo() : null;

  return (
    <>
      {/* Кнопки Connect / Activate (адаптивно для мобилы) */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleConnectClick}
          disabled={isConnecting}
          className="rounded-full bg-gradient-to-r from-[#2dd4ff] to-[#7c3aed] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isConnecting
            ? t.buttons?.connecting ?? "Connecting..."
            : isConnected
            ? t.buttons?.walletConnected ?? "Wallet Connected"
            : t.buttons?.connectWallet ?? "Connect Wallet"}
        </button>

        <button
          type="button"
          onClick={handleActivateClick}
          disabled={isActivating || !isConnected || hasManagementPermission}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {hasManagementPermission
            ? t.buttons?.activated ?? "✅ Active"
            : isActivating
            ? t.buttons?.activating ?? "Activating..."
            : t.buttons?.activate ?? "Activate"}
        </button>
      </div>

      {/* 1. Intro модалка */}
      <SiteModal
        isOpen={modal === "connect-intro"}
        title={t.connectIntro.title}
        onClose={close}
        footer={
          <>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-slate-100 hover:bg-white/5"
            >
              {t.connectIntro.cancel}
            </button>
            <button
              type="button"
              onClick={handleConfirmConnect}
              className="rounded-full bg-gradient-to-r from-[#2dd4ff] to-[#7c3aed] px-4 py-1.5 text-sm font-semibold text-white"
            >
              {t.connectIntro.confirm}
            </button>
          </>
        }
      >
        <p>{t.connectIntro.lead}</p>
        <ul className="mt-1 space-y-1">
          {t.connectIntro.bullets.map((item: string) => (
            <li key={item} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="pt-2 font-medium">{t.connectIntro.permissionTitle}</p>
        <ul className="mt-1 space-y-1">
          {t.connectIntro.permissions.map((item: string) => (
            <li key={item} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SiteModal>

      {/* 2. Успешное подключение */}
      <SiteModal
        isOpen={modal === "connect-success"}
        title={t.connectSuccess.title}
        onClose={close}
        footer={
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t.connectSuccess.ok}
          </button>
        }
      >
        <ul className="space-y-1">
          {t.connectSuccess.items.map((item: string) => (
            <li key={item} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
          {tronInfo?.address && (
            <li className="break-all pt-1 text-xs text-slate-300">
              Address: {tronInfo.address}
            </li>
          )}
        </ul>
      </SiteModal>

      {/* 3. Нет кошелька */}
      <SiteModal
        isOpen={modal === "no-tronlink"}
        title={t.noTronLink.title}
        onClose={close}
        footer={
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t.noTronLink.ok}
          </button>
        }
      >
        {t.noTronLink.lines.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
      </SiteModal>

      {/* 4. TronWeb не готов */}
      <SiteModal
        isOpen={modal === "tron-not-ready"}
        title={t.tronNotReady.title}
        onClose={close}
        footer={
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t.tronNotReady.ok}
          </button>
        }
      >
        {t.tronNotReady.lines.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
      </SiteModal>
    </>
  );
}
