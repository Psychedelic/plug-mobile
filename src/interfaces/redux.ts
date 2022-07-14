import { Contact } from '@/screens/tabs/Profile/screens/Contacts/utils';

export interface CollectionToken {
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
  tokens: CollectionToken[];
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

export interface AssetToken {
  symbol: string;
  canisterId: string;
  name: string;
  decimals: number;
  standard: string; // TODO: Should we add an enum here? Ask Rocky
}

export interface Asset {
  token: AssetToken;
  amount: string;
}

export interface IcpState {
  //TODO: Add types here
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
  scrollOnProfile: boolean;
  scrollOnNFTs: boolean;
}

export interface State {
  icp: IcpState;
  keyring: KeyringState;
  user: UserState;
}
