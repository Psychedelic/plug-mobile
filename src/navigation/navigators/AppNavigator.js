import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';

import SwipeNavigator from './SwipeNavigator';
import Routes from '../Routes';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Host>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.SWIPE_LAYOUT} component={SwipeNavigator} />
      </Stack.Navigator>
    </Host>
  </NavigationContainer>
);
export default AppNavigator;
