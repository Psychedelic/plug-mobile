import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
};

export type TNavigation<R extends keyof RootStackParamList> = {
  route: TRoute<R>;
  navigation: StackNavigationProp<RootStackParamList, R>;
};

export type TRoute<R extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  R
>;
