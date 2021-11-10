import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';

import Routes from '../Routes';
import CreateImportNavigator from './CreateImportNavigator';
import SwipeNavigator from './SwipeNavigator';
import Login from '../../screens/Login';

const Stack = createStackNavigator();

const AuthNavigator = ({ initialRoute }) => (
  <NavigationContainer>
    <Host>
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
    </Host>
  </NavigationContainer>
);

export default AuthNavigator;
