import 'react-native-gesture-handler';
import * as React from 'react';
import { useSelector } from 'react-redux';

import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './navigators/AppNavigator';

export default function Navigation() {
  const { isUnlocked, isInitialized } = useSelector(state => state.keyring);

  console.log('unlocked', isUnlocked, isInitialized);

  return isUnlocked ? (
    <AppNavigator />
  ) : (
    <AuthNavigator isInitialized={isInitialized} />
  );
}
