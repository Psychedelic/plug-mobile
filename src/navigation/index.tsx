import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { AppState, Linking, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/theme';
import { RootStackParamList } from '@/interfaces/navigation';
import { State } from '@/interfaces/redux';
import SwipeNavigator from '@/navigation/navigators/SwipeNavigator';
import { setPrelocked, setUnlocked } from '@/redux/slices/keyring';
import BackupSeedPhrase from '@/screens/auth/BackupSeedPhrase';
import CreatePassword from '@/screens/auth/CreatePassword';
import ImportSeedPhrase from '@/screens/auth/ImportSeedPhrase';
import Login from '@/screens/auth/Login';
import Welcome from '@/screens/auth/Welcome';
import ConnectionError from '@/screens/error/ConnectionError';
import WCFlows from '@/screens/flows/WalletConnect/screens/Flows';
import WCInitialConnection from '@/screens/flows/WalletConnect/screens/InitialConnection';
import WCTimeoutError from '@/screens/flows/WalletConnect/screens/TimeoutError';
import { handleDeepLink } from '@/utils/deepLink';

import Routes from './Routes';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = ({ routingInstrumentation }: any, navigationRef: any) => {
  const { isInitialized, isUnlocked } = useSelector(
    (state: State) => state.keyring
  );

  const dispatch = useDispatch();
  const backgroundTime = useRef<any>(null);

  const handleLockState = () => {
    dispatch(setUnlocked(false));
    dispatch(setPrelocked(false));
  };

  const handleDeepLinkHandler = useCallback(
    link => {
      handleDeepLink(link, isUnlocked);
    },
    [isUnlocked]
  );

  const handleAppStateChange = async (nextAppState: string) => {
    const initialLink =
      nextAppState === 'active' && (await Linking.getInitialURL());

    if (nextAppState === 'background') {
      dispatch(setPrelocked(true));
      backgroundTime.current = Date.now();
    }

    if (nextAppState === 'active') {
      if (backgroundTime.current) {
        const timeDiff = Date.now() - backgroundTime.current;
        if (timeDiff > 120000) {
          handleLockState();
        } else {
          dispatch(setPrelocked(false));
        }
      } else {
        dispatch(setPrelocked(false));
      }
      backgroundTime.current = null;
    }

    if (initialLink) {
      handleDeepLinkHandler(initialLink);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    const deepLinkListener = Linking.addEventListener('url', link => {
      handleDeepLinkHandler(link.url);
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
              options={disableGesturesOption}
            />
            <Stack.Screen
              name={Routes.CONNECTION_ERROR}
              component={ConnectionError}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_INITIAL_CONNECTION}
              component={WCInitialConnection}
              options={disableGesturesOption}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_FLOWS}
              component={WCFlows}
              options={disableGesturesOption}
            />
            <Stack.Screen
              name={Routes.WALLET_CONNECT_ERROR}
              component={WCTimeoutError}
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
