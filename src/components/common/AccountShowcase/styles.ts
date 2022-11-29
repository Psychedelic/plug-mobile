import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 8,
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  selectedRoot: {
    borderRadius: 100,
    backgroundColor: Colors.Black.Primary,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
