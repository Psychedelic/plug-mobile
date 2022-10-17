import { StackScreenProps } from '@react-navigation/stack';

import Routes from '@/navigation/Routes';

import { WalletConnectCallRequest } from './redux';

export type RootStackParamList = {
  [Routes.NFTS]: undefined;
  [Routes.TOKENS]: undefined;
  [Routes.PROFILE_SCREEN]: undefined;
  [Routes.SWIPE_LAYOUT]: undefined;
  [Routes.LOGIN_SCREEN]: { manualLock: boolean };
  [Routes.WELCOME_SCREEN]: undefined;
  [Routes.CREATE_PASSWORD]: undefined;
  [Routes.IMPORT_SEED_PHRASE]: undefined;
  [Routes.BACKUP_SEED_PHRASE]: undefined;
  [Routes.CONNECTION_ERROR]: undefined;
  [Routes.WALLET_CONNECT_INITIAL_CONNECTION]: WalletConnectCallRequest;
  [Routes.WALLET_CONNECT_FLOWS]: undefined;
  [Routes.WALLET_CONNECT_ERROR]: { dappName: string; dappUrl: string };
  [Routes.SETTINGS_STACK]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.CONTACTS]: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
