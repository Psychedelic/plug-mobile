import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Tokens from '../../screens/Wallet/tabs/Tokens';
import NFTs from '../../screens/Wallet/tabs/NFTs';
import ProfileScreen from '../../screens/Profile';
import BottomTabs from './BottomTabs';
import Routes from '../Routes';

const Swipe = createMaterialTopTabNavigator();

const SwipeNavigator = () => (
  <Swipe.Navigator
    screenOptions={{
      tabBarBounces: false,
    }}
    initialRouteName={Routes.TOKENS}
    tabBarPosition="bottom"
    tabBar={props => <BottomTabs {...props} />}>
    <Swipe.Screen component={ProfileScreen} name={Routes.PROFILE_SCREEN} />
    <Swipe.Screen component={Tokens} name={Routes.TOKENS} />
    <Swipe.Screen component={NFTs} name={Routes.NFTS} />
  </Swipe.Navigator>
);

export default SwipeNavigator;
