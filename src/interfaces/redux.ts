import { Contact } from '@/screens/tabs/Profile/screens/Contacts/utils';

export interface Token {
  id: string;
  index: number | string;
  canister: string;
  url: string;
  standard: string;
  collection: string;
  metadata?: [];
}

export interface Collection {
  name: string;
  canisterId: string;
  standar: string;
  descirption: string;
  icon: string;
  tokens: Token[];
}

export interface CanisterInfo {
  //TODO: Add types here
}

export interface TransactionDetails {
  //TODO: Add types here
}

export interface Transaction {
  amount: string | number;
  value: string | number;
  icon: string;
  type: string;
  symbol: string;
  hash: string;
  to: string;
  from: string;
  date: string;
  status?: number | string;
  image: string;
  canisterId?: string;
  plug?: null;
  canisterInfo?: CanisterInfo;
  details?: TransactionDetails;
}

export interface Assets {
  //TODO: Add types here
}

export interface IcpState {
  //TODO: Add types here
}

export interface KeyringState {
  //TODO: Add types here
  instance: any;
  isInitialized: boolean;
  isUnlocked: boolean;
  currentWallet: any;
  wallets: [];
}

export interface UserState {
  assets: Assets;
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
  scrollOnProfile: boolean;
  scrollOnNFTs: boolean;
}

export interface State {
  icp: IcpState;
  keyring: KeyringState;
  user: UserState;
}
