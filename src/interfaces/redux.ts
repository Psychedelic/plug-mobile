import { Contact } from '@/screens/tabs/Profile/screens/Contacts/utils';

export interface CollectionToken {
  id: string;
  index: number | string;
  canister: string;
  url: string;
  standard: string;
  collection: string;
  owner?: string;
  metadata?: any;
}

export interface Collection {
  name: string;
  canisterId: string;
  standard: string;
  description: string;
  icon: string;
  tokens: CollectionToken[];
}

export interface CanisterInfo {
  thumbnail: string;
  name: string;
  frontend: string[];
  description: string;
  details: {
    standard: string;
    symbol?: string;
    total_supply?: number;
    verified?: boolean;
    decimals?: number;
    fee?: number;
  };
  principal_id: {
    _arr: any;
    _isPrincipal: boolean;
  };
  logo?: string;
  icon?: string;
  website?: string;
  standard: string;
  total_supply?: number[];
  symbol?: string;
}

interface Currency {
  symbol: string;
  decimals: number;
}

export interface TransactionDetails {
  status: string; //check if this is correct
  fee: {
    amount: string;
    currency: Currency;
  };
  from: string;
  amount: string;
  currency: Currency;
  to: string;
  caller: string;
}

export interface Transaction {
  amount: string | number;
  value: string | number;
  icon: string;
  type: string; //TODO: Add types here SEND/RECEIVE. Check ACTIVITY_TYPES
  symbol: string;
  hash: string;
  to: string;
  from: string;
  date: string;
  status?: number | string;
  image: string;
  canisterId?: string;
  plug?: null; //TODO: What's this?
  canisterInfo?: CanisterInfo;
  details?: TransactionDetails;
}

export interface Asset {
  amount: number;
  value: number;
  icon?: string;
  symbol: string;
  decimals: number;
  name: string;
  canisterId: string;
}

export interface IcpState {
  icpPrice: number;
}

export interface KeyringState {
  //TODO: Add types here
}

export interface UserState {
  assets: Asset[];
  assetsError: boolean;
  assetsLoading: boolean;
  contacts: Contact[];
  contactsLoading: boolean;
  transaction: Transaction;
  transactions: Transaction[];
  collections: Collection[];
  transactionsError: boolean;
  transactionsLoading: boolean;
  collectionsError: boolean;
  usingBiometrics: boolean;
  biometricsAvailable: boolean;
}

export interface State {
  icp: IcpState;
  keyring: KeyringState;
  user: UserState;
}
