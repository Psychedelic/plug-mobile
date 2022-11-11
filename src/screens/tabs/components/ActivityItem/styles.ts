import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

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
    maxWidth: '50%',
  },
  rightContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingLeft: 5,
    maxWidth: '32%',
  },
  title: {
    width: '100%',
    ...FontStyles.Normal,
  },
  text: {
    ...FontStyles.SmallGray,
    width: '100%',
  },
});
