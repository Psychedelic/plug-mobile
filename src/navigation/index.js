import 'react-native-gesture-handler';
import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import AuthNavigator from './navigators/AuthNavigator';

export default function Navigation() {
  const { isInitialized } = useSelector(state => state.keyring, shallowEqual);
  return <AuthNavigator isInitialized={isInitialized} />;
}
