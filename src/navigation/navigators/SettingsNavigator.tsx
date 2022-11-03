import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import React from 'react';

import ModalHeader from '@/components/navigation/ModalHeader';
import { RootStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import ApprovedCanisters from '@/screens/tabs/Profile/screens/ApprovedCanisters';
import Contacts from '@/screens/tabs/Profile/screens/Contacts';
import Settings from '@/screens/tabs/Profile/screens/Settings';

import { modalStackOptions } from '../utils';

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  [Routes.SETTINGS]: {
    header: (props: StackHeaderProps) => <ModalHeader {...props} showClose />,
  },
};

function SettingsNavigator() {
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
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
