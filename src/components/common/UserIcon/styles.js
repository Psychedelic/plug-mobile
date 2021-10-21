import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export default StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  extralarge: {
    width: 63,
    height: 63,
  },
  large: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 40,
    height: 40,
  },
  small: {
    width: 34,
    height: 34,
  },
  textextralarge: {
    fontSize: 40,
  },
  textlarge: {
    fontSize: 32,
  },
  textmedium: {
    fontSize: 24,
  },
  textsmall: {
    fontSize: 18,
  },
  background: {
    borderRadius: 100,
    backgroundColor: Colors.Black.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundextralarge: {
    width: 59,
    height: 59,
  },
  backgroundlarge: {
    width: 43,
    height: 43,
  },
  backgroundmedium: {
    width: 36,
    height: 36,
  },
  backgroundsmall: {
    width: 30,
    height: 30,
  },
});
