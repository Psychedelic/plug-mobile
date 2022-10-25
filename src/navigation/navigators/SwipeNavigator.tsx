import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { ENABLE_NFTS } from '@/constants/nfts';
import { useAppSelector } from '@/redux/hooks';
import NFTs from '@/screens/tabs/NFTs';
import ProfileScreen from '@/screens/tabs/Profile';
import Tokens from '@/screens/tabs/Tokens';

import Routes from '../Routes';
import BottomTabs from './BottomTabs';

const Swipe = createMaterialTopTabNavigator();

const renderBottom = (props: MaterialTopTabBarProps) => (
  <BottomTabs {...props} />
);

const SwipeNavigator = () => {
  const { isInitialized, isUnlocked } = useAppSelector(state => state.keyring);
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: Routes.LOGIN, params: { manualLock: true } }],
    });
  };

  useEffect(() => {
    if (!isUnlocked && isInitialized) {
      goToLogin();
    }
  }, [isUnlocked, isInitialized]);

  return (
    <Swipe.Navigator
      screenOptions={{
        tabBarBounces: false,
      }}
      initialRouteName={Routes.TOKENS}
      tabBarPosition="bottom"
      tabBar={renderBottom}>
      <Swipe.Screen component={ProfileScreen} name={Routes.PROFILE} />
      <Swipe.Screen component={Tokens} name={Routes.TOKENS} />
      {ENABLE_NFTS && <Swipe.Screen component={NFTs} name={Routes.NFTS} />}
    </Swipe.Navigator>
  );
};

export default SwipeNavigator;
