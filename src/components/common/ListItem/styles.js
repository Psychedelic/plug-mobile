import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  number: {
    ...fontMaker({
      size: 16,
      weight: SEMIBOLD,
      color: Colors.ActionBlue,
    }),
    paddingRight: 5,
    textAlign: 'right',
    width: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.White.Primary,
    textAlign: 'left',
    width: 90,
  },
});
