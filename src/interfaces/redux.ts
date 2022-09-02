import WalletConnect from '@walletconnect/client';

import { Contact } from '@/screens/tabs/Profile/screens/Contacts/utils';

import { WCWhiteListItem } from './walletConnect';

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
  isPrelocked: boolean;
  currentWallet: CurrentWallet;
  wallets: [];
}

export interface ConnectedApp {
  name: string;
  canisterList: WCWhiteListItem[];
  imageUri: string;
  lastConection: Date;
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
  connectedApps: ConnectedApp[];
}

export interface WalletConnectCallRequest {
  clientId: string;
  dappName: string;
  dappScheme: string;
  dappUrl: string;
  imageUrl: string;
  methodName: string;
  args: any;
  peerId: string;
  requestId: number;
  executor: any;
}

export interface WalletConnectSession {
  pending: boolean;
  walletConnector: WalletConnect;
  meta: any;
}

export interface WalletConnectState {
  pendingRedirect: {
    [requestId: string]: {
      pending: boolean;
      schema?: string;
    };
  };
  pendingCallRequests: { [requestId: number]: WalletConnectCallRequest };
  sessions: {
    [peerId: string]: WalletConnectSession;
  };
  bridgeTimeout: {
    [requestId: string]: {
      pending: boolean;
      timeout: number;
      onBridgeContact: any;
    };
  };
}

export interface State {
  icp: IcpState;
  keyring: KeyringState;
  user: UserState;
  walletconnect: WalletConnectState;
}
