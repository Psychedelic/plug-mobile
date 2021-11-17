import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigator from './navigators/AuthNavigator';
import Routes from './Routes';

export default function Navigation() {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const initialRoute = isInitialized
    ? isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN_SCREEN
    : Routes.CREATE_IMPORT_LAYOUT;
  return <AuthNavigator initialRoute={initialRoute} />;
}
