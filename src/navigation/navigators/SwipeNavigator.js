import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileScreen from '../../screens/Profile';
import WalletNavigator from './WalletNavigator';
import Routes from '../Routes';

const Swipe = createMaterialTopTabNavigator();

const renderTabBar = () => null;

const SwipeNavigator = () => (
  <Swipe.Navigator
    screenOptions={{
      tabBarBounces: false,
    }}
    initialRouteName={Routes.WALLET_SCREEN}
    tabBar={renderTabBar}>
    <Swipe.Screen component={ProfileScreen} name={Routes.PROFILE_SCREEN} />
    <Swipe.Screen component={WalletNavigator} name={Routes.WALLET_SCREEN} />
  </Swipe.Navigator>
);

export default SwipeNavigator;
