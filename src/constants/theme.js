import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/platform';

export const Metrics = {
  ScreenWidth: WINDOW_HEIGHT,
  ScreenHeight: WINDOW_WIDTH,
  Padding: 16,
  Margin: 16,
  BorderRadius: 8,
};

export const Colors = {
  ActionBlue: '#3574F4',
  Black: {
    Primary: '#15161C',
    Pure: '#000000',
  },
  White: {
    Pure: '#FFFFFF',
    Primary: '#E1E8FD',
    Secondary: '#7A7E8B',
  },
  Gray: {
    Primary: '#33343A',
    Secondary: '#23242A',
    Tertiary: '#292929',
    Pure: '#616571',
  },
  Rainbow: {
    Red: '#FB5DC3',
    Yellow: '#FDB943',
    Blue: '#36C3E9',
    Purple: '#CF6ED3',
    Green: '#09DF66',
    Teal: '#05DCC8',
  },
  Red: '#FF453A',
};

export const Rainbow = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: [
    'rgb(255, 231, 1)',
    'rgb(250, 81, 211)',
    'rgb(16, 217, 237)',
    'rgb(82, 255, 83)',
  ],
};

export const DisabledRainbow = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: [
    'rgba(255, 231, 1, 0.2)',
    'rgba(250, 81, 211, 0.2)',
    'rgba(16, 217, 237, 0.2)',
    'rgba(82, 255, 83, 0.2)',
  ],
};

export const Shadow = StyleSheet.create({
  shadowColor: Colors.Black.Primary,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 5,
});

// TODO: Remove styles that doesnt match with the style guide in figma
export const FontStyles = StyleSheet.create({
  Title: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
  },
  Title2: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: Colors.White.Primary,
  },
  Normal: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.White.Primary,
  },
  NormalGray: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.White.Secondary,
  },
  Small: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.White.Primary,
  },
  SmallGray: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.White.Secondary,
  },
  Smaller: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.White.Primary,
  },
  SmallerGray: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.White.Secondary,
  },
  LinkButton: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.ActionBlue,
  },
  Headline1: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
  },
  Headline2: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
  },
  Subtitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  Subtitle2: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.White.Primary,
  },
  Subtitle3: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.White.Secondary,
  },
  Body1: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },
  Body2: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
  },
  Button: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  Caption: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  Overline: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});
