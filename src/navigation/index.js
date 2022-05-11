import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { Host } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/theme';
import { setUnlocked } from '@/redux/slices/keyring';
import BackupSeedPhrase from '@/screens/auth/BackupSeedPhrase';
import CreatePassword from '@/screens/auth/CreatePassword';
import ImportSeedPhrase from '@/screens/auth/ImportSeedPhrase';
import Login from '@/screens/auth/Login';
import Welcome from '@/screens/auth/Welcome';
import ConnectionError from '@/screens/error/ConnectionError';
import { navigationRef } from '@/utils/navigation';

import SwipeNavigator from './navigators/SwipeNavigator';
import Routes from './Routes';
import WalletConnect from '../screens/WalletConnect';
import WalletConnectCallRequest from '../screens/WalletConnect/callRequest';
import { handleDeepLink } from '../helpers/deepLink';

const Stack = createStackNavigator();

const Navigator = ({ routingInstrumentation }, navigationRef) => {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const dispatch = useDispatch();
  let timeoutId = null;

  const handleLockState = () => {
    dispatch(setUnlocked(false));
    timeoutId = null;
    navigationRef?.navigate(Routes.LOGIN_SCREEN);
  };

  const handleAppStateChange = async nextAppState => {
    const initialLink = await Linking.getInitialURL();

    if (nextAppState === 'background') {
      timeoutId = setTimeout(handleLockState, 120000);
    }

    if (nextAppState === 'active' && timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (initialLink) handleDeepLink(initialLink);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    Linking.addEventListener('url', link => {
      handleDeepLink(link.url);
    });

    return () => {
      subscription.remove();
      Linking.removeAllListeners();
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
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={routingInstrumentation.registerNavigationContainer(
        navigationRef,
      )}>
      <Host>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.Black.Primary },
          }}>
          <Stack.Screen name={Routes.WELCOME_SCREEN} component={Welcome} />
          <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
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
            name={Routes.CONNECTION_ERROR}
            component={ConnectionError}
          />
          <Stack.Screen
            name={Routes.SWIPE_LAYOUT}
            component={SwipeNavigator}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name={Routes.WALLET_CONNECT_APPROVAL_SHEET}
            component={WalletConnect}
          />
          <Stack.Screen
            name={Routes.WALLET_CONNECT_CALL_REQUEST}
            component={WalletConnectCallRequest}
          />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default memo(forwardRef(Navigator));
