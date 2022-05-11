import { StyleSheet } from 'react-native';

import { FontStyles } from '@/constants/theme';

export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  leftContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  value: {
    ...FontStyles.Normal,
    marginLeft: 'auto',
    alignSelf: 'flex-start',
  },
  nftName: {
    color: '#616571',
    fontSize: 15,
  },
  nftDisplayer: {
    height: 155,
    aspectRatio: 1,
    borderRadius: 7,
  },
});
