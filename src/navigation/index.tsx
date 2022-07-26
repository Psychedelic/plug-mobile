import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { AppState, Linking, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { useSelector } from 'react-redux';

import { Colors } from '@/constants/theme';
import { State } from '@/interfaces/redux';
import SwipeNavigator from '@/navigation/navigators/SwipeNavigator';
import BackupSeedPhrase from '@/screens/auth/BackupSeedPhrase';
import CreatePassword from '@/screens/auth/CreatePassword';
import ImportSeedPhrase from '@/screens/auth/ImportSeedPhrase';
import Login from '@/screens/auth/Login';
import Welcome from '@/screens/auth/Welcome';
import ConnectionError from '@/screens/error/ConnectionError';
import WCFlows from '@/screens/flows/WalletConnect/screens/Flows';
import WCInitialConnection from '@/screens/flows/WalletConnect/screens/InitialConnection';
import { handleDeepLink } from '@/utils/deepLink';

import Routes, { getScreenName } from './Routes';

// TODO: Change this with the correct values
export type RootStackParamList = {
  NFTs: undefined;
  Tokens: undefined;
  Profile: undefined;
  SwipeLayout: undefined;
  LoginScreen: { manualLock: boolean };
  WelcomeScreen: undefined;
  CreatePassword: undefined;
  ImportSeedPhrase: undefined;
  BackupSeedPhrase: undefined;
  ConnectionError: undefined;
  WCInitialConnection: undefined;
  WCFlows: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = ({ routingInstrumentation }: any, navigationRef: any) => {
  const { isInitialized, isUnlocked } = useSelector(
    (state: State) => state.keyring
  );
  const timeoutId = useRef<any>(null);

  const handleLockState = () => {
    // Matt
    // dispatch(setUnlocked(false));
    timeoutId.current = null;
  };

  const handleAppStateChange = async (nextAppState: string) => {
    const initialLink = await Linking.getInitialURL();

    if (nextAppState === 'background') {
      timeoutId.current = setTimeout(handleLockState, 120000);
    }

    if (nextAppState === 'active' && timeoutId) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (initialLink) {
      handleDeepLink(initialLink);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    const deepLinkListener = Linking.addEventListener('url', link => {
      handleDeepLink(link.url);
    });

    return () => {
      subscription.remove();
      deepLinkListener.remove();
    };
  }, []);

  const initialRoute = isInitialized
    ? isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN_SCREEN
    : Routes.WELCOME_SCREEN;

  const navTheme = {
    colors: {
      background: Colors.Black.Primary,
    },
  } as Theme;

  const disableGesturesOption = { gestureEnabled: false };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={routingInstrumentation.registerNavigationContainer(
        navigationRef
      )}>
      <GestureHandlerRootView style={styles.container}>
        <Host>
          <Stack.Navigator
            initialRouteName={getScreenName(initialRoute)}
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: Colors.Black.Primary },
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}>
            <Stack.Screen
              name={getScreenName(Routes.WELCOME_SCREEN)}
              component={Welcome}
            />
            <Stack.Screen
              name={getScreenName(Routes.LOGIN_SCREEN)}
              component={Login}
            />
            <Stack.Screen
              name={getScreenName(Routes.CREATE_PASSWORD)}
              component={CreatePassword}
            />
            <Stack.Screen
              name={getScreenName(Routes.BACKUP_SEED_PHRASE)}
              component={BackupSeedPhrase}
            />
            <Stack.Screen
              name={getScreenName(Routes.IMPORT_SEED_PHRASE)}
              component={ImportSeedPhrase}
            />
            <Stack.Screen
              name={getScreenName(Routes.SWIPE_LAYOUT)}
              component={SwipeNavigator}
              options={disableGesturesOption}
            />
            <Stack.Screen
              name={getScreenName(Routes.CONNECTION_ERROR)}
              component={ConnectionError}
            />
            <Stack.Screen
              name={getScreenName(Routes.WALLET_CONNECT_INITAL_CONNECTION)}
              component={WCInitialConnection}
              options={disableGesturesOption}
            />
            <Stack.Screen
              name={getScreenName(Routes.WALLET_CONNECT_FLOWS)}
              component={WCFlows}
              options={disableGesturesOption}
            />
          </Stack.Navigator>
        </Host>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(forwardRef(Navigator));
