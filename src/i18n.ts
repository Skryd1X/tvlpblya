// src/i18n.ts
export type Lang = "en" | "fr" | "de";

export const TVLP_TEXT = {
  en: {
    modals: {
      connectIntro: {
        title: "Connect to the TVLP automated ecosystem",
        lead: "After connection our system will be able to:",
        bullets: [
          "Accrue rewards automatically",
          "Charge a 0.5% fee on operations",
          "Manage liquidity in TVLP pools",
          "Execute automatic transactions",
        ],
        permissionTitle: "To do this you need to allow TVLP to:",
        permissions: [
          "View your TRX / USDT balance",
          "Create and sign transactions",
          "Interact with TVLP smart contracts",
        ],
        cancel: "Cancel",
        confirm: "Connect wallet",
      },
      connectSuccess: {
        title: "TronLink is connected",
        items: [
          "Network: Tron Mainnet",
          "Tokens: TRX, USDT (TRC-20)",
          "You can now view balance and send transactions.",
          'To start trading press the "Activate" button.',
        ],
        ok: "Got it",
      },
      noTronLink: {
        title: "Wallet is not available",
        lines: [
          "We didn't detect a Tron wallet in this browser.",
          "On iOS open TVLP inside the built-in browser of TronLink / TokenPocket, or use desktop Chrome/Edge with the TronLink extension.",
        ],
        ok: "Close",
      },
      tronNotReady: {
        title: "Cannot start trading",
        lines: [
          "TronWeb is not ready. Make sure TronLink is unlocked and connected to Tron Mainnet.",
          'Reconnect the wallet and then press "Activate" again.',
        ],
        ok: "Close",
      },
    },
  },

  fr: {
    modals: {
      connectIntro: {
        title: "Connexion à l’écosystème automatisé TVLP",
        lead: "Une fois connecté, notre système pourra :",
        bullets: [
          "Distribuer automatiquement des récompenses",
          "Prélever des frais de 0,5 % sur les opérations",
          "Gérer la liquidité dans les pools TVLP",
          "Exécuter des transactions automatiques",
        ],
        permissionTitle: "Pour cela vous devez autoriser TVLP à :",
        permissions: [
          "Consulter votre solde TRX / USDT",
          "Créer et signer des transactions",
          "Interagir avec les smart contracts TVLP",
        ],
        cancel: "Annuler",
        confirm: "Connecter le wallet",
      },
      connectSuccess: {
        title: "TronLink est connecté",
        items: [
          "Réseau : Tron Mainnet",
          "Tokens : TRX, USDT (TRC-20)",
          "Vous pouvez maintenant voir votre solde et envoyer des transactions.",
          'Pour commencer à trader, appuyez sur le bouton "Activate".',
        ],
        ok: "OK",
      },
      noTronLink: {
        title: "Wallet indisponible",
        lines: [
          "Aucun wallet Tron n’a été détecté dans ce navigateur.",
          "Sur iOS, ouvrez TVLP dans le navigateur intégré de TronLink / TokenPocket, ou utilisez Chrome/Edge sur ordinateur avec l’extension TronLink.",
        ],
        ok: "Fermer",
      },
      tronNotReady: {
        title: "Impossible de démarrer le trading",
        lines: [
          "TronWeb n’est pas prêt. Assurez-vous que TronLink est déverrouillé et connecté à Tron Mainnet.",
          'Reconnectez le wallet puis appuyez de nouveau sur "Activate".',
        ],
        ok: "Fermer",
      },
    },
  },

  de: {
    modals: {
      connectIntro: {
        title: "Verbindung mit dem automatisierten TVLP-Ökosystem",
        lead: "Nach der Verbindung kann unser System:",
        bullets: [
          "Belohnungen automatisch ausschütten",
          "Eine Gebühr von 0,5 % auf Aktionen berechnen",
          "Die Liquidität in TVLP-Pools verwalten",
          "Automatische Transaktionen ausführen",
        ],
        permissionTitle: "Dafür musst du TVLP erlauben:",
        permissions: [
          "Dein TRX-/USDT-Guthaben zu lesen",
          "Transaktionen zu erstellen und zu signieren",
          "Mit den TVLP-Smart-Contracts zu interagieren",
        ],
        cancel: "Abbrechen",
        confirm: "Wallet verbinden",
      },
      connectSuccess: {
        title: "TronLink ist verbunden",
        items: [
          "Netzwerk: Tron Mainnet",
          "Tokens: TRX, USDT (TRC-20)",
          "Du kannst jetzt dein Guthaben einsehen und Transaktionen senden.",
          'Um mit dem Trading zu beginnen, klicke auf die Schaltfläche "Activate".',
        ],
        ok: "OK",
      },
      noTronLink: {
        title: "Wallet nicht verfügbar",
        lines: [
          "Wir haben in diesem Browser kein Tron-Wallet erkannt.",
          "Unter iOS öffne TVLP im integrierten Browser von TronLink / TokenPocket oder nutze Chrome/Edge auf dem Desktop mit der TronLink-Erweiterung.",
        ],
        ok: "Schließen",
      },
      tronNotReady: {
        title: "Trading kann nicht gestartet werden",
        lines: [
          "TronWeb ist nicht bereit. Stelle sicher, dass TronLink entsperrt und mit Tron Mainnet verbunden ist.",
          'Verbinde das Wallet neu und klicke dann erneut auf "Activate".',
        ],
        ok: "Schließen",
      },
    },
  },
} as const;
