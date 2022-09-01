import { Principal } from '@dfinity/principal';
import { Token } from '@psychedelic/dab-js/dist/interfaces/token';

import { FungibleStandard, Standard } from './keyring';

export type { BalanceResponse } from '@psychedelic/dab-js/dist/interfaces/token';

export interface DABToken extends Token {
  canisterId: Principal;
  thumbnail?: string;
  details?: {
    symbol: string;
    standard: Standard;
    total_supply: number;
    verified: boolean;
    decimals: number;
    fee: number;
  };
}

export interface CustomToken {
  canisterId: Principal;
  standard: FungibleStandard;
}
