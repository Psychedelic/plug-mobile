//TODO Should this be in the controller package?

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
