import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ENABLE_NFTS } from '@/constants/nfts';
import useDeepLink from '@/hooks/useDeepLink';
import NFTs from '@/screens/tabs/NFTs';
import ProfileScreen from '@/screens/tabs/Profile';
import Tokens from '@/screens/tabs/Tokens';
import { useNavigation } from '@/utils/navigation';

import Routes from '../Routes';
import BottomTabs from './BottomTabs';

const Swipe = createMaterialTopTabNavigator();

const SwipeNavigator = ({ route }) => {
  const { isInitialized, isUnlocked } = useSelector(state => state.keyring);
  const isLogin = route.name === Routes.LOGIN_SCREEN;
  const { deepLink } = useDeepLink();
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (deepLink) {
  //     navigation.navigate(Routes.WALLET_CONNECT);
  //   }
  // }, [deepLink]);

  const goToLogin = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: Routes.LOGIN_SCREEN, params: { manualLock: true } }],
    });
  };

  useEffect(() => {
    if (!isUnlocked && isInitialized && !isLogin) {
      goToLogin();
    }
  }, [isUnlocked, isInitialized, isLogin]);

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
      {ENABLE_NFTS && <Swipe.Screen component={NFTs} name={Routes.NFTS} />}
    </Swipe.Navigator>
  );
};

export default SwipeNavigator;
