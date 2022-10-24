import { NavigationContainer, Theme } from '@react-navigation/native';
import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { AppState, Linking, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';

import { Colors } from '@/constants/theme';
import KeyRing from '@/modules/keyring';
import { useAppDispatch } from '@/redux/hooks';
import { setPrelocked, setUnlocked } from '@/redux/slices/keyring';
import { handleDeepLink } from '@/utils/deepLink';

import RootStackNavigator from './navigators/RootStackNavigator';

const Navigator = ({ routingInstrumentation }: any, navigationRef: any) => {
  const keyring = KeyRing.getInstance();

  const dispatch = useAppDispatch();
  const backgroundTime = useRef<any>(null);

  const handleLockState = () => {
    dispatch(setUnlocked(false));
    dispatch(setPrelocked(false));
  };

  const handleDeepLinkHandler = (link: string) => {
    handleDeepLink(link, keyring.isUnlocked);
  };

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

  const navTheme = {
    colors: {
      background: Colors.Black.Primary,
    },
  } as Theme;

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={routingInstrumentation.registerNavigationContainer(
        navigationRef
      )}>
      <GestureHandlerRootView style={styles.container}>
        <Host>
          <RootStackNavigator />
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
