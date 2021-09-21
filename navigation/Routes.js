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

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.SWIPE_LAYOUT} component={SwipeNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default function Navigation() {
  const { isUnlocked, isInitialized } = useSelector(state => state.auth);
  return isUnlocked
    ? <AppStack />
    : <AuthStack isInitialized={isInitialized} />
}

