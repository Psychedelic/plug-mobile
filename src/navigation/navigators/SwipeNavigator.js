import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Routes from '../Routes';
import ProfileScreen from '../../screens/Profile';
import WalletNavigator from './WalletNavigator';

const Swipe = createMaterialTopTabNavigator();

const renderTabBar = () => null;

const SwipeNavigator = () => (
  <View style={{ flex: 1 }}>
    <Swipe.Navigator
      initialRouteName={Routes.WALLET_SCREEN}
      tabBar={renderTabBar}>
      <Swipe.Screen component={ProfileScreen} name={Routes.PROFILE_SCREEN} />
      <Swipe.Screen component={WalletNavigator} name={Routes.WALLET_SCREEN} />
    </Swipe.Navigator>
  </View>
);

export default SwipeNavigator;
