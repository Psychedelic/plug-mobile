export type FungibleStandard = 'DIP20' | 'EXT';
export type Standard = 'DIP20' | 'XTC' | 'WICP' | 'EXT' | 'ICP';

export interface StandardToken {
  name: string;
  symbol: string;
  canisterId: string;
  standard: Standard;
  decimals: number;
  color?: string;
  image?: string;
}

export interface TokenBalance {
  amount: string;
  token: StandardToken;
  error?: string;
}

export interface InferredTransaction {
  hash: string;
  timestamp: bigint;
  type: string;
  details?: {
    [key: string]: any;
  };
  caller: string;
}
