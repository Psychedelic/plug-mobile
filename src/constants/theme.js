import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/platform';
import { fontMaker } from '@/utils/fonts';

import { MEDIUM, REGULAR, SEMIBOLD } from './fonts';

export const Metrics = {
  ScreenWidth: WINDOW_HEIGHT,
  ScreenHeight: WINDOW_WIDTH,
  Padding: 16,
  Margin: 16,
  BorderRadius: 8,
};

export const Colors = {
  ActionBlue: '#3574F4',
  WarningYellow: '#F3AD41',
  Black: {
    Primary: '#15161C',
    Secondary: '#1E1F27',
    Pure: '#000000',
    PrimaryTransparent: '#15161C00',
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
  Divider: {
    1: '#3A3B40',
    2: '#737377',
  },
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

export const TransparentGradient = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: ['transparent', 'transparent'],
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

// TODO: Remove styles that doesnt match with the style guide in figma, and remove colors
export const FontStyles = StyleSheet.create({
  Base: fontMaker({ size: 14, weight: REGULAR }),
  Title: fontMaker({ size: 22, weight: SEMIBOLD, color: Colors.White.Primary }),
  Title2: fontMaker({
    size: 24,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  Normal: fontMaker({ size: 16, weight: MEDIUM, color: Colors.White.Primary }),
  NormalGray: fontMaker({
    size: 16,
    weight: REGULAR,
    color: Colors.White.Secondary,
  }),
  Small: fontMaker({
    size: 14,
    weight: MEDIUM,
    color: Colors.White.Primary,
  }),
  SmallGray: fontMaker({
    size: 14,
    weight: REGULAR,
    color: Colors.White.Secondary,
  }),
  Smaller: fontMaker({
    size: 12,
    weight: REGULAR,
    color: Colors.White.Primary,
  }),
  SmallerGray: fontMaker({
    size: 12,
    weight: MEDIUM,
    color: Colors.White.Secondary,
  }),
  Headline1: fontMaker({ size: 28, weight: SEMIBOLD }),
  Headline2: fontMaker({ size: 24, weight: REGULAR }),
  Subtitle1: fontMaker({
    size: 20,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  Subtitle2: fontMaker({
    size: 18,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  Subtitle3: fontMaker({
    size: 16,
    weight: SEMIBOLD,
    color: Colors.White.Secondary,
  }),
  Body1: fontMaker({ size: 17, weight: REGULAR }),
  Body2: fontMaker({ size: 17, weight: MEDIUM }),
  Button: fontMaker({ size: 20, weight: SEMIBOLD, color: Colors.White.Pure }),
  Caption: fontMaker({ size: 14, weight: MEDIUM }),
  Overline: fontMaker({ size: 10, weight: REGULAR }),
});
