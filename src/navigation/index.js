import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Host } from 'react-native-portalize';
import React, { useEffect, useState } from 'react';
import { AppState, Linking } from 'react-native';

import ImportSeedPhrase from '../screens/Welcome/views/ImportSeedPhrase';
import BackupSeedPhrase from '../screens/Welcome/views/BackupSeedPhrase';
import CreatePassword from '../screens/Welcome/views/CreatePassword';
import SwipeNavigator from './navigators/SwipeNavigator';
import ConnectionError from '../screens/ConnectionError';
import { navigationRef } from '../helpers/navigation';
import { setUnlocked } from '../redux/slices/keyring';
import { Colors } from '../constants/theme';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Routes from './Routes';
import WalletConnect from '../screens/WalletConnect';
import useDeepLink from '../hooks/useDeepLink';

const Stack = createStackNavigator();

const Navigator = ({ routingInstrumentation }) => {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const [deepLink, setDeepLink] = useState(null);
  const { DeepLinkContext } = useDeepLink();
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

    if (initialLink) setDeepLink(initialLink);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    Linking.addEventListener('url', link => {
      setDeepLink(link.url);
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

  return (
    <DeepLinkContext.Provider value={deepLink}>
      <NavigationContainer
        ref={navigationRef}
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
            <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
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
              name={Routes.WALLET_CONNECT}
              component={WalletConnect}
            />
          </Stack.Navigator>
        </Host>
      </NavigationContainer>
    </DeepLinkContext.Provider>
  );
};

export default Navigator;
