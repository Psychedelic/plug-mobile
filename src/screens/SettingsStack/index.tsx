import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

// import ModalHeader from '@/components/navigation/ModalHeader';
import { isAndroid } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { RootStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import ApprovedCanisters from './screens/ApprovedCanisters';
import Contacts from './screens/Contacts';
import Settings from './screens/Settings';

const Stack = createStackNavigator<RootStackParamList>();

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SETTINGS}
      screenOptions={() => ({
        headerShown: false,
        // header: props => <ModalHeader {...props} />,
        // headerStyle: {
        //   height: 60,
        //   // marginHorizontal: 16,
        // },
        presentation: 'card',
        cardStyle: {
          backgroundColor: Colors.Black.Pure,
        },
        ...(isAndroid && TransitionPresets.SlideFromRightIOS),
      })}>
      <Stack.Screen name={Routes.SETTINGS} component={Settings} />
      <Stack.Screen name={Routes.CONTACTS} component={Contacts} />
      <Stack.Screen
        name={Routes.APPROVED_CANISTERS}
        component={ApprovedCanisters}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
