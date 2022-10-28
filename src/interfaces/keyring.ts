export type FungibleStandard = 'DIP20' | 'EXT';
export type NonFungibleStandard = 'DIP721';
export type Standard = 'DIP20' | 'XTC' | 'WICP' | 'EXT' | 'ICP' | string;

export interface StandardToken {
  name: string;
  symbol: string;
  canisterId: string;
  standard: Standard;
  decimals: number;
  color?: string;
  logo?: string;
  fee?: bigint | number;
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

export interface NFTInfo {
  icon?: string;
  name: string;
  standard: string;
  canisterId: string;
  description: string;
  // TODO: replace any
  tokens: any[];
  registeredBy: any[];
}
