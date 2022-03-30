import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/theme';

const FontStyles = {
  Title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.White.Primary,
  },
  Title2: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.White.Primary,
  },
  Subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.White.Primary,
  },
  Subtitle2: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.White.Primary,
  },
  Subtitle3: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.White.Secondary,
  },
  Normal: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.White.Primary,
  },
  NormalGray: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.White.Secondary,
  },
  Small: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.White.Primary,
  },
  SmallGray: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.White.Secondary,
  },
  Smaller: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.White.Primary,
  },
  SmallerGray: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.White.Secondary,
  },
  Button: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.White.Pure,
  },
  LinkButton: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.ActionBlue,
  },
};

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: 116,
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.White.Primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 27,
  },
  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 22,
  },
  buttonStyling: {
    minWidth: '84%',
  },
  valid: {
    color: Colors.ActionBlue,
    marginTop: 23,
    marginLeft: 30,
  },
  input: {
    ...FontStyles.Normal,
    fontSize: 24,
    marginRight: 'auto',
  },
});
