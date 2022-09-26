import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  threeDots: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
