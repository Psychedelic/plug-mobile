import { StyleSheet } from 'react-native';

export const HEIGHT = 65;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: HEIGHT,
    alignItems: 'center',
  },
  leftContainer: {
    justifyContent: 'space-evenly',
  },
  rightContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  canisterName: {
    maxWidth: '50%',
  },
});
