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
<<<<<<< HEAD
    : Routes.WELCOME_SCREEN;

=======
    : Routes.CREATE_IMPORT_LAYOUT;
>>>>>>> 0f3af64147b233f5923b978113b28a7618718abb
  return <AuthNavigator initialRoute={initialRoute} />;
}
