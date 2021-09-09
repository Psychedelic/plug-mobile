import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import { useSelector } from 'react-redux';
import Welcome from '../screens/Welcome';
import HomeScreen from '../screens/Home';

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
        <Stack.Screen name="Welcome" component={Welcome} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
);

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default function Routes() {
  const { isUnlocked, isInitialized } = useSelector(state => state.auth);
  console.log('initialized', isInitialized);
  console.log('unlocked', isUnlocked);
  return isUnlocked ? (
    <AppStack />
  ) : (
    <AuthStack isInitialized={isInitialized} />
  );
}
