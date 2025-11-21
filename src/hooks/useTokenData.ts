import { useState, useEffect, useCallback } from 'react';
import { TokenData } from '../types';

const BASE_PRICE = 184;

export const useTokenData = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    price: BASE_PRICE,           // фиксируем базу
    change24h: 12.5,
    volume24h: 2_500_000,        // $2.5M volume
    liquidity: 920_000,          // $920K liquidity
    marketCap: BASE_PRICE * 1_000_000, // 1M total supply
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenData = useCallback(
    async (options?: { showLoader?: boolean }) => {
      const showLoader = options?.showLoader ?? false;

      if (showLoader) setIsLoading(true);
      setError(null);

      try {
        // псевдо-API для демо
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Небольшие флуктуации вокруг $184
        const fluctuation = (Math.random() - 0.5) * 2; // ±$1
        const newPrice = Math.max(180, Math.min(188, BASE_PRICE + fluctuation));

        const change24h =
          ((newPrice - BASE_PRICE) / BASE_PRICE) * 100 +
          (Math.random() - 0.5) * 5;

        const volume24h = 2_000_000 + Math.random() * 1_000_000; // $2–3M
        const liquidity = 900_000 + Math.random() * 100_000;      // $900K–1M

        setTokenData({
          price: newPrice,
          change24h,
          volume24h,
          liquidity,
          marketCap: newPrice * 1_000_000, // 1M supply
        });
      } catch (err) {
        console.error('Error fetching token data:', err);
        setError('Failed to fetch token data');
      } finally {
        if (showLoader) setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let isActive = true;

    // первый запрос — с лоадером
    fetchTokenData({ showLoader: true });

    // авто-обновление каждые 30 секунд без лоадера, чтобы не мигало на мобилках
    const intervalId = setInterval(() => {
      if (!isActive) return;
      fetchTokenData({ showLoader: false });
    }, 30_000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [fetchTokenData]);

  return {
    tokenData,
    isLoading,
    error,
    refetch: () => fetchTokenData({ showLoader: true }),
  };
};
