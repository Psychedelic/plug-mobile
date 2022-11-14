import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Routes from '@/navigation/Routes';

import {
  Asset,
  CollectionToken,
  ConnectedApp,
  WalletConnectCallRequest,
} from './redux';

export type RootStackParamList = {
  [Routes.NFTS]: undefined;
  [Routes.TOKENS]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.SWIPE_LAYOUT]: undefined;
  [Routes.LOGIN]: { manualLock: boolean };
  [Routes.WELCOME]: undefined;
  [Routes.CREATE_PASSWORD]: { flow: 'create' | 'import' };
  [Routes.IMPORT_SEED_PHRASE]: {
    password: string;
    shouldSaveBiometrics: boolean;
  };
  [Routes.BACKUP_SEED_PHRASE]: { mnemonic: string };
  [Routes.CONNECTION_ERROR]: undefined;
  [Routes.WALLET_CONNECT_INITIAL_CONNECTION]: WalletConnectCallRequest;
  [Routes.WALLET_CONNECT_FLOWS]: undefined;
  [Routes.WALLET_CONNECT_ERROR]: { dappName: string; dappUrl: string };
  [Routes.MODAL_STACK]: NavigatorScreenParams<ModalStackParamList>;
};

export type ModalStackParamList = {
  [Routes.SETTINGS]: undefined;
  [Routes.CONTACTS]: undefined;
  [Routes.APPROVED_CANISTERS]: { app: ConnectedApp };
  [Routes.SEND]: { token?: Asset; nft?: CollectionToken };
  [Routes.NFT_LIST]: { canisterId: string };
  [Routes.NFT_DETAIL]: {
    canisterId: string;
    index: string | number;
    showBack?: boolean;
  };
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type ModalScreenProps<T extends keyof ModalStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ModalStackParamList, T>,
    RootScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
