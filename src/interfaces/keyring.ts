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

interface BaseTransactionDetail {
  canisterId: string;
  status: string; //COMPLETED | succeeded
  fee: {
    amount: number;
    currency: {
      symbol: string;
      decimals: number;
    };
  };
  from: {
    principal: string;
    icns?: string;
  };
  to: {
    principal: string;
    icns?: string;
  };
  currency: {
    symbol: string;
    decimals: number;
  };
  amount: number;
  token?: {
    symbol: string;
    canisterId: string;
    name: string;
    decimals: number;
    standard: Standard;
  };
}

interface SwapDetail {
  canisterId: string;
  pairId: string;
  amountIn: string;
  amountOut: string;
  reserve0: string;
  reserve1: string;
  fee: string;
  canisterInfo: any;
  tokenId: string;
  from: {
    principal: string;
    icns?: string;
  };
  to: {
    principal: string;
    icns?: string;
  };
  sonicData: {
    swap: {
      to: {
        thumbnail: string;
        frontend: string[];
        details: {
          symbol: string;
          standard: Standard;
          total_supply: number;
          verified: boolean;
          decimals: number;
          fee: number;
        };
        principal_id: {
          _arr: any;
          _isPrincipal: boolean;
        };
        logo: string;
        website: string;
        standard: Standard;
        total_supply: number[];
        name: string;
        description: string;
      };
      amountIn: string;
      amountOut: string;
    };
  };
}

interface DepositDetail {
  canisterId: string;
  tokenId: string;
  tokenTxid: number;
  amount: number;
  fee: number;
  balance: number;
  totalSupply: number;
  from: {
    principal: string;
    icns?: string;
  };
  to: {
    principal: string;
    icns?: string;
  };
  canisterInfo: {
    canisterId: string;
    url: string;
    name: string;
    description: string;
    version: any;
    logo_url: string;
    icon: string;
  };
  sonicData: {
    amount: number;
    token: {
      thumbnail: string;
      frontend: string[];
      details: {
        symbol: string;
        standard: Standard;
        total_supply: number;
        verified: boolean;
        decimals: number;
        fee: number;
      };
      principal_id: {
        _arr: any;
        _isPrincipal: boolean;
      };
      logo: string;
      website: string;
      standard: Standard;
      total_supply: number[];
      name: string;
      description: string;
    };
  };
}

export interface InferredTransaction {
  hash: string;
  timestamp: bigint;
  type: string; // SEND | RECEIVE | APPROVE | swap | deposit | transfer_from | mint | makeListing
  details?: {
    [key: string]: any;
  };
  caller: string;
}
