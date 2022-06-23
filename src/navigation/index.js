import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { AppState, Linking, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/theme';
import SwipeNavigator from '@/navigation/navigators/SwipeNavigator';
import { setUnlocked } from '@/redux/slices/keyring';
import BackupSeedPhrase from '@/screens/auth/BackupSeedPhrase';
import CreatePassword from '@/screens/auth/CreatePassword';
import ImportSeedPhrase from '@/screens/auth/ImportSeedPhrase';
import Login from '@/screens/auth/Login';
import Welcome from '@/screens/auth/Welcome';
import ConnectionError from '@/screens/error/ConnectionError';
import WalletConnect from '@/screens/flows/WalletConnect';
import WalletConnectScreens from '@/screens/flows/WalletConnect/screens';
import WalletConnectWaitingBridge from '@/screens/flows/WalletConnect/WaitingBridge';
import { handleDeepLink } from '@/utils/deepLink';

import Routes from './Routes';

const Stack = createStackNavigator();

const Navigator = ({ routingInstrumentation }, navigationRef) => {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const timeoutId = useRef(null);
  const dispatch = useDispatch();

  const handleLockState = () => {
    dispatch(setUnlocked(false));
    timeoutId.current = null;
  };

  const handleAppStateChange = async nextAppState => {
    const initialLink = await Linking.getInitialURL();

    if (nextAppState === 'background') {
      timeoutId.current = setTimeout(handleLockState, 120000);
    }

    if (nextAppState === 'active' && timeoutId) {
      clearTimeout(timeoutId);
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
        navigationRef
      )}>
      <GestureHandlerRootView style={styles.container}>
        <Host>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: Colors.Black.Primary },
              gestureEnabled: true,
              gestureDirection: 'horizontal',
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
              name={Routes.SWIPE_LAYOUT}
              component={SwipeNavigator}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={Routes.CONNECTION_ERROR}
              component={ConnectionError}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_APPROVAL_SHEET}
              component={WalletConnect}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_SCREENS}
              component={WalletConnectScreens}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_WAITING_BRIDGE}
              component={WalletConnectWaitingBridge}
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
