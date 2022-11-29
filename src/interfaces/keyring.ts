import { WalletNFTInfo } from '@psychedelic/plug-controller/dist/interfaces/plug_wallet';

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

export interface CollectionInfo extends WalletNFTInfo {}
