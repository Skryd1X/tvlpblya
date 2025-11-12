import { useState, useEffect } from 'react';
import { TokenData } from '../types';

export const useTokenData = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    price: 184, // Fixed price at $184
    change24h: 12.5,
    volume24h: 2500000, // $2.5M volume
    liquidity: 920000, // $920K liquidity
    marketCap: 184000000 // $184M market cap
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTokenData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate realistic price fluctuation around $184
      const basePrice = 184;
      const fluctuation = (Math.random() - 0.5) * 2; // ±$1 fluctuation
      const newPrice = Math.max(180, Math.min(188, basePrice + fluctuation));
      
      // Simulate realistic volume and change
      const change24h = ((newPrice - basePrice) / basePrice) * 100 + (Math.random() - 0.5) * 5;
      const volume24h = 2000000 + Math.random() * 1000000; // $2-3M volume
      const liquidity = 900000 + Math.random() * 100000; // $900K-1M liquidity
      
      setTokenData(prev => ({
        ...prev,
        price: newPrice,
        change24h,
        volume24h,
        liquidity,
        marketCap: newPrice * 1000000 // 1M total supply
      }));
    } catch (err) {
      setError('Failed to fetch token data');
      console.error('Error fetching token data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tokenData,
    isLoading,
    error,
    refetch: fetchTokenData
  };
};