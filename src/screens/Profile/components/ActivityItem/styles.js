import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
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
