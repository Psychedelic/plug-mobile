import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Host } from 'react-native-portalize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';

import CreateImportNavigator from './navigators/CreateImportNavigator';
import SwipeNavigator from './navigators/SwipeNavigator';
import { navigationRef } from '../helpers/navigation';
import { setUnlocked } from '../redux/slices/keyring';
import Login from '../screens/Login';
import Routes from './Routes';

const Stack = createStackNavigator();

const Navigator = () => {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const dispatch = useDispatch();
  let timeoutId = null;

  const handleLockState = () => {
    timeoutId = null;
    dispatch(setUnlocked(false));
    navigationRef?.navigate(Routes.LOGIN_SCREEN);
  };

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      timeoutId = setTimeout(handleLockState, 120000);
    }

    if (nextAppState === 'active' && timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const initialRoute = isInitialized
    ? isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN_SCREEN
    : Routes.CREATE_IMPORT_LAYOUT;

  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={Routes.SWIPE_LAYOUT}
            component={SwipeNavigator}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name={Routes.CREATE_IMPORT_LAYOUT}
            component={CreateImportNavigator}
          />
          <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default Navigator;
