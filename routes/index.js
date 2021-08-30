import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login';
import { useSelector } from 'react-redux';
import CreateImport from '../screens/CreateImport';
const Stack = createStackNavigator();

const AuthStack = ({ isInitialized }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isInitialized ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Create/Import" component={CreateImport} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
);

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none" />
  </NavigationContainer>
);

export default function Routes() {
  const { isUnlocked, isInitialized } = useSelector(state => state.auth);
  console.log('authenticated', isUnlocked);
  return isUnlocked ? (
    <AppStack />
  ) : (
    <AuthStack isInitialized={isInitialized} />
  );
}
