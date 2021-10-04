import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../Routes';
import CreateImportNavigator from './CreateImportNavigator';
import SwipeNavigator from './SwipeNavigator';

const Stack = createStackNavigator();

const AuthNavigator = ({ isInitialized }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isInitialized ? (
        <Stack.Screen name={Routes.SWIPE_LAYOUT} component={SwipeNavigator} />
      ) : (
        <Stack.Screen
          name={Routes.CREATE_IMPORT_LAYOUT}
          component={CreateImportNavigator}
        />
      )}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
