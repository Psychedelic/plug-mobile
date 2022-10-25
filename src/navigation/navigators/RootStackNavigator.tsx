import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '@/interfaces/navigation';
import KeyRing from '@/modules/keyring';
import BackupSeedPhrase from '@/screens/auth/BackupSeedPhrase';
import CreatePassword from '@/screens/auth/CreatePassword';
import ImportSeedPhrase from '@/screens/auth/ImportSeedPhrase';
import Login from '@/screens/auth/Login';
import Welcome from '@/screens/auth/Welcome';
import ConnectionError from '@/screens/error/ConnectionError';
import WCFlows from '@/screens/flows/WalletConnect/screens/Flows';
import WCInitialConnection from '@/screens/flows/WalletConnect/screens/InitialConnection';
import WCTimeoutError from '@/screens/flows/WalletConnect/screens/TimeoutError';

import Routes from '../Routes';
import { rootStackOptions, settingsGroupOptions } from '../utils';
import SettingsNavigator from './SettingsNavigator';
import SwipeNavigator from './SwipeNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const keyring = KeyRing.getInstance();

  const initialRoute = keyring.isInitialized
    ? keyring.isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN
    : Routes.WELCOME;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={rootStackOptions}>
      <Stack.Group>
        <Stack.Screen name={Routes.WELCOME} component={Welcome} />
        <Stack.Screen name={Routes.LOGIN} component={Login} />
        <Stack.Screen
          name={Routes.CREATE_PASSWORD}
          component={CreatePassword}
        />
        <Stack.Screen
          name={Routes.BACKUP_SEED_PHRASE}
          component={BackupSeedPhrase}
        />
        <Stack.Screen
          name={Routes.IMPORT_SEED_PHRASE}
          component={ImportSeedPhrase}
        />
        <Stack.Screen
          name={Routes.SWIPE_LAYOUT}
          component={SwipeNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Routes.CONNECTION_ERROR}
          component={ConnectionError}
        />
        <Stack.Screen
          name={Routes.WALLET_CONNECT_INITIAL_CONNECTION}
          component={WCInitialConnection}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Routes.WALLET_CONNECT_FLOWS}
          component={WCFlows}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Routes.WALLET_CONNECT_ERROR}
          component={WCTimeoutError}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={settingsGroupOptions}>
        <Stack.Screen
          name={Routes.SETTINGS_STACK}
          component={SettingsNavigator}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
