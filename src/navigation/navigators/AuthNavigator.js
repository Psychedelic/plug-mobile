import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { Host } from 'react-native-portalize';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';

import CreateImportNavigator from './CreateImportNavigator';
import { navigationRef } from '../../helpers/navigation';
import { setUnlocked } from '../../redux/slices/keyring';
import SwipeNavigator from './SwipeNavigator';
import Login from '../../screens/Login';
import Routes from '../Routes';

const Stack = createStackNavigator();

const Navigator = ({ initialRoute }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let timeoutId = null;

  const handleLockState = () => {
    timeoutId = null;
    dispatch(setUnlocked(false));
    navigation.navigate(Routes.LOGIN_SCREEN);
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

  return (
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
  );
};

const AuthNavigator = ({ initialRoute }) => (
  <NavigationContainer ref={navigationRef}>
    <Host>
      <Navigator initialRoute={initialRoute} />
    </Host>
  </NavigationContainer>
);

export default AuthNavigator;
