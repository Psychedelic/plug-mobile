import { StyleSheet } from 'react-native';

import { MEDIUM, SEMIBOLD } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  text: {
    ...fontMaker({ size: 24, weight: SEMIBOLD, color: Colors.White.Primary }),
  },
  symbol: {
    ...fontMaker({
      size: 16,
      weight: MEDIUM,
      color: Colors.White.Secondary,
    }),
    marginLeft: 12,
  },
  buttonStyle: {
    width: 41,
    height: 24,
    borderRadius: 8,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
});
