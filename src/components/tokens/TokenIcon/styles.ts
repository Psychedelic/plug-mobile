import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  genericToken: {
    width: 41,
    height: 41,
    textAlign: 'center',
    borderRadius: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: fontMaker({ weight: SEMIBOLD, size: 10 }),
  blackBackground: {
    backgroundColor: 'black',
  },
});
