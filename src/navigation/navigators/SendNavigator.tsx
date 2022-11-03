import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import React from 'react';

import ModalHeader from '@/components/navigation/ModalHeader';
import { RootStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import Send from '@/screens/flows/Send';

import { modalStackOptions } from '../utils';

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  [Routes.SEND]: {
    header: (props: StackHeaderProps) => <ModalHeader {...props} />,
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
    </Stack.Navigator>
  );
}

export default SendNavigator;
