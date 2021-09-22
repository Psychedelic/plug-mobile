import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Routes from '../routes';
import WalletScreen from '../../screens/Wallet';
import ProfileScreen from '../../screens/Profile';

const Swipe = createMaterialTopTabNavigator();

const renderTabBar = () => null;

const SwipeNavigator = () => (
  <View style={{ flex: 1 }}>
    <Swipe.Navigator
      initialRouteName={Routes.WALLET_SCREEN}
      tabBar={renderTabBar}>
      <Swipe.Screen component={ProfileScreen} name={Routes.PROFILE_SCREEN} />
      <Swipe.Screen component={WalletScreen} name={Routes.WALLET_SCREEN} />
    </Swipe.Navigator>
  </View>
);

export default SwipeNavigator;
