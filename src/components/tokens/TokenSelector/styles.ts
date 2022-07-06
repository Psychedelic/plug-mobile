import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

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
  icon: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  available: {
    ...FontStyles.NormalGray,
    marginLeft: 2,
    textTransform: 'lowercase',
  },
});
