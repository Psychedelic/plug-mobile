import { Dimensions } from 'react-native';

export const Metrics = {
  ScreenWidth: Dimensions.get('window').width,
  ScreenHeight: Dimensions.get('window').height,
  Padding: 16,
  Margin: 16,
  BorderRadius: 8,
};

export const FontFamily = {
  Bold: 'oswald-bold',
  Medium: 'oswald-medium',
  Regular: 'oswald-regular',
};

export const Colors = {
  Primary: '#00AFE8',
  Second: '#6BD2EF',
  Third: '#ECF3FC',
  Background: '#F7F8F9',
  Warning: '#FFC554',
  Success: '#BDE346',
  Error: '#E06454',
  GrayScale: {
    White: '#FFFFFF',
    Divider: '#CCCCCC',
    Light: '#E8E8E8',
    Medium: '#CCCCCC',
    Dark: '#767676',
    VeryDark: '#585858',
    SuperDark: '#3B3B3B',
    BackgroundModal: 'rgba(118, 118, 118, 0.4)',
  },
};

export const Shadow = {
  shadowColor: Colors.GrayScale.SuperDark,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 5,
};

export const FontStyle = {
  Title: {
    fontSize: 24,
    fontFamily: FontFamily.Bold,
  },
  Subtitle: {
    fontSize: 18,
    fontFamily: FontFamily.Medium,
  },
  Normal: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
  },
  NormalBold: {
    fontSize: 16,
    fontFamily: FontFamily.Bold,
  },
  Min: {
    fontSize: 12,
    fontFamily: FontFamily.Regular,
  },
  Big: {
    fontSize: 36,
    fontFamily: FontFamily.Bold,
  },
  Button: {
    fontSize: 18,
    fontFamily: FontFamily.Medium,
    textAlign: 'center',
  },
  LabelButton: {
    fontSize: 18,
    fontFamily: FontFamily.Regular,
  },
  Header: {
    fontSize: 24,
    fontFamily: FontFamily.Medium,
  },
  SuperMin: {
    fontSize: 10,
    fontFamily: FontFamily.Regular,
  },
};
