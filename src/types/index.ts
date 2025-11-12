export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TokenData {
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
}

export interface WalletConnection {
  address: string;
  balance: number;
  connected: boolean;
}

export interface Translation {
  [key: string]: string | Translation;
}