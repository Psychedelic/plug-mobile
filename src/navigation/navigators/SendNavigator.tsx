import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import React from 'react';

import ModalHeader from '@/components/navigation/ModalHeader';
import { RootStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import Send from '@/screens/flows/Send';
import NftDetail from '@/screens/tabs/NFTs/screens/NftDetail';
import NftList from '@/screens/tabs/NFTs/screens/NftList';

import { modalStackOptions } from '../utils';

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  [Routes.SEND]: {
    header: (props: StackHeaderProps) => {
      const showBack = !!(
        props.route?.params as RootStackParamList[Routes.SEND]
      )?.nft;
      return <ModalHeader {...props} showBack={showBack} />;
    },
  },
};

function SendNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SEND}
      screenOptions={modalStackOptions}>
      <Stack.Screen
        name={Routes.SEND}
        component={Send}
        options={screenOptions[Routes.SEND]}
      />
      <Stack.Screen name={Routes.NFT_LIST} component={NftList} />
      <Stack.Screen name={Routes.NFT_DETAIL} component={NftDetail} />
    </Stack.Navigator>
  );
}

export default SendNavigator;
