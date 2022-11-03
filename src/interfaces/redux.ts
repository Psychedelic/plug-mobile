import WalletConnect from '@walletconnect/client';

import { ICNSData } from './icns';
import { WCWhiteListItem } from './walletConnect';

export interface State {
  icp: IcpState;
  keyring: KeyringState;
  user: UserState;
  alert: AlertState;
  walletconnect: WalletConnectState;
}

export interface CollectionToken {
  index: number | string;
  canister: string;
  url: string;
  standard: string;
  metadata: any;
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
  type: string; //TODO: Add types here SEND/RECEIVE. Check ACTIVITY_TYPES
  symbol: string;
  hash: string;
  to: string;
  from: string;
  date: Date;
  image: string;
  value?: string | number;
  status?: number | string;
  icon?: string;
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
  fee: number;
}

export interface IcpState {
  icpPrice: number;
}

export interface Wallet {
  name: string;
  walletId: string;
  orderNumber: number;
  principal: string;
  accountId: string;
  icnsData?: ICNSData;
  type: string;
  keyPair?: string;
  icon?: string;
}

export interface KeyringState {
  isInitialized: boolean;
  isUnlocked: boolean;
  currentWallet?: Wallet;
  wallets: Wallet[];
  icnsDataLoading: boolean;
  isPrelocked: boolean;
}

export interface Contact {
  image: string;
  name: string;
  id: string;
}

export interface ConnectedApp {
  name: string;
  canisterList: WCWhiteListItem[];
  lastConnection: Date;
  account: string;
  imageUri?: string;
}
export interface UserState {
  assets: Asset[];
  assetsError?: string;
  assetsLoading: boolean;
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError?: string;
  transaction: {
    status: string | null;
  };
  transactions: Transaction[];
  transactionsError?: string;
  transactionsLoading: boolean;
  collections: Collection[];
  collectionsError?: string;
  collectionsLoading: boolean;
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
      scheme?: string;
    };
  };
  pendingCallRequests: { [requestId: number]: WalletConnectCallRequest };
  sessions: {
    [peerId: string]: WalletConnectSession;
  };
  bridgeTimeouts: {
    [requestId: string]: {
      pending: boolean;
      timeout: number;
      onBridgeContact: any;
    };
  };
}

export interface AlertState {
  closeAllModals: boolean;
}
