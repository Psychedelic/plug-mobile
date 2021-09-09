import {Dimensions} from 'react-native';

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
  Background: {
    Primary: '#15161C',
    Pure: '#000000',
  },
  White: {
    Pure: '#FFFFFF',
    Primary: '#E1E8FD',
    Secondary: '#7A7E8B'
  },
  Gray: {
    Primary: '#33343A',
    Secondary: '#23242A',
    Pure: '#616571',
  },
  Rainbow: 'linear-gradient(94.95deg, #FFE701 -1.41%, #FA51D3 34.12%, #10D9ED 70.19%, #52FF53 101.95%);',
  ActionBlue: '#3574F4',
};

export const Shadow = {
  shadowColor: Colors.Background.SuperDark,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 5,
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
  colors: ['rgb(255, 231, 1)', 'rgb(250, 81, 211)', 'rgb(16, 217, 237)', 'rgb(82, 255, 83)'],
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
