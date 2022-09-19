import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '@/navigation/Routes';

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
  [Routes.WALLET_CONNECT_INITIAL_CONNECTION]: undefined;
  [Routes.WALLET_CONNECT_FLOWS]: undefined;
};

export type TNavigation<R extends keyof RootStackParamList> = {
  route: TRoute<R>;
  navigation: StackNavigationProp<RootStackParamList, R>;
};

export type TRoute<R extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  R
>;
