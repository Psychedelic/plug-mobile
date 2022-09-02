import { Contact } from '@/screens/tabs/Profile/screens/Contacts/utils';

// Override the default state interface
declare module 'react-redux' {
  interface DefaultRootState {
    icp: IcpState;
    keyring: KeyringState;
    user: UserState;
  }
}

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
  plug?: any;
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
  logo?: string;
}

export interface IcpState {
  icpPrice: number;
}

export interface CurrentWallet {
  name: string;
  walletNumber: number;
  principal: string;
  accountId: string;
  connectedApps: any[];
  assets: any;
  icon: string;
  nftCollections: any[];
  icnsData: any;
}

export interface KeyringState {
  //TODO: Add types here
  instance: any;
  isInitialized: boolean;
  isUnlocked: boolean;
  currentWallet: CurrentWallet;
  wallets: [];
}

export interface UserState {
  assets: Asset[];
  assetsError: string | null;
  assetsLoading: boolean;
  contacts: Contact[];
  contactsLoading: boolean;
  transaction: Transaction;
  transactions: Transaction[];
  transactionsError: string | null;
  transactionsLoading: boolean;
  collections: Collection[];
  collectionsError: string | null;
  collectionsLoading: boolean;
  usingBiometrics: boolean;
  biometricsAvailable: boolean;
}
