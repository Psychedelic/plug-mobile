import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from '../Routes';
import Tokens from '../../screens/Wallet/tabs/Tokens';
import NFTs from '../../screens/Wallet/tabs/NFTs';
import BottomTabs from './BottomTabs';

const Tab = createBottomTabNavigator();

const WalletNavigator = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator
      initialRouteName={Routes.TOKENS}
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomTabs {...props} />}>
      <Tab.Screen component={Tokens} name={Routes.TOKENS} />
      <Tab.Screen component={NFTs} name={Routes.NFTS} />
    </Tab.Navigator>
  </View>
);

export default WalletNavigator;
