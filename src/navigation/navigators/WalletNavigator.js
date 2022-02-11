import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Tokens from '../../screens/Wallet/tabs/Tokens';
import NFTs from '../../screens/Wallet/tabs/NFTs';
import BottomTabs from './BottomTabs';
import Routes from '../Routes';

const Tab = createBottomTabNavigator();

const WalletNavigator = () => (
  <Tab.Navigator
    initialRouteName={Routes.TOKENS}
    screenOptions={{ headerShown: false }}
    tabBar={props => <BottomTabs {...props} />}>
    <Tab.Screen component={Tokens} name={Routes.TOKENS} />
    <Tab.Screen component={NFTs} name={Routes.NFTS} />
  </Tab.Navigator>
);

export default WalletNavigator;
