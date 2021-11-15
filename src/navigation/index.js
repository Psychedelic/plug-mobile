import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import AuthNavigator from './navigators/AuthNavigator';
import Routes from './Routes';
import useKeyring from '../hooks/useKeyring';

export default function Navigation() {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const initialRoute = isInitialized
    ? isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN_SCREEN
    : Routes.WELCOME_SCREEN;

  return <AuthNavigator initialRoute={initialRoute} />;
}
