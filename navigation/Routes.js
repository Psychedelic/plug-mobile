import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import { useSelector } from 'react-redux';
import WelcomeScreen from '../screens/Welcome';
import Routes from './routesNames';
import SwipeNavigator from './SwipeNavigator';

const Stack = createStackNavigator();

const AuthStack = ({ isInitialized }) => (
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
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Routes.SWIPE_LAYOUT} component={SwipeNavigator} />
  </Stack.Navigator>
);

export default function Navigation() {
  const { isUnlocked, isInitialized } = useSelector(state => state.auth);
  return <NavigationContainer>
    {
      isUnlocked
        ? <AppStack />
        : <AuthStack isInitialized={isInitialized} />
    }
  </NavigationContainer>
}
