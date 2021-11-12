import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { Host } from 'react-native-portalize';

import Routes from '../Routes';
import CreateImportNavigator from './CreateImportNavigator';
import SwipeNavigator from './SwipeNavigator';
import Login from '../../screens/Login';
import { setUnlocked } from '../../redux/slices/keyring';

const Stack = createStackNavigator();

const Navigator = ({ initialRoute }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let timeoutId = null;

  const handleLockState = () => {
    timeoutId = null;
    dispatch(setUnlocked(false));
    navigation.navigate(Routes.LOGIN_SCREEN);
  }

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      timeoutId = setTimeout(handleLockState, 5000);
    }

    if (nextAppState === 'active' && timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.SWIPE_LAYOUT} component={SwipeNavigator} />
      <Stack.Screen
        name={Routes.CREATE_IMPORT_LAYOUT}
        component={CreateImportNavigator}
      />
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
    </Stack.Navigator>
  );
};

const AuthNavigator = ({ initialRoute }) => (
  <NavigationContainer>
    <Host>
      <Navigator initialRoute={initialRoute} />
    </Host>
  </NavigationContainer>
);

export default AuthNavigator;
