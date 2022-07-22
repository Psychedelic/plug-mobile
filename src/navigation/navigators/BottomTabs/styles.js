import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  root: {
    height: 94,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black.Primary,
  },
  tab: {
    bottom: 0,
    width: 130,
    height: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...fontMaker({
      size: 18,
      weight: SEMIBOLD,
      color: Colors.White.Secondary,
    }),
    marginTop: 4,
  },
  selected: {
    color: Colors.White.Primary,
  },
});
