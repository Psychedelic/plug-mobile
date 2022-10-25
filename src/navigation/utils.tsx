import {
  StackHeaderProps,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import ModalHeader from '@/components/navigation/ModalHeader';
import i18n from '@/config/i18n';
import { isAndroid } from '@/constants/platform';
import { Colors } from '@/constants/theme';

export const getRouteName = (name: string) => {
  return i18n.t(`routes.${name}`) || name;
};

export const rootStackOptions = (): StackNavigationOptions => ({
  headerShown: false,
  cardStyle: { backgroundColor: Colors.Black.Primary },
  gestureEnabled: true,
  gestureDirection: 'horizontal',
});

export const settingsGroupOptions = (): StackNavigationOptions => ({
  headerShown: false,
  presentation: 'modal',
  ...TransitionPresets.ModalPresentationIOS,
  cardStyle: {
    marginTop: 16,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});

export const settingsStackOptions = (): StackNavigationOptions => ({
  header: (props: StackHeaderProps) => <ModalHeader {...props} showBack />,
  headerStyle: {
    height: 60,
  },
  headerMode: 'float',
  presentation: 'card',
  cardStyle: {
    backgroundColor: Colors.Black.Pure,
  },
  ...(isAndroid && TransitionPresets.SlideFromRightIOS),
});
