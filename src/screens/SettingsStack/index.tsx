import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import { isAndroid } from '@/constants/platform';
import { RootStackParamList } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import Contacts from './screens/Contacts';
import Settings from './screens/Settings';

const Stack = createStackNavigator<RootStackParamList>();

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SETTINGS}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        ...(isAndroid && TransitionPresets.SlideFromRightIOS),
      }}>
      <Stack.Screen name={Routes.SETTINGS} component={Settings} />
      <Stack.Screen name={Routes.CONTACTS} component={Contacts} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
