import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import React from 'react';

import ModalHeader from '@/components/navigation/ModalHeader';
import { ModalStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import Send from '@/screens/flows/Send';
import NftDetail from '@/screens/tabs/NFTs/screens/NftDetail';
import NftList from '@/screens/tabs/NFTs/screens/NftList';
import ApprovedCanisters from '@/screens/tabs/Profile/screens/ApprovedCanisters';
import Contacts from '@/screens/tabs/Profile/screens/Contacts';
import Settings from '@/screens/tabs/Profile/screens/Settings';

import { modalStackOptions } from '../utils';

const Stack = createStackNavigator<ModalStackParamList>();

const screenOptions = {
  [Routes.SETTINGS]: {
    header: (props: StackHeaderProps) => <ModalHeader {...props} showClose />,
  },
  [Routes.SEND]: {
    header: (props: StackHeaderProps) => {
      const showBack = !!(
        props.route?.params as ModalStackParamList[Routes.SEND]
      )?.nft;
      return <ModalHeader {...props} showBack={showBack} />;
    },
  },
};

function ModalStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SETTINGS}
      screenOptions={modalStackOptions}>
      <Stack.Screen
        name={Routes.SETTINGS}
        component={Settings}
        options={screenOptions[Routes.SETTINGS]}
      />
      <Stack.Screen name={Routes.CONTACTS} component={Contacts} />
      <Stack.Screen
        name={Routes.APPROVED_CANISTERS}
        component={ApprovedCanisters}
      />
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

export default ModalStackNavigator;
