import React, { useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigationState } from '@react-navigation/native';

import WalletHeader from '../../screens/Wallet/components/WalletHeader';
import Header from '../../components/common/Header';
import Settings from '../../screens/Settings';
import Icon from '../../components/icons';
import Tokens from '../../screens/Wallet/tabs/Tokens';
import NFTs from '../../screens/Wallet/tabs/NFTs';
import ProfileScreen from '../../screens/Profile';
import { commonNavigatorOptions } from '../index';
import BottomTabs from './BottomTabs';
import Routes from '../Routes';

const Swipe = createMaterialTopTabNavigator();

const haha = (
  <Header
    left={<Settings />}
    right={
      <TouchableOpacity onPress={() => null}>
        <Icon name="chevronRight" />
      </TouchableOpacity>
    }
  />
);

const SwipeNavigator = ({ navigation }) => {
  const routes = useNavigationState(state => state.routes);
  const currentRouteIndex =
    routes?.length && routes[routes.length - 1].state?.index;
  const currentRoute =
    routes[routes.length - 1].state?.routeNames[currentRouteIndex];

  useEffect(() => {
    navigation.setOptions({
      headerShown: currentRoute !== Routes.PROFILE_SCREEN,
    });
  }, [navigation, currentRoute]);

  return (
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
};

export default SwipeNavigator;
