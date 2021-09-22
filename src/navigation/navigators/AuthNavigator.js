import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/Login';
import WelcomeScreen from '../../screens/Welcome';
import Routes from '../routes';

const Stack = createStackNavigator();

const AuthNavigator = ({ isInitialized }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isInitialized ? (
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      ) : (
        <Stack.Screen name={Routes.WELCOME_SCREEN} component={WelcomeScreen} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
